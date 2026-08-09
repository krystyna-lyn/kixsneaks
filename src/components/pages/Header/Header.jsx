import styles from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useCart } from "../../../hooks/useCart";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";

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
        <header className={styles.header}>

            {/* Logo */}

            <Link to="/" className={styles.logo}>

                <img
                    src="./img/logo.svg"
                    width={44}
                    height={44}
                    alt="KixsSneaks logo"
                />

                <div className={styles.logoText}>
                    <h3>KixsSneaks</h3>
                    <p>Best sneakers ever</p>
                </div>

            </Link>


            {/* Actions */}

            <nav className={styles.actions}>

                {/* Cart */}

                <button
                    className={`${styles.actionButton} ${styles.cartButton}`}
                    onClick={handleCartClick}
                    aria-label="Open shopping cart"
                >
                    <img
                        src="./img/cart.svg"
                        alt=""
                    />

                    <span>
                        {totalPrice}€
                    </span>
                </button>


                {/* Favorites */}

                <Link
                    to="/favorites"
                    className={styles.actionButton}
                    aria-label="Favorites"
                >
                    <img
                        src="./img/heart.svg"
                        alt=""
                    />
                </Link>


                {/* User */}

                <div
                    className={styles.userWrapper}
                    ref={menuRef}
                >

                    {!userProfile ? (

                        <Link
                            to="/login"
                            className={styles.actionButton}
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
                                className={styles.userButton}
                                onClick={() => setOpenMenu(prev => !prev)}
                                aria-expanded={openMenu}
                            >

                                <span className={styles.avatar}>
                                    {userProfile.name
                                        .charAt(0)
                                        .toUpperCase()}
                                </span>

                                <span className={styles.userName}>
                                    {userProfile.name}
                                </span>

                                <span
                                    className={`${styles.arrow} ${openMenu ? styles.rotate : ""
                                        }`}
                                >
                                    ▼
                                </span>

                            </button>


                            {openMenu && (

                                <div className={styles.dropdown}>

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