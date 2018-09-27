import React, { Component } from 'react';


export default class Stock extends Component{
  state = {
    currPrice: ""
  }

  componentDidMount(){
    let URL = `https://api.iextrading.com/1.0/stock/${this.props.data.symbol}/book`
    fetch(URL).then(
      res => res.json()).then(data => {
        this.setState({
          currPrice: data.quote.latestPrice
        })
      })
  }

  render(){
    return(
      <tr>
        <td>{this.props.data.name.replace(/"/g, '')}</td>
        <td>{this.props.data.symbol}</td>
        <td>${this.state.currPrice}</td>
      </tr>
    )
  }

}
