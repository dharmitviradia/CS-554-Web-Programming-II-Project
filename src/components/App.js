import '../style/App.css';
import React from 'react';
import { Container } from '@material-ui/core';
import axios from 'axios';
import Header from './Header';
import MarketNews from './MarketNews';

class App extends React.Component {

  state = { marketNews: [], startOffset: 0, endOffset: 9 };

  async componentDidMount() {
    await axios.get('https://finnhub.io/api/v1/news?category=general&token=bvbv2mn48v6rqg57nvcg').then(res => {
      const marketNews = res.data;
      this.setState({ marketNews });
    });
  }

  onShowMoreClick = (endOffSet) => {
    this.setState({ startOffset: this.state.endOffset, endOffSet: this.state.endOffset+10 });
  }

  render() {
    console.log(this.state.marketNews);
    return (
      <Container id="app-container">
        <Header />
        <br />
        <hr />
        <MarketNews 
          marketNewsData={this.state.marketNews} 
          startOffset={this.state.startOffset}
          endOffset={this.state.endOffset}
        />
      </Container>
    );
  }
}

export default App;