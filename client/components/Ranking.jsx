import React, { useState, useContext, useEffect} from 'react'
import { MenuContext } from "react-flexible-sliding-menu"
import { useHistory } from 'react-router-dom'
import axios from 'axios'


const Ranking = ({userId}) => {
    const { closeMenu } = useContext(MenuContext);
    let history = useHistory();

    // save stats from database
    const [globalStats, setGlobalStats] = useState([])
    
    useEffect(() => {
      axios("http://localhost:3000/secrets/ranking")
      .then((data) => setGlobalStats(data.data))
    }, [])

    const logout = () => {
      closeMenu();
      history.push('/')
    }
    
    const getMyRank = () => {
      let text = 'th'
      for (let i = 0; i < globalStats.length; i++) {
        if (globalStats[i].userid === userId) {
          if(i === 0 ) text = 'st'
          else if(i === 1 ) text = 'nd'
          else if(i === 2 ) text = 'rd'
          return (<div>
              <p>{globalStats[i].username.charAt(0).toUpperCase() + globalStats[i].username.slice(1)}: {(i + 1)}<sup>{text}</sup> Place</p>
          </div>)
        }
      }
    }

    return (
        <>
        <div className="ranking-main-container">
        <button className="x-btn" onClick={closeMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </button>
      <div className="global-ranking-container">
        <div className="global-ranking-title">Global Ranking</div>


        <div className="global-ranking-count">{globalStats && globalStats.map((element, index) => {
          let text = 'th'
          if(index === 0 ) text = 'st'
          else if(index === 1 ) text = 'nd'
          else if(index === 2 ) text = 'rd'
          return (
              <div>
                {element.username.charAt(0).toUpperCase() + element.username.slice(1)} - {element.score} - {++index}<sup>{text}</sup> Place
              </div>
              )
            }
          )}
        </div>
      </div>

      
      <div id="your-ranking-container" className="global-ranking-container">
        <div className="global-ranking-title">Your Ranking</div>
        <div className="global-ranking-count">
          {getMyRank()}
        </div>

      </div>
      <footer className="ranking-footer">
        <button onClick={logout} className="btn">Logout</button>
      </footer>
      </div>
      </>
    )
}

export default Ranking;