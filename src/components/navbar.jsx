import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        TaskTrackr
      </div>
      <div className="navbar-right">
        <button className="navbar-link" onClick={handleProfile}>Profile</button>
        <button className="navbar-link" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
