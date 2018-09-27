import React, { Component } from 'react';
import StockTable from './StockTable';
import './stylesheets/App.css';
// import './CSVCrunch/StockList'

class App extends Component {

constructor(props){
  super(props)

  this.state = {
    allStocks: [],
    selectedStocks: []
  }

this.selectStock = this.selectStock.bind(this)
this.removeStock = this.removeStock.bind(this)

}


  componentDidMount(){
    fetch(`http://localhost:3000/stocks`).then(
      res => res.json())
      .then(data => {
        this.addCurrPrice(data)
      })
  }

  addCurrPrice(stocksData){
    return stocksData.map(stock => {
      return fetch(`https://api.iextrading.com/1.0/stock/${stock.symbol}/book`).then(
        res => res.json()).then(info => {
          this.setState(prevState => ({
            allStocks: [...prevState.allStocks, {...stock, price: info.quote.latestPrice}]
          }))
        })
    })
  }

  selectStock(stock){
    this.setState(prevState => ({
      selectedStocks: [...prevState.selectedStocks, stock]
    }))
  }

  removeStock(stock){
    this.setState(prevState => ({
      selectedStocks: prevState.selectedStocks.filter(elem => elem !== stock)
    }), () => console.log(this.state.selectedStocks))
  }

  unselectedStocks(){
    return this.state.allStocks.filter(stock => !this.state.selectedStocks.includes(stock))
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
      < StockTable stockList={this.state.selectedStocks} handleClick={this.removeStock} button={"remove"} />
      < StockTable stockList={this.unselectedStocks()} handleClick={this.selectStock} button={"add"} />
      </div>
    );
  }
}

export default App;
