import { Link } from "react-router";

function Nav() {

    return (
        <nav>
            <div className="brand">
                <img src="/images/icon-music-logo.png" alt="MusicNest logo" className="logo" />
                <h1>MusicNest</h1>
            </div>
            <ul className="navigation-items">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/music-groups">Music Groups</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav