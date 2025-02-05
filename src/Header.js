import "./assets/css/Header.css";

function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <a href=" ">
                            {/* <img src={require("./assets/image/Seaprince-white.png")} alt="Logo" /> */}
                            LOGO
                        </a>
                    </li>
                    <li>
                        <a href=" ">
                            <img src={require("./assets/image/user-logo.png")} alt="Profile"  />
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
export default Header;