function Card() {
    return (
        <div className="card">
            <div className='favorite'>
                <img src="./img/unliked.svg" alt="heart" />
            </div>
            <img width={133} height={112} src="./img/sneakers/1.jpg" alt="item" />
            <h5>Man sneakers Nike Blazer Mid Suede</h5>
            <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                    <span>price:</span>
                    <b>70,99 €</b>
                </div>
                <button className='button'>
                    <img width={11} height={11} src="./img/plus.svg" alt="plus" />
                </button>
            </div>
        </div>
    )
}

export default Card;