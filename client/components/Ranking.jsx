import React, { useState, useContext, useEffect} from 'react'
import { MenuContext } from "react-flexible-sliding-menu"
import { useHistory } from 'react-router-dom'


const Ranking = () => {
    const { closeMenu } = useContext(MenuContext);
    let history = useHistory();

    // save stats from database
    const [globalStats, setGlobalStats] = useState('')
    const [userStats, setUserstats] = useState('')
    
    useEffect(() => {
      fetch("/globalRanking")
      .then((data) => data.json())
      .then((data) => setGlobalStats(data))
    })

    useEffect(() => {
      fetch("/")
      .then((data) => data.json())
      .then((data) => setUserstats(data))
    })

    const logout = () => {
      closeMenu();
      history.push('/')
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

        {/* Need to wait for backend */}
        <div className="global-ranking-count">PERSON found # messages</div>
        <div>{globalStats && globalStats.map((element) => {
          <div>{element.globalRank}</div>
        })}
        {/* Need to wait for backend */}
        </div>
      </div>

      
      <div id="your-ranking-container" className="global-ranking-container">
        <div className="global-ranking-title">Your Ranking</div>
        <div className="global-ranking-count">USERNAME NUMBER RANKED</div>

                {/* Need to wait for backend */}
                <div className="global-ranking-count">PERSON found # messages</div>
        <div>{globalStats && globalStats.map((element) => {
          <div>{element.globalRank}</div>
        })}
        {/* Need to wait for backend */}
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