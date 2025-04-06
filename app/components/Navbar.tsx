import { Form, Link } from "react-router";

export function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-100">
          Jobs Board
        </Link>

        <Form method="get" action="/search" className="flex-1 max-w-xl mx-4">
          <input
            type="search"
            name="q"
            placeholder="Search jobs..."
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Form>

        <Link
          to="/new"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
        >
          New Job
        </Link>
      </div>
    </nav>
  );
}
