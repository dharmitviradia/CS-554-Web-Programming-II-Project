import '../style/MarketNews.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';

const MarketNews = () => {
  
  const [endOffset, setEndOffset] = useState(8);
  const [marketNews, setMarketNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // state = { endOffset: 9 };
  useEffect(() => {
      async function fetchData() {
          try {
              const {data} = await axios.get(`https://finnhub.io/api/v1/news?category=general&token=bvbv2mn48v6rqg57nvcg`);
              setMarketNews(data);
              setLoading(false);
          } catch(e) {
              console.log(e);
          }
      }

      fetchData();
    }, []);

  const renderMarketNewsList = () => {
    return marketNews.slice(0, endOffset).map((data, index) => {
      console.log(index);

      return (
        <div>
            <figure class="snip1529">
                <img src={data.image} alt={data.id} />
                <div class="date"><span class="day">25</span><span class="month">Dec</span></div>
                <figcaption>
                    <h3>{data.headline}</h3>
                    <p>{data.summary}</p>
                </figcaption>
                <div class="hover"><i class="ion-android-open"></i></div>
                <a href={data.url} target="_blank"></a>
            </figure>
        </div>
      );
    });
  }

  if (loading) {
      return (
          <div>
              Loading...
          </div>
      )
  } else return (
            <div className="news-container">
                <div className="news-wrapper">
                    {renderMarketNewsList()}
                </div>

                <div onClick={() => setEndOffset(endOffset+8)} className="load-more">
                    Read More
                </div>
            </div>
        );
  
};

export default MarketNews;