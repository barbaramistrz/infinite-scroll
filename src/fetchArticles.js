import axios from "axios";
const numberOfArticles = 10;
const url = `http://localhost:5000/posts?_limit=${numberOfArticles}&_page=`;

const fetchArticles = async (pageNumber) => {
  try {
    const result = await axios(url + pageNumber);
    return [true, result];
  } catch (error) {
    console.debug(error);
    return [false, null];
  }
};

export default fetchArticles;
