import React from 'react'

const StashOutput = ({stashItem}) => {
    console.log("Stash output", stashItem)
    return ( 
        <div>
        {stashItem} 
        </div>
    )
}

export default StashOutput;