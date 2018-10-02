import React from 'react';
import LeaderboardRow from '../components/LeaderboardRow'

const Leaderboard = (props) => {
  return (
    <table className="ui celled striped padded table">
          <tbody>
            <tr>
              <th>
                <h3 className="ui center aligned header">
                  Place
                </h3>
              </th>
              <th>
                <h3 className="ui center aligned header">
                  Name
                </h3>
              </th>
              <th>
                <h3 className="ui center aligned header">
                  Score
                </h3>
              </th>
            </tr>

            {props.topETFs.map(function(etf, idx){
              return <LeaderboardRow  key={idx}
                                      etf={etf}
                                      place={idx+1}
                                      handleSelectedLeaderBoardUser={props.handleSelectedLeaderBoardUser}
                                      />
            })}

          </tbody>
        </table>
  )
}

export default Leaderboard
