import { defer, type MetaFunction } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const n = Date.now();
  const d = new Promise<number>((res) =>
    setTimeout(() => res(Date.now()), 2000)
  );

  return defer({ n, d });
};

export default function Index() {
  const { n, d } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>

      <p>
        If streaming is working properly, you should see the first line appear
        alone. Shortly after the second will appear.
      </p>
      <p>If streaming is NOT working, both will appear at the same time.</p>

      <div>rendered: {new Date(n).toLocaleString()}</div>
      <Suspense>
        <Await resolve={d}>
          {(d) => <div>deferred: {new Date(d).toLocaleString()}</div>}
        </Await>
      </Suspense>
    </div>
  );
}
