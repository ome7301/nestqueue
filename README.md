# NESTQueue

An in-house ticket management system.

## Prerequisites

- [go](https://go.dev/doc/install): to build and run the server
- [npm](https://nodejs.org/en/download): to build and run the client
- A [Mongo DB](https://account.mongodb.com/account/login) account and the credentials to a cluster

## Installation

### 1. Download the repository

Clone the repository.

```sh
git clone https://github.com/digitalnest-wit/nestqueue
```

Navigate to `nestqueue`.

```sh
cd nestqueue
```

### 2. Install the server dependencies

This command downloads all the dependent modules for the server. No need to navigate to `server`.

```sh
go -C server mod download
```

### 3. Install the client dependencies

Navigate to the `client` directory.

```sh
cd client
```

This command installs all the dependencies for the client application.

```sh
npm install
```

## Running

### 1. Create a cluster on Mongo DB

Click on Connect and find your cluster URI. Place this URI in the server environment file server/.env.

```env
MONGO_URI='YOUR_URI_HERE'
```

### 2. Start the server

In the `server` directory, run this command.

```sh
make
```

### 3. Start the client

In the `client` directory, run this command.

```sh
make
```
