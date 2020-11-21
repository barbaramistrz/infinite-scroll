import React from "react";
import "./index.css";

const Article = ({ details, index, toRef }) => {

  return (
      <div  className="column has-text-centered is-half fancy_card">
    <a href={details.url} target="_blank" rel="noreferrer" >
        <div id={`article${index}`} key={index}>
      <img
        src={details.thumb}
        alt={details.title}
        height="200px"
        className="card-image is-inline-block"
      />
      {/* <figcaption>{details.date.slice(0, 10)}</figcaption> */}
      <div className="card-content" >
        <p className="title is-5" ref={toRef}>{details.title}</p> 
        </div>

  
    </div>
    </a>
    </div>
  );
};

export default Article;