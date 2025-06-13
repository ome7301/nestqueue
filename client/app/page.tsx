import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full bg-gray-900 text-white p-5">
      <Image
        className="mb-3"
        src="/logo-digital-nest.png"
        alt="Digital NEST logo"
        width={30}
        height={30}
      />
      <p>Welcome back to Web Development!</p>
    </div>
  );
}
