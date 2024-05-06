import React from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../routes/constants";

const Header: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="top">
                    <NavLink to={ROUTES.HOME}>
                        Movies
                        <br />
                        A01026512
                    </NavLink>
                </div>
                <ul>
                    <li>
                        <NavLink to={ROUTES.HOME}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={ROUTES.POPULAR}>Popular</NavLink>
                    </li>
                    <li>
                        <NavLink to={ROUTES.TOPRATED}>Top Rated</NavLink>
                    </li>
                    <li>
                        <NavLink to={ROUTES.UPCOMING}>Upcoming</NavLink>
                    </li>
                    <li>
                        <NavLink to={ROUTES.FAVORITES}>My Favorites</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
