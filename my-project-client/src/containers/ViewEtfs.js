import React, { Component } from 'react';
import DisplayETF from '../components/DisplayETF';

export default class ViewEtfs extends Component{

  constructor(props){
    super(props)
    this.state = {
      etfList: []
    }

    this.getAllEtfs = this.getAllEtfs.bind(this)
  }


  componentDidMount(){
    this.getAllEtfs()
  }

  getAllEtfs(){
    let userID = this.props.currUser.id

    fetch(`http://localhost:3000/etfs`).then(res => res.json()).then(
      etfs => etfs.filter(etf => etf.user_id === userID)
    ).then(userEtfs => {
      this.setState({
        etfList: userEtfs
      })
    })
  }

  // changeState(etf, userID){
  //   if(etf.user_id === userID){
  //     this.setState({
  //         etfList: etf
  //     })
  //   }
  // }

  render(){
    return(
        this.state.etfList.map((etf, idx) => < DisplayETF key={idx} etf={etf} allStocks={this.props.allStocks} />)
    )
  }

}
