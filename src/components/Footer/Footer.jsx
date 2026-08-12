import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerMain}>
                <div className={styles.brand}>
                    <Link to="/" className={styles.logo}>

                        <span className={styles.logoMark}>
                            <img src="/img/logo.svg" alt="logo" />
                        </span>
                        <span className={styles.logoText}>
                            KixsSneaks
                        </span>
                    </Link>
                    <p>
                        Best sneakers for everyday style.
                    </p>
                </div>
                <div className={styles.links}>
                    <span className={styles.label}>EXPLORE</span>
                    <Link to="/">All sneakers</Link>
                    <Link to="/favorites">Favorites</Link>
                </div>
                <div className={styles.contact}>
                    <span className={styles.label}>KIXSSNEAKS</span>
                    <p>Step into your style.</p>
                    <span className={styles.accent}>EST. 2026</span>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <span>© 2026 KixsSneaks</span>
                <span>Designed for sneaker lovers</span>
            </div>
        </footer>
    );
}

export default Footer;