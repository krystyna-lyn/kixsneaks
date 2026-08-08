import Card from "../../Card";
import styles from "./Home.module.scss";
import { useState } from "react";

function Home({
    items,
    addToCart,
    onAddToFavorite,
    isLoading
}) {

    const [searchValue, setSearchValue] = useState("");

    const filteredItems = items.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <main className={styles.home}>

            <section className={styles.hero}>

                <div className={styles.heroContent}>

                    <span className={styles.eyebrow}>
                        NEW SEASON
                    </span>

                    <h1>
                        STEP INTO
                        <span>YOUR STYLE.</span>
                    </h1>

                    <p className={styles.heroDescription}>
                        Discover sneakers made for everyday
                        movement.
                    </p>

                    <button
                        className={styles.heroButton}
                        onClick={() =>
                            document
                                .getElementById("collection")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }
                    >
                        <p>SHOP COLLECTION</p>
                        <span>→</span>
                    </button>

                </div>

                <div className={styles.heroVisual}>

                    <div className={styles.heroGlow}></div>

                    <img
                        src="/img/hero-sneaker.png"
                        alt="Featured sneaker"
                    />

                </div>

                <div className={styles.heroBottom}>
                    <span>
                        01 <i>/</i> 04
                    </span>

                    <div className={styles.progress}>
                        <div></div>
                    </div>

                    <span className={styles.scrollText}>
                        SCROLL TO EXPLORE ↓
                    </span>
                </div>

            </section>

            <section
                className={styles.collection}
                id="collection"
            >

                <div className={styles.sectionHeader}>

                    <div>
                        <span>EXPLORE</span>
                        <h2>NEW ARRIVALS</h2>
                    </div>

                    <button>
                        VIEW ALL →
                    </button>

                </div>

                <div className={styles.searchWrapper}>
                    <input
                        type="text"
                        placeholder="Search sneakers..."
                        value={searchValue}
                        onChange={(e) =>
                            setSearchValue(e.target.value)
                        }
                    />
                </div>

                <div className={styles.sneakers}>

                    {(isLoading ? [...Array(8)] : filteredItems).map(
                        (item, index) => (

                            <Card
                                key={isLoading ? index : item.id}
                                {...item}
                                addFavorite={onAddToFavorite}
                                onPlus={addToCart}
                                loading={isLoading}
                            />

                        )
                    )}

                </div>

            </section>

        </main>
    );
}

export default Home;