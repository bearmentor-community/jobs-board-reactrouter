import type { Route } from "./+types/demo";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Posts = Post[];

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const posts: Posts = await response.json();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return posts;
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Demo({ loaderData }: Route.ComponentProps) {
  const posts = loaderData;

  return (
    <div>
      <h1>Demo</h1>
      {posts.map((post) => {
        return (
          <div>
            <p>{post.title}</p>
          </div>
        );
      })}
    </div>
  );
}
