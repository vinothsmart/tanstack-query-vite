import { memo, useEffect, useState } from "react";

const POSTS_URL = "http://jsonplaceholder.typicode.com/posts?_limit=5";

const QueryExample = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(POSTS_URL);
      const data = await response.json();
      setPosts(data);
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
      {posts.map((post: any) => (
        <div key={post.id} className="card">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default memo(QueryExample);
