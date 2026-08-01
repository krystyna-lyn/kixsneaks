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

    return (
        <header className="d-flex justify-between align-center p-40">
            <div className='d-flex align-center'>
                <img width={40} height={40} src="./img/logo.png" alt="logo" />


                <Link to='/'>
                    <div>
                        <h3 className='text-uppercase'>KixsSneaks</h3>
                        <p className='opacity-5'>Best sneakers ever</p>
                    </div>
                </Link>
            </div>

            <ul className="headerMenu">

                <li
                    className="cu-p"
                    onClick={() => {

                        setOpenMenu(false);
                        if (!user) {
                            navigate("/login");
                            return;
                        }
                        props.openCart();
                    }}
                >
                    <img src="./img/cart.svg" alt="cart" />
                    <span className="cartTotal">{totalPrice}€</span>
                </li>
                <Link to='/favorites'>
                    <li className='cu-p'>
                        <img src="./img/heart.svg" alt="favorites" />
                    </li>
                </Link>

                <li style={{ position: "relative" }}
                    ref={menuRef}>

                    {!userProfile ? (

                        <Link to="/login">
                            <img src="./img/user.svg" alt="user" />
                        </Link>

                    ) : ( // User is logged in

                        <>

                            <div
                                className="userMenuButton"
                                onClick={() => setOpenMenu(!openMenu)}
                            >
                                <div className="avatar">
                                    {userProfile.name.charAt(0).toUpperCase()}
                                </div>


                                <span className="userName">
                                    {userProfile.name}
                                </span>

                                <span
                                    className={`arrow ${openMenu ? "rotate" : ""}`}
                                >
                                    ▼
                                </span>
                            </div>

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

                                    <button onClick={handleLogout}>Logout</button>


                                </div>

                            )}

                        </>

                    )}

                </li>

            </ul>
        </header>
    )
}

export default Header;