import {Link} from 'react-router-dom';
import Footer from './Footer';
import Navbar from "./Navbar";

const ErrorPage = () => {
    return (
        <>
            <Navbar/>
            <h2 className="my-5 text-center">Opps! Something wrong happened!</h2>
            <p className="text-center">Go back to <Link to="/">Home</Link></p>
            <Footer/>
        </>
    )
}

export default ErrorPage;