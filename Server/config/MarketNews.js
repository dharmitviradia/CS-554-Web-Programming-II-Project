import '../style/MarketNews.css';
import React from 'react';
import { Button } from '@material-ui/core';

class MarketNews extends React.Component {
  state = { endOffset: 9 };

  renderMarketNewsList = () => {
    return this.props.marketNewsData.slice(0, this.state.endOffset).map(data => {
      return (
        <div key={data.key} className="market-news-data-single-list-container">
          <p>
            <b>Category: </b>{data.category}
          </p>
          <p>
            <b>Date/Time: </b>{data.datetime}
          </p>
          <p>
            <b>Headline: </b>{data.headline}
          </p>
          <p>
            <b>Id: </b>{data.id}
          </p>
          <p>
            <b>Image: </b><br />
            <img className="market-news-data-single-list-img" src={data.image} alt={`Market News List id: ${data.id} could not be displayed.`} />
          </p>
          <p>
            <b>Related: </b>{data.related}
          </p>
          <p>
            <b>Source: </b>{data.source}
          </p>
          <p>
            <b>Summary: </b>{data.summary}
          </p>
          <p>
            <b>URL: </b>{data.url}
          </p>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <p className="market-news-data-single-list-container-heading">Market News</p>
        {
          this.renderMarketNewsList()
        }
        <Button 
          onClick={() => this.setState({ endOffset: this.state.endOffset+10 })} 
          variant="contained" 
          color="primary"
          fullWidth
        >
          Show More
        </Button>
      </div>
    );
  }
};

export default MarketNews;