import React from "react";
import "./index.css";

const Article = ({ details, index, toRef }) => {
  const lastIndexOfDot = details.thumb.lastIndexOf(".");
  const imgUrl = [details.thumb.slice(0, lastIndexOfDot), "-440x280", details.thumb.slice(lastIndexOfDot)].join("");

  return (
    <div className="column has-text-centered is-half fancy-card">
      <a href={details.url} target="_blank" rel="noreferrer">
        <div id={`article${index}`} key={index}>
          <div className="card-image image">
            <img src={imgUrl} alt={details.title} />
          </div>
          <div className="card-content">
            <p className="title is-5" ref={toRef}>{details.title}</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Article;
