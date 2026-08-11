import styles from "./Info.module.scss";

function Info({ onClose, title, image, description }) {
    return (
        <div className={styles.info}>
            <div className={styles.imageWrapper}>
                <img src={image} alt="" />
            </div>
            <h2>{title}</h2>
            <p>{description}</p>
            <button className={styles.backButton} onClick={onClose}>
                <img src="/img/arrow.svg" alt="" />
                Go back
            </button>
        </div>
    );
}
export default Info;