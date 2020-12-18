import '../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';

const Ipo = () => {
  
  const [endOffset, setEndOffset] = useState(4);
  const [ipoData, setIpoData] = useState([]);

  // state = { endOffset: 9 };
  useEffect(() => {
    axios.get('https://finnhub.io/api/v1/calendar/ipo?from=2020-01-01&to=2020-04-30&token=bvbv2mn48v6rqg57nvcg').then(res => {
      let ipoDataRes = res.data;
      setIpoData(ipoDataRes.ipoCalendar);
    });
  }, []);

  const renderIPOData = () => {
    return ipoData.map(data => {
      return (
        <div key={data.id} className="">
          <p>
            <b>Date: </b>{data.date}
          </p>
          <p>
            <b>Exchange: </b>{data.exchange}
          </p>
          <p>
            <b>Name: </b>{data.name}
          </p>
          <p>
            <b>Number of shares: </b>{data.numberOfShares}
          </p>
          <p>
            <b>Price: </b>{data.price}
          </p>
          <p>
            <b>Status: </b>{data.status}
          </p>
          <p>
            <b>Symbol: </b>{data.symbol}
          </p>
          <p>
            <b>Total shares value: </b>{data.totalSharesValue}
          </p>
        </div>
      );
    });
  }

  return (
    <div>
      <p className="market-news-data-single-list-container-heading">IPO Calendar Data</p>
      {
        renderIPOData()
      }
      <Button 
        onClick={() => setEndOffset(endOffset+5)} 
        variant="contained" 
        color="primary"
        fullWidth
      >
        Show More
      </Button>
    </div>
  );
  
};

export default Ipo;