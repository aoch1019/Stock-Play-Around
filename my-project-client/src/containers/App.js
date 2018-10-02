import React, { Component } from 'react';
import '../stylesheets/App.css';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import MainView from './MainView';
import Login from '../components/Login';
import Signup from '../components/Signup';
import SignupSuccess from '../components/SignupSuccess';
import NavBar from '../components/NavBar';
import CreateETF from './CreateETF';
import ViewEtfs from './ViewEtfs';

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      allStocks: [],
      selectedStocks: [],
      topETFs: [],
      currETF: null,
      currUser: null,
      nameInput: ""
    }

    this.selectStock = this.selectStock.bind(this)
    this.removeStock = this.removeStock.bind(this)
    this.createETF = this.createETF.bind(this)

  }

  componentDidMount() {
    const topETFsPromise = fetch(`http://localhost:3000/etfs`).then(r => r.json())
    const stocksPromise = fetch(`http://localhost:3000/stocks`).then(r => r.json())

    Promise.all([topETFsPromise, stocksPromise])
     .then(data => {
       this.setState({topETFs: data[0]})
       return data[1]
    })
    .then(data => this.addCurrPrice(data))
  }

  addCurrPrice(stocksData){
    return stocksData.map(stock => {
      return fetch(`https://api.iextrading.com/1.0/stock/${stock.symbol}/book`)
        .then(res => res.json())
        .then(info => {
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
    fetch(`http://localhost:3000/users`)
    .then(res => res.json())
    .then(users => users.find(user => user.name === this.state.nameInput))
    .then(
        userObj => this.setState({
          currUser: userObj,
          nameInput: ""
    }))
  }

  handleSignupSubmit = (event) => {
    event.preventDefault()
    fetch(`http://localhost:3000/users`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'Post',
      body: JSON.stringify({
        name: this.state.nameInput
      })
    })
    .then(res => this.props.history.push('/SignupSuccess'), this.setState({
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
    })
    .then(res => res.json())
    .then(etf => this.setState({
        currETF: etf
      }))
    .then(() => this.createStockPicks())
    .then(() => this.setState({
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
        <React.Fragment>
          <NavBar {...this.state} handleLogout={this.handleLogout} />
          <Route
            exact
            path="/main-view"
            render={ (renderProps) => {
              return (
                  <MainView {...this.state}/>
                )
              }}
            />
          <Route
            exact
            path="/create-ETF"
            render={ (renderProps) => {
              return (
                <CreateETF  selectedStocks={this.state.selectedStocks}
                            removeStock={this.removeStock}
                            createETF={this.createETF}
                            unselectedStocks={this.getUnselectedStocks()}
                            selectStock={this.selectStock}
                            />
                        )
              }}
            />
          <Route
              exact path="/view-ETF"
              render={ (renderProps) => {
                return (
                  this.state.currUser === null ? "Please Log In" :
                  <ViewEtfs currUser={this.state.currUser}
                             allStocks={this.state.allStocks} />
                         )
              }}
            />
          <Route
            exact
            path="/Login"
            render={ (renderProps) => {
              return (
                <Login  handleNameInput={this.handleNameInput}
                        handleLoginSubmit={this.handleLoginSubmit}
                        nameInput={this.state.nameInput}
                        />
                    )
              }}
            />
          <Route
            exact
            path="/Signup"
            render={ (renderProps) => {
              return (
                <Signup handleNameInput={this.handleNameInput}
                        handleSignupSubmit={this.handleSignupSubmit}
                        nameInput={this.state.nameInput}
                        />
                    )
              }}
            />
            <Route
              exact
              path="/SignupSuccess"
              render={ (renderProps) => {
                return (
                  <SignupSuccess  handleNameInput={this.handleNameInput}
                                  handleSignupSubmit={this.handleSignupSubmit}
                                  nameInput={this.state.nameInput}
                                  />
                              )
                }}
              />
              <Route
                exact
                path="/Logout"
                render={ (renderProps) => {
                  return (
                    <Login  handleNameInput={this.handleNameInput}
                            handleLoginSubmit={this.handleLoginSubmit}
                            nameInput={this.state.nameInput}
                            />
                        )
                  }}
                />
        </React.Fragment>
      </div>
    );
  }
}

export default withRouter(App);
