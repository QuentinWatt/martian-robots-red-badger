import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">Martian Robots</h1>
      <hr />
      <div className="grid grid-cols-1 gap-4 mt-4">
        <p>
          This is a simple app that allows you to input a grid size and a series
          of robots that have a "start position" and a series of "moves".
        </p>
        <p>The app will then output the final position of each robot.</p>
        <p>
          Find the code for this app{" "}
          <a
            href="https://github.com/QuentinWatt/martian-robots-red-badger"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            here
          </a>
          .
        </p>
      </div>
    </div>
  );
}
