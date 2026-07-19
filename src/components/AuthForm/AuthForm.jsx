import styles from './AuthForm.module.scss';

const AuthForm = ({ title, buttonText, onSubmit, children }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <h1 className={styles.title}>
                    {title}
                </h1>
                <form
                    onSubmit={onSubmit}
                    className={styles.form}
                >{children}
                    <button
                        className={styles.button}
                        type="submit"
                    >
                        {buttonText}
                    </button>
                </form>
            </div>

        </div>
    )
}

export default AuthForm