import styles from '../Card/Card.module.scss';

function Card(props) {
    const onClickButton = () => {
        alert(props.id);
    }

    return (
        <div className={styles.card}>
            <div className={styles.favorite}>
                <img src="./img/unliked.svg" alt="heart" />
            </div>
            <img width={133} height={112} src={props.imgUrl} alt="item" />
            <h5>{props.title}</h5>
            <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                    <span>price:</span>
                    <b>{props.price} €</b>
                </div>
                <button className={styles.button} onClick={onClickButton}>
                    <img width={11} height={11} src="./img/plus.svg" alt="plus" />
                </button>
            </div>
        </div>
    )
}

export default Card;