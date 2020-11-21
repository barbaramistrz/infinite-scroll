import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.sass";
import Article from "./Article";
import axios from "axios";

function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [end, setEnd] = useState(false);


  const observer = useRef()
  const lastArticleRef = useCallback(node => {
    if(isLoading) return
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver( entries => {
      if(entries[0].isIntersecting && !end){
         setPageNumber(prev => prev + 1)
      }
    })
    if(node) observer.current.observe(node)
  }, [isLoading, end])

  useEffect(() => {
    setIsError(false);
    setIsLoading(false);

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios(
          `http://localhost:3000/posts?_page=${pageNumber}&_limit=10`
        );
        result.data.length === 0 && setEnd(true);
        setArticles(prev => [...prev, ...result.data]);
        setIsLoading(false);
        console.log(`Załadowane ${(pageNumber - 1) * 10} artykułów`)
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pageNumber]);

  return (
    <>
      <div className="container">
        <div className=" columns is-multiline is-fluid box">
          {articles.map((item, index) => {
            if(articles.length === index + 1) {
              return <Article toRef={lastArticleRef} key={index} details={item} />
            }
              return <Article key={index} details={item} />
          })}
          {isError && <div className="has-text-centered">Ups!</div>}
          {isLoading && <div className="has-text-centered">...</div>}
          {end && <div className="has-text-centered">Koniec</div>}
        </div>
       
      </div>
    </>
  );
}

export default App;
