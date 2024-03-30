import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './Home.css';

function Home() {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('pune');
  const apiKey = process.env.REACT_APP_API_KEY;

  const loadNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${searchQuery}&from=2023-10-07&to=2023-10-07&sortBy=popularity&apiKey=${apiKey}`
      );
      setNews(response.data.articles);
    } catch (error) {
      console.error('Error loading news:', error);
      // Display an error message to the user
      setNews([]);
    }
  };

  useEffect(() => {
    loadNews();
  }, [searchQuery, apiKey]); // Include apiKey as a dependency

  return (
    <div>
      <h1>News App</h1>
      <input
        type='text'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {news.map((newsArticle, index) => {
        const { author, title, description, url, urlToImage, publishedAt, content } = newsArticle;
        return (
          <div key={index}>
            <h2>{title}</h2>
            {author && <p>Author: {author}</p>}
            {description && <p>Description: {description}</p>}
            {urlToImage && <img src={urlToImage} alt={title} />}
            {publishedAt && (
              <p>Published At: {new Date(publishedAt).toLocaleDateString()}</p>
            )}
            <p>{content}</p>
            <a href={url} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        );
      })}
    </div>
  );
}

Home.propTypes = {
  apiKey: PropTypes.string,
};

export default Home;