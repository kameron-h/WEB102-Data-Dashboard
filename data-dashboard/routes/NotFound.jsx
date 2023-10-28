import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <>
        <div>
            <p>Oops! That page doesn't exist. Make sure to check the URL for any errors.</p>
            <Link to="/">
                Back to Home
            </Link>
        </div>
        </>
    );
}

export default NotFound;