import React from 'react'

const StashOutput = ({stashItem}) => {
    console.log("Stash output", stashItem)
    return ( 
        stashItem ?
        <div className="stash-item">
        {stashItem} 
        </div>
        : 
        null
    )
}

export default StashOutput;