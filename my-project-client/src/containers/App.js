import React, { Component } from 'react';
import StockTable from '../components/StockTable';
import '../stylesheets/App.css';
import SubmitButton from '../components/SubmitButton';
import DisplayETF from '../components/DisplayETF';
// import './CSVCrunch/StockList'

class App extends Component {

constructor(props){
  super(props)

  this.state = {
    allStocks: [],
    selectedStocks: [],
    currETF: null
  }

this.selectStock = this.selectStock.bind(this)
this.removeStock = this.removeStock.bind(this)
this.createETF = this.createETF.bind(this)

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
            allStocks: [...prevState.allStocks, {...stock, price: info.quote.extendedPrice}]
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
    }))
  }

  getUnselectedStocks(){
    return this.state.allStocks.filter(stock => !this.state.selectedStocks.includes(stock))
  }

  createETF(){
    fetch('http://localhost:3000/etfs', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user_id: 1, score: 0})
    }).then(res => res.json())
      .then(etf => this.setState({
        currETF: etf
      })
    ).then(() => this.createStockPicks())
  }

  createStockPicks(){
    this.state.selectedStocks.forEach(currStock => this.stockPickFetch(currStock))
  }

  stockPickFetch(stock){
    fetch('http://localhost:3000/stock_picks', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({etf_id: this.state.currETF.id, stock_id: stock.id, initial_price: stock.price})
    }).then(res => res.json())
      .then(stockPick => console.log(stockPick));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src='https://www.investmentweek.co.uk/w-images/788d48c0-a63c-4cce-8553-2bab367f1731/1/etfcards-580x358.jpg' className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to MeTF v0.1</h1>
        </header>
        <p className="App-intro">
          Please create your own ETF with 7 of the following stocks:
        </p>
      {this.state.currETF != null && < DisplayETF />}
      < StockTable stockList={this.state.selectedStocks} handleClick={this.removeStock} button={"remove"} />
      {this.state.selectedStocks.length} of 7
      {this.state.selectedStocks.length === 7 && < SubmitButton handleClick={this.createETF} />}
      < StockTable stockList={this.getUnselectedStocks()} handleClick={this.selectStock} button={"add"} />
      </div>
    );
  }
}

export default App;
