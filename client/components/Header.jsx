import React, { useContext } from 'react'
import { MenuContext } from 'react-flexible-sliding-menu'
import { useHistory } from 'react-router-dom'

const Header = ({userID}) => {

    const history = useHistory();

    const redirect = () => {
        history.push("/stash", {userID})
    }

    console.log("header userID ", userID);
    const { toggleMenu } = useContext(MenuContext)
    return (
        <div className="map-header">
            <div onClick={toggleMenu} className="map-logo"><i class="fa fa-trophy"></i></div>
            <div onClick={redirect} className="stash-icon" state={{userID}}><div className="hamburger-icon"><i class="fa fa-user-secret"></i></div></div>
        </div>
    )
}

export default Header;