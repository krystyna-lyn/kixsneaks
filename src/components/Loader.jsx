import ContentLoader from "react-content-loader";

function Loader() {
    return (
        <ContentLoader
            speed={2}
            width="100%"
            height={300}
            viewBox="0 0 300 300"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            {/* Image */}
            <rect
                x="0"
                y="0"
                rx="10"
                ry="10"
                width="300"
                height="175"
            />

            {/* Title */}
            <rect
                x="0"
                y="195"
                rx="5"
                ry="5"
                width="210"
                height="14"
            />

            <rect
                x="0"
                y="220"
                rx="5"
                ry="5"
                width="150"
                height="14"
            />

            {/* Price */}
            <rect
                x="0"
                y="255"
                rx="5"
                ry="5"
                width="75"
                height="16"
            />

            {/* Button */}
            <rect
                x="264"
                y="248"
                rx="9"
                ry="9"
                width="36"
                height="36"
            />
        </ContentLoader>
    );
}

export default Loader;