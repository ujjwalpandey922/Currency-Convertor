// Importing the styles for the navbar
import "./navbar.css";

// Functional component for the Navbar
const Navbar = () => {
  return (
    // Container for the entire navbar
    <div className="nav-container">
      {/* Container for the navigation icons */}
      <div className="nav-icons">
        {/* Logo image */}
        <img
          src={
            "https://dzap.io/static/media/Logo.247f945b94ed1dd9e10731b3be93130b.svg"
          }
          alt="activity"
        />
      </div>

      {/* Container for navigation links */}
      <div className="nav-links ">
        {/* Trade link */}
        <li>
          {" "}
          <span className="active"> Trade</span>{" "}
        </li>

        {/* Earn link */}
        <li>Earn</li>

        {/* Support link */}
        <li>Support</li>

        {/* About link */}
        <li>About</li>
      </div>

      {/* Button to connect the wallet */}
      <button className="connect-wallet">Connect Wallet</button>
    </div>
  );
};

// Exporting the Navbar component as the default export
export default Navbar;
