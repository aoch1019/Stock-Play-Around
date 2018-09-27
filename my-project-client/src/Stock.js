import React, { Component } from 'react';


export default class Stock extends Component{
  state = {
    currPrice: ""
  }

  componentDidMount(){
    let URL = `https://api.iextrading.com/1.0/stock/${this.props.stockInfo.symbol}/book`
    fetch(URL).then(
      res => res.json()).then(data => {
        this.setState({
          currPrice: data.quote.latestPrice
        })
      })
  }

  onButtonClick = (event) => {
    this.props.handleClick(this.props.stockInfo)
  }

  render(){
    return(
      <tr>
        <td>{this.props.stockInfo.name.replace(/"/g, '')}</td>
        <td>{this.props.stockInfo.symbol}</td>
        <td>${this.state.currPrice}</td>
        <td><button onClick={this.onButtonClick}> {this.props.button === "add" ? "Add Stock" : "Remove Stock"} </button></td>
      </tr>
    )
  }

}
