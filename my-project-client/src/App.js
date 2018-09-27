import React, { Component } from 'react';
import StockTable from './StockTable';
import SelectedStocks from './SelectedStocks';
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
      res => res.json()).then(data => {
        this.setState({
          allStocks: data
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
      < SelectedStocks selected={this.state.selectedStocks} handleClick={this.removeStock}/>
      < StockTable stockList={this.unselectedStocks()} handleClick={this.selectStock}/>
      </div>
    );
  }
}

export default App;
