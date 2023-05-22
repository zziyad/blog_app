import { useState, useCallback } from "react";

function useSearch() {
  const [serchBy, setSearchBy] = useState("");

  const search = useCallback((textToSearch, searchResult) => {
    textToSearch = textToSearch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    let pattern = new RegExp(`${textToSearch}`, "gi");
    const searchPost = searchResult.map((post) => {
      const f = post[`${serchBy}`].replace(
        pattern,
        (match) => `<mark>${match}</mark>`
      );

      return serchBy === "title"
        ? { ...post, title: f }
        : { ...post, body: f };
    });
    return searchPost;
  }, [serchBy]);

  return { search, serchBy, setSearchBy };
}

export default useSearch;