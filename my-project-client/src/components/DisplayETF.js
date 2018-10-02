import React, { Component } from 'react';
import ETFTable from './ETFTable';

export default class DisplayETF extends Component{
  constructor(props){
    super(props)
    this.state = {
      pickList: []
    }

    this.getAllPicks = this.getAllPicks.bind(this)
    this.getStockInfo = this.getStockInfo.bind(this)
  }


  componentDidMount(){
    this.getAllPicks()
  }

  getAllPicks(){
    let etfID = this.props.etf.id

    fetch(`http://localhost:3000/stock_picks`).then(res => res.json()).then(
      picks => picks.filter(pick => pick.etf_id === etfID)
    ).then(etfPicks => {
      this.getStockInfo(etfPicks)
    })
  }

  getStockInfo(etfPicks){
    etfPicks.forEach(pick => {
        let currStock = this.props.allStocks.find(stock => stock.id === pick.stock_id)
        let toAdd = {...pick, name: currStock.name, symbol: currStock.symbol, current_price: currStock.price}
        this.setState(prevState => ({
          pickList: [...prevState.pickList, toAdd]
        }))
      })
  }
        // fetch(`http://localhost:3000/stocks/${pick.stock_id}`).then(res => res.json()).then(stock => {
        // let info = {...pick, name: stock.name, symbol: stock.symbol}
        // console.log(this.props.allStocks)
        // debugger
        // this.setState(prevState => ({
        //   pickList: [...prevState.pickList, info]
        // }))
      // this.setState(prevState => ({
      //   pickList: prevState.pickList.map((currPick, currIdx) => {
      //     console.log(stock)
      //     console.log(currPick)
      //     if(currIdx === idx){
      //       debugger
      //       currPick = {...currPick, name: stock.name, symbol: stock.symbol}
      //     }
      //   })
      // }))
  //   // })
  //   )
  // }

  render(){
    return(

      <table className="ui celled striped padded table">
          <tbody>
        {this.state.pickList.map(function(pick, idx){
          return <ETFTable key={idx} idx={idx} pick={pick} />
          })
        }
        </tbody>
      </table>


    )
  }


}
