import { useQuery } from "@tanstack/react-query";
import { memo, useCallback, useState } from "react";

const POSTS_URL = "http://jsonplaceholder.typicode.com/posts?_limit=5";

const fetchPosts = async () => {
  const response = await fetch(POSTS_URL);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return await response.json();
};

const MutationExample = () => {
  const [isLoadData, setIsLoadData] = useState(false);

  const handleLoadData = useCallback(() => {
    setIsLoadData(true);
  }, []);

  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    enabled: isLoadData,
  });

  const handleRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="section">
      <h2>1.Intro and Setup</h2>
      <p>
        This is our first example of using TanStack Query in a React
        application.
      </p>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <button onClick={handleLoadData}>Load Data</button>
      <button onClick={handleRefetch}>Refetch</button>
      {posts?.map((post: { id: number; title: string; body: string }) => (
        <div key={post.id} className="card">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default memo(MutationExample);
