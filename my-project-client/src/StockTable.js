import React, { Component } from 'react';
import Stock from './Stock'

export default class StockTable extends Component{

  componentDidMount(){

  }

  render(){
    return(
      <table className="ui celled striped padded table">
            <tbody>
              <tr>
                <th>
                  <h3 className="ui center aligned header">
                    Name
                  </h3>
                </th>
                <th>
                  <h3 className="ui center aligned header">
                    Ticker
                  </h3>
                </th>
                <th>
                  <h3 className="ui center aligned header">
                    Current Price
                  </h3>
                </th>
              </tr>

              {this.props.stockList.map(function(stockInfo, idx){
                return < Stock key={idx} data={stockInfo} />
              })}

            </tbody>
          </table>
    )
  }

}
