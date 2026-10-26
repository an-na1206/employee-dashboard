
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        Employee Dashboard
      </Link>

      <div className="navbar-nav ms-auto">
        <Link className="nav-link" to="/">
          Home
        </Link>

        <Link className="nav-link" to="/employee-form">
          Employee Form
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
