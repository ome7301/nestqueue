package main

import (
	"context"
	"errors"
	"flag"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/digitalnest-wit/nestqueue/internal/api"
	"github.com/digitalnest-wit/nestqueue/internal/storage"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

var (
	_serverPort = flag.Int("port", 3000, "the port to listen to")
)

func main() {
	flag.Parse()

	// Configure the logger
	logger, err := configureLogger()
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to configure logger: %s\n", err)
		os.Exit(1)
	}

	defer syncLogger(logger)

	if err := godotenv.Load(); err != nil {
		logger.Sugar().Warn("failed to load environment file", "error", err)
	}

	// Configure the Mongo DB client connection
	client, err := configureMongoClient()
	if err != nil {
		logger.Sugar().Fatalw("failed to connect to mongo cluster", "error", err)
	}

	defer disconnectClient(context.Background(), client, logger)

	var ctx, cancel = context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Create a ticket storage solution
	store, err := storage.NewTicketStore(ctx, client, logger)
	if err != nil {
		logger.Sugar().Fatal(err)
	}

	var (
		ticketHandler = api.NewTicketHandler(store, logger)
		mux           = http.NewServeMux()
	)

	ticketHandler.RegisterRoutes(mux)

	// Wrap mux with global-level middleware
	handler := corsMiddleware(logRequestsMiddleware(mux, logger))

	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", *_serverPort),
		Handler:      handler,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  120 * time.Second,
	}

	// Start the server with graceful error handling
	runServer(server, logger)
}

func runServer(server *http.Server, logger *zap.Logger) {
	var (
		sugar         = logger.Sugar()
		interruptChan = make(chan os.Signal, 1)
		serverErrChan = make(chan error, 1)
	)

	sugar.Infof("server started on port %d", *_serverPort)

	// Relay interrupt signals to interruptChan
	signal.Notify(interruptChan, os.Interrupt, syscall.SIGTERM)

	run := func() {
		// ListenAndServe will always return a non-nil error
		err := server.ListenAndServe()

		serverErrChan <- err
		close(serverErrChan)
	}

	go run()

	// Block until either the server is interrupted or receives an error
	select {
	case <-interruptChan:
		sugar.Info("server stopped")
		os.Exit(0)
	case err := <-serverErrChan:
		sugar.Errorf("server received an error: %s", err)
		os.Exit(1)
	}
}

// configureLogger creates a new ready-to-use logger
func configureLogger() (*zap.Logger, error) {
	// Define level-handling logic
	highPriority := zap.LevelEnablerFunc(func(lvl zapcore.Level) bool {
		return lvl >= zapcore.ErrorLevel
	})
	lowPriority := zap.LevelEnablerFunc(func(lvl zapcore.Level) bool {
		return lvl < zapcore.ErrorLevel
	})

	// High-priority output should go to standard error, and low-priority
	// output should go to standard out
	consoleDebugging := zapcore.Lock(os.Stdout)
	consoleErrors := zapcore.Lock(os.Stderr)

	// Optimize the console output for human operators
	cfg := zap.NewDevelopmentEncoderConfig()
	consoleEncoder := zapcore.NewConsoleEncoder(cfg)

	core := zapcore.NewTee(
		zapcore.NewCore(consoleEncoder, consoleErrors, highPriority),
		zapcore.NewCore(consoleEncoder, consoleDebugging, lowPriority),
	)

	return zap.New(core).Named("nestqueue"), nil
}

// syncLogger flushes any unclosed files
func syncLogger(logger *zap.Logger) {
	if err := logger.Sync(); err != nil {
		fmt.Fprintf(os.Stderr, "failed to sync logger: %s", err)
	}
}

// corsMiddleware adds CORS headers to allow cross-origin requests
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Allow requests from any origin
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Handle preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

// logRequestsMiddleware logs each request's method and path to logger
func logRequestsMiddleware(next http.Handler, logger *zap.Logger) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		sugar := logger.Sugar()
		sugar.Infow("received request", "method", r.Method, "path", r.URL.Path)
		next.ServeHTTP(w, r)
	})
}

// configureMongoClient sets up a Mongo DB client and calls Connect to connect
// to the cluster
func configureMongoClient() (*mongo.Client, error) {
	uri, ok := os.LookupEnv("MONGO_URI")
	if !ok {
		return nil, errors.New("expected MONGO_URI variable in environment")
	}

	api := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(uri).SetServerAPIOptions(api)

	return mongo.Connect(opts)
}

func disconnectClient(ctx context.Context, client *mongo.Client, logger *zap.Logger) {
	if err := client.Disconnect(ctx); err != nil {
		logger.Sugar().Errorw("failed to disconnect Mongo DB client", "error", err)
	}
}
