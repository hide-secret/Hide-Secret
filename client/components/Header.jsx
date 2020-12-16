import React, { useContext } from 'react'
import { MenuContext } from 'react-flexible-sliding-menu'

const Header = () => {
    const { toggleMenu } = useContext(MenuContext)
    return (
        <div className="map-header">
            <div onClick={toggleMenu} className="map-logo"><i class="fa fa-bars"></i></div>
            <a className="stash-icon" href="/stash"><div className="hamburger-icon"><i className="fa fa-user-secret"></i></div></a>
        </div>
    )
}

export default Header;