import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useCart } from "../hooks/useCart";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

function Header(props) {

    const { user, userProfile } = useAuth();
    const navigate = useNavigate();
    const { totalPrice } = useCart();

    const [openMenu, setOpenMenu] = useState(false);
    const menuRef = useRef(null);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setOpenMenu(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setOpenMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleCartClick = () => {
        setOpenMenu(false);

        if (!user) {
            navigate("/login");
            return;
        }

        props.openCart();
    };

    return (
        <header className="siteHeader">

            {/* Logo */}
            <Link to="/" className="logo">
                <img
                    src="./img/logo.png"
                    width={48}
                    height={48}
                    alt="KixsSneaks logo"
                />

                <div className="logoText">
                    <h3>KixsSneaks</h3>
                    <p>Best sneakers ever</p>
                </div>
            </Link>


            {/* Actions */}
            <nav className="headerActions">

                {/* Cart */}
                <button
                    className="headerAction cartAction"
                    onClick={handleCartClick}
                    aria-label="Open shopping cart"
                >
                    <img
                        src="./img/cart.svg"
                        alt=""
                    />

                    <span className="cartTotal">
                        {totalPrice}€
                    </span>
                </button>


                {/* Favorites */}
                <Link
                    to="/favorites"
                    className="headerAction"
                    aria-label="Favorites"
                >
                    <img
                        src="./img/heart.svg"
                        alt=""
                    />
                </Link>


                {/* User */}
                <div
                    className="userWrapper"
                    ref={menuRef}
                >

                    {!userProfile ? (

                        <Link
                            to="/login"
                            className="headerAction"
                            aria-label="Login"
                        >
                            <img
                                src="./img/user.svg"
                                alt=""
                            />
                        </Link>

                    ) : (

                        <>
                            <button
                                className="userMenuButton"
                                onClick={() => setOpenMenu(prev => !prev)}
                                aria-expanded={openMenu}
                            >

                                <span className="avatar">
                                    {userProfile.name
                                        .charAt(0)
                                        .toUpperCase()}
                                </span>

                                <span className="userName">
                                    {userProfile.name}
                                </span>

                                <span
                                    className={`arrow ${openMenu ? "rotate" : ""
                                        }`}
                                >
                                    ▼
                                </span>

                            </button>


                            {openMenu && (

                                <div className="userDropdown">

                                    <Link
                                        to="/orders"
                                        onClick={() => setOpenMenu(false)}
                                    >
                                        My Orders
                                    </Link>

                                    <Link
                                        to="/favorites"
                                        onClick={() => setOpenMenu(false)}
                                    >
                                        Favorites
                                    </Link>

                                    <button onClick={handleLogout}>
                                        Logout
                                    </button>

                                </div>

                            )}

                        </>

                    )}

                </div>

            </nav>

        </header>
    );
}

export default Header;