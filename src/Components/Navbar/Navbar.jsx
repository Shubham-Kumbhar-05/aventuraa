import { useState, useEffect } from 'react';
import './navbar.scss';
import { IoIosCloseCircle } from 'react-icons/io';
import { TbGridDots } from 'react-icons/tb';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [active, setActive] = useState('navBar');
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  // Load user and role from localStorage
  useEffect(() => {
    const loadUser = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const googleUser = JSON.parse(localStorage.getItem('googleUser'));
      const storedRole = localStorage.getItem('role')?.toLowerCase().trim() || 'user';

      if (googleUser) {
        setUser({ ...googleUser, isGoogle: true });
      } else if (storedUser) {
        setUser({ ...storedUser, isGoogle: false });
      } else {
        setUser(null);
      }

      setRole(storedRole);
    };

    loadUser();

    // Update user automatically on storage change (in case of sign out from another tab)
    window.addEventListener('storage', loadUser);
    return () => window.removeEventListener('storage', loadUser);
  }, []);

  const showNav = () => setActive('navBar activeNavbar');
  const removeNavbar = () => setActive('navBar');

  const handleUsernameClick = () => {
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/account');
    }
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
                <span
                  className="username"
                  onClick={handleUsernameClick}
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  title={role === 'admin' ? 'Go to Admin Dashboard' : 'Go to Your Account'}
                >
                  👤{' '}
                  {user.displayName || user.fullName || user.Username || user.username || 'User'}
                </span>
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
