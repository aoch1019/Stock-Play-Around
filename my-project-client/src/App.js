import React, { Component } from 'react';
import StockTable from './StockTable';
import './stylesheets/App.css';
import stockObj from './StockObj'
// import './CSVCrunch/StockList'

class App extends Component {
  state = {
    allStocks: []
  }

  componentDidMount(){
    this.setState({
      allStocks: stockObj
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src='https://www.investmentweek.co.uk/w-images/788d48c0-a63c-4cce-8553-2bab367f1731/1/etfcards-580x358.jpg' className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to MeTF v0.1</h1>
        </header>
        <p className="App-intro">
          Please create your own ETF with the following stocks:
        </p>
        < StockTable stockList={this.state.allStocks} />
      </div>
    );
  }
}

export default App;
