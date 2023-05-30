import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPosts } from "../servisec/posts";
import { useAsync } from "../hooks/useAsync";
import useDebounce from "../hooks/useDebounce";
import useSearch from "../hooks/useSearch";
import emitter from "../system/event";
import Posts from "../components/Posts";
import Gooey from "../Gooey";
const DELAY_TIME = 500;

const Home = React.memo(() => {
  const [posts, setPosts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [, category] = useLocation().search.split("=");

  const { search, serchBy, setSearchBy } = useSearch();
  const debounce = useDebounce(searchValue, DELAY_TIME);
  const { loading, error, value, status } = useAsync(
    () => getPosts(category || null),
    [category || null]
  );

  useEffect(() => {
    if (debounce.trim("") !== "") {
      const filteredResult = value.filter((post) =>
        post[`${serchBy}`].toLowerCase().includes(debounce.toLowerCase())
      );
      const searchResultPosts = search(debounce, filteredResult);
      setPosts(searchResultPosts);
    } else setPosts(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, debounce, serchBy]);

  useEffect(() => {
    const handleSearch = (data) => {
      setSearchValue(data.query);
      if (!data.searcValue) setSearchBy("title");
      else setSearchBy(data.searcValue);
    };

    emitter.on("search", handleSearch);
    return () => emitter.clear("search");
  }, [setSearchBy]);

  if (loading) return <Gooey />;

  if (error || !value || status === "rejected") {
    return <h1>{error}</h1>;
  }

  return (
    <div className="home">
      {posts?.length === 0 ? (
        <h1>No shuch category </h1>
      ) : (
        <div className="posts">
          <Posts posts={posts} />
        </div>
      )}
    </div>
  );
});

export default Home;
