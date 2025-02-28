import { useAuth } from "@webbydevs/react-laravel-sanctum-auth";
import "./assets/css/Header.css";

function Header() {
    const { user } = useAuth;

    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <a href=" ">
                            <img src={require("./assets/image/Seaprince-white.png")} alt="Logo" />
                            {/* LOGO */}
                        </a>
                    </li>
                    <li>
                        <a href="/profile">
                            <img src={require("./assets/image/user-logo.png")} alt="Profile" />
                        </a>
                    </li>
                    <div>
                        {user ? (
                            <button
                                onClick={
                                    {
                                        /*logout*/
                                    }
                                }
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={
                                    {
                                        /*logout*/
                                    }
                                }
                            >
                                Login
                            </button>
                        )}
                    </div>
                </ul>
            </nav>
        </header>
    );
}
export default Header;