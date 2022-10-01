import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import "./header.css";
import avatar from "../../assets/avatar.png";
import { Link } from "react-router-dom";
import { FiHome, FiUser, FiSettings } from "react-icons/fi";

export default function Header() {
  const { user } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div>
        <img
          src={user.avatarURL === null ? avatar : user.avatarURL}
          alt="avatar usuário"
        />
      </div>

      <Link to="/dashboard">
        <FiHome color="white" sizer={24} />
        Chamados
      </Link>
      <Link to="/customers">
        <FiUser color="white" sizer={24} />
        Clientes
      </Link>
      <Link to="/profile">
        <FiSettings color="white" sizer={24} />
        Configurações
      </Link>
    </div>
  );
}
