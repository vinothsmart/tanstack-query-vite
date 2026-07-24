import { useQuery } from "@tanstack/react-query";
import { memo } from "react";

const POSTS_URL = "http://jsonplaceholder.typicode.com/postss?_limit=5";

const fetchPosts = async () => {
  const response = await fetch(POSTS_URL);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return await response.json();
};

const QueryExample = () => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  //   const {
  //     isPending,
  //     isError,
  //     data: posts,
  //     error,
  //   } = useQuery({
  //     queryKey: ["posts"],
  //     queryFn: fetchPosts,
  //   });

  return (
    <div className="section">
      <h2>1.Intro and Setup</h2>
      <p>
        This is our first example of using TanStack Query in a React
        application.
      </p>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {posts?.map((post: { id: number; title: string; body: string }) => (
        <div key={post.id} className="card">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default memo(QueryExample);
