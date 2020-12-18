import '../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';

const Ipo = () => {
  
  const [endOffset, setEndOffset] = useState(8);
  const [ipoData, setIpoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
        try {
            const {data} = await axios.get(`https://finnhub.io/api/v1/calendar/ipo?from=2020-01-01&to=2020-04-30&token=bvbv2mn48v6rqg57nvcg`);
            setIpoData(data);
            setLoading(false);
        } catch(e) {
            console.log(e);
        }
    }

    fetchData();
  }, []);

  console.log('here',ipoData)
  const renderIPOData = () => {
    return ipoData.ipoCalendar.slice(0, endOffset).map(data => {
      return (
        <div key={data.id}>
            <figure class="snip1529">
                <img className="ipo-image" src="https://cdn.wallpapersafari.com/56/10/aLXqcy.jpg" alt={data.id} />
                <div class="date"><span class="day" style={{padding: 5}}>{data.date}</span></div>

                <figcaption>
                    <h3>{data.name}</h3>
                    <p>Exchange: {data.exchange || 'NA'}</p>
                    <p>Price: {data.price || 'NA'}</p>
                    <p>Number of Shares: {data.numberOfShares || 'NA'}</p>
                    <p>Status: {data.status || 'NA'}</p>
                    <p>Symbol: {data.symbol || 'NA'}</p>
                    <p>Total Shares Value: {data.totalSharesValue || 'NA'}</p>
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
                    {renderIPOData()}
                </div>

            <div onClick={() => setEndOffset(endOffset+8)} className="load-more">
                Read More
            </div>
            </div>
        );
};

export default Ipo;
