import { memo, useEffect, useState } from "react";

const POSTS_URL = "http://jsonplaceholder.typicode.com/posts?_limit=5";

const QueryExample = () => {
  const [posts, setPosts] = useState<
    { id: number; title: string; body: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(POSTS_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="section">
      <h2>1.Intro and Setup</h2>
      <p>
        This is our first example of using TanStack Query in a React
        application.
      </p>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {posts.map((post: { id: number; title: string; body: string }) => (
        <div key={post.id} className="card">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default memo(QueryExample);
