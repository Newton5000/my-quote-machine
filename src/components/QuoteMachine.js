import "../styles/QuoteMachine.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const QuoteMachine = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await axios.get("https://api.quotable.io/random");
      setQuote(response.data.content);
      setAuthor(response.data.author);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  const tweetQuote = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `"${quote}" - ${author}`
    )}`;
    window.open(tweetUrl, "_blank");
  };

  return (
    <div id="quote-box" className="quote-box">
      <div id="text" className="quote-text">
        {quote}
      </div>
      <div id="author" className="quote-author">
        - {author}
      </div>
      <div className="quote-actions">
        <button id="new-quote" className="new-quote-btn" onClick={fetchQuote}>
          New Quote
        </button>
        <a
          id="tweet-quote"
          className="tweet-quote-link"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `"${quote}" - ${author}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={tweetQuote}
        >
          Tweet Quote
        </a>
      </div>
    </div>
  );
};

export default QuoteMachine;
