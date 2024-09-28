import ContentLoader from "react-content-loader";

function Loader() {
    return (
        <ContentLoader
            speed={2}
            width={210}
            height={291}
            viewBox="0 0 210 291"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
            <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
            <rect x="0" y="0" rx="10" ry="10" width="150" height="150" />
            <rect x="0" y="169" rx="5" ry="5" width="150" height="15" />
            <rect x="0" y="199" rx="5" ry="5" width="100" height="15" />
            <rect x="0" y="232" rx="5" ry="5" width="100" height="25" />
            <rect x="124" y="225" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
    )
}

export default Loader