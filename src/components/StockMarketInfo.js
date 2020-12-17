import '../style/StockMarketInfo.css';
import React from 'react';
import axios from 'axios';
import { Router } from 'react-router';
import { Route } from 'react-router-dom'

class StockMarketInfo extends React.Component {

  state = { marketNews: [] };
  
  async componentDidMount() {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}`);

  }
  render() {
    return (
      <div id="stock-market-info-container">
        <p id="stock-market-info-heading">
          Stock Market
        </p>
        <div id="stock-market-api-data">
          {
            this.render
          }
        </div>
      </div>
    );
  }
}

export default StockMarketInfo;