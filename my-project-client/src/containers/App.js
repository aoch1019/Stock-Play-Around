import React, { Component } from 'react';
import '../stylesheets/App.css';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/Signup';
import NavBar from '../components/NavBar';
import MainViewContainer from './MainViewContainer';
import ViewEtfs from './ViewEtfs';
// import './CSVCrunch/StockList'

class App extends Component {

constructor(props){
  super(props)

  this.state = {
    allStocks: [],
    selectedStocks: [],
    currETF: null,
    currUser: null,
    nameInput: ""
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

  handleNameInput = (event) => {
    this.setState({nameInput: event.target.value})
  }

  handleLoginSubmit = (event) => {
    event.preventDefault()
    fetch(`http://localhost:3000/users`).then(res => res.json()).then(
      users => users.find(user => user.name === this.state.nameInput)).then(
        userObj => this.setState({
          currUser: userObj,
          nameInput: ""
    }))
  }

  handleLogout = (event) => {
    this.setState({currUser: null})
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
      body: JSON.stringify({user_id: this.state.currUser.id, score: 0})
    }).then(res => res.json())
      .then(etf => this.setState({
        currETF: etf
      })
    ).then(() => this.createStockPicks()).then(() => this.setState({
      selectedStocks: []
    }))
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
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src='https://www.investmentweek.co.uk/w-images/788d48c0-a63c-4cce-8553-2bab367f1731/1/etfcards-580x358.jpg' className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to MeTF v0.1</h1>
        </header>
        <Router>
          <React.Fragment>
            {this.state.currUser ?
                            <div>
                              {this.state.currUser.name} is logged in.
                              <button className="ui tiny button" onClick={this.handleLogout}>Logout</button>
                            </div>
                          :
                            <Login  handleNameInput={this.handleNameInput}
                                    handleLoginSubmit={this.handleLoginSubmit}
                                    {...this.state}
                                    />}
            < NavBar />
            <Route
              exact path="/main-view"
              render={ (renderProps) => {
                return (
                  < MainViewContainer selectedStocks={this.state.selectedStocks}
                                      removeStock={this.removeStock}
                                      createETF={this.createETF}
                                      unselectedStocks={this.getUnselectedStocks()}
                                      selectStock={this.selectStock} />
                )
              }}
              />
            <Route
              exact path="/view-ETF"
              render={ (renderProps) => {
                return (
                  this.state.currUser === null ? "Please Log In" :
                  < ViewEtfs currUser={this.state.currUser}
                             allStocks={this.state.allStocks} />
                )
              }}
              />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
