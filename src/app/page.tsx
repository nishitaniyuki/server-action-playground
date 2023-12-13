import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-24">
      <h1 className="mb-3 text-2xl font-semibold">
        Server Actions Playground
      </h1>
      <h2 className="mb-2 text-l font-semibold">
        Pagination
      </h2>
      <ul className="list-disc">
        <li>
          <Link className="text-blue-600" href="/pagination/only-server-action">
            Only Server Action
          </Link>
        </li>
        <li>
          <Link className="text-blue-600" href="/pagination/client-function-and-server-action">
            Client Function and Server Action
          </Link>
        </li>
        <li>
          <Link className="text-blue-600" href="/pagination/parallel-routes">
            Parallel Routes
          </Link>
        </li>
      </ul>
    </main>
  );
}
