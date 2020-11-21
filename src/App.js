import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.sass";
import Article from "./Article";
import fetchArticles from "./fetchArticles";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [end, setEnd] = useState(false);

  const bottomOfThePage = useRef();
  const lastArticleRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (bottomOfThePage.current) bottomOfThePage.current.disconnect();
      bottomOfThePage.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !end) setPageNumber((prev) => prev + 1);
      });
      if (node) bottomOfThePage.current.observe(node);
    }, [isLoading, end]);

  useEffect(() => {
    setIsError(false);
    setIsLoading(false);

    const fetchData = async () => {
      setIsLoading(true);
      const [success, result] = await fetchArticles(pageNumber);
      if (success) {
        result.data.length === 0 && setEnd(true);
        setArticles((prev) => [...prev, ...result.data]);
        setIsLoading(false);
      } else {
        setIsError(true);
        setIsLoading(false);
        setEnd(true);
      }
    };
    fetchData();
  }, [pageNumber]);

  return (
    <div className="container">
      <div className=" columns is-multiline is-fluid box">
        {articles.map((item, index) => {
          if (articles.length === index + 1) {
            return (
              <Article toRef={lastArticleRef} key={index} details={item} />
            );
          }
          return <Article key={index} details={item} />;
        })}
        {isError && (
          <div className="has-text-centered column">
            <p className="subtitle has-text-danger-dark is-6">Ups!</p>
          </div>
        )}
        {isLoading && (
          <div className="has-text-centered column">
            <p className="subtitle has-text-danger-dark is-6">...</p>
          </div>
        )}
        {end && (
          <div className="has-text-centered column">
            <p className="subtitle has-text-danger-dark  is-6">KONIEC</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;