import { createContext, useContext } from "react";
import { useAsync } from "../hooks/useAsync";
import { getPost } from "../servisec/posts";
import { useParams } from "react-router-dom";
import Gooey from "../Gooey";

const PostContext = createContext("No Provider");

export function usePost() {
  return useContext(PostContext);
}

export const PostProvider = ({ children }) => {
  const { id } = useParams();

  const { 
    loading, error, value: post, status 
  } = useAsync(() => getPost(id), [id]);

  console.log({ error, post, status });

  if (loading) return <Gooey />;

  if (error && status === "rejected") return <h5>{error.message}</h5>;

  return (
    <PostContext.Provider
      value={{
        post: { id, ...post },
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
