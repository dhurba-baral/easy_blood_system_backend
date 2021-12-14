import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-md">
          <Link className="navbar-brand" to="/">Covid Help Nepal</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse text-right" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-2">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/offer-help">Offer Help</Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/get-help">Get Help</Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    )
}

export default Navbar