





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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
        
          <p style={{ marginRight:"900px",fontWeight: "500", color:"yellow" }}>
            Hi, Welcome back <b>{userName}</b> 
          </p>


          <img
            src={user?.photoURL ||userImg}
            alt="user"
            referrerPolicy="no-referrer"
            style={{
              borderRadius: "50%",
              height: "1.8rem",
              width: "1.8rem",
              objectFit: "cover",
            }}
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
