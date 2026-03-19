
import React from "react";
import "./styles.css";
import { auth } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import userImg from "../../assets/house.png";

function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const logoutFnc = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  
  const userName =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "User";

  return (
  <div className="navbar">
  <p className="logo">Financely.</p>

  {user && !loading && (
    <div className="nav-right">
      <p className="welcome-text">
        Hi, Welcome back <b>{userName}</b>
      </p>

      <img
        src={user?.photoURL || userImg}
        alt="user"
        className="user-img"
      />

      <p className="logo link" onClick={logoutFnc}>
        Logout
      </p>
    </div>
  )}
</div>

  
  );
}

export default Header;
