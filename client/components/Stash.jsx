import React, { useState, useEffect } from 'react'
import Header from './Header'
// import StashOutput from './StashOuput'

const Stash = () => {

  // save stash from backend
  const [stash, setStash] = useState([])

  // // get stash from backend
  useEffect(() => {
    fetch('http://localhost:3000/secrets/stash', {
      method: POST,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stash)
    })
    .then((res) => res.json())
    .then((data) => setStash(data))
  })

  console.log("this is stash ", stash)

    return (
    <>
      <Header />
      <div className="stash-container">
        <div className="stash-title">Your Stash</div>
      </div>
      {/* <div className="stash-list">
        {stash && stash.map((element, index) => (
          <StashOutput key={index} stashItem={stash}/>
    ))}
      </div> */}
    </>
    )
}

export default Stash;