import { useState, useEffect } from 'react';
import './navbar.scss';
import { IoIosCloseCircle } from 'react-icons/io';
import { TbGridDots } from 'react-icons/tb';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [active, setActive] = useState('navBar');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const showNav = () => {
    setActive('navBar activeNavbar');
  };

  const removeNavbar = () => {
    setActive('navBar');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/auth');
  };

  return (
    <section className="navBarSection">
      <header className="header flex">
        <div className="logoDiv">
          <Link to="/" className="logo flex">
            <h1>Aventuraa</h1>
          </Link>
        </div>

        <div className={active}>
          <ul className="navLists flex">
            <li className="navItem">
              <NavLink to="/" end className="navLink">Home</NavLink>
            </li>
            <li className="navItem">
              <NavLink to="/treks" end className="navLink">Packages</NavLink>
            </li>
            <li className="navItem">
              <NavLink to="/community" end className="navLink">About</NavLink>
            </li>
            <li className="navItem">
              <NavLink to="/challenges" end className="navLink">Contact</NavLink>
            </li>

            {!user ? (
              <button className="btn">
                <NavLink to="/auth" end className="navLink">Login/SignUp</NavLink>
              </button>
            ) : (
              <li className="navItem userTab">
                <span className="username">👤 {user?.Username || user?.username}</span>
                <button className="btn logoutBtn" onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>

          <div onClick={removeNavbar} className="closeNavbar">
            <IoIosCloseCircle className="icon" />
          </div>
        </div>

        <div onClick={showNav} className="toggleNavbar">
          <TbGridDots className="icon" />
        </div>
      </header>
    </section>
  );
};

export default Navbar;