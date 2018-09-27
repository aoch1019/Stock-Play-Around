import React from 'react';
import Stock from './Stock'

const StockTable = (props) => {

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
                <th>
                  <h3 className="ui center aligned header">
                    Remove
                  </h3>
                </th>
              </tr>

              {props.selected.map(function(stockInfo, idx){
                return < Stock key={idx} stockInfo={stockInfo} handleClick={props.handleClick} button={"remove"} />
              })}

            </tbody>
          </table>
    )

}

export default StockTable
