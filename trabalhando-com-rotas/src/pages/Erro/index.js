import { Link } from "react-router-dom";

export default function Erro() {
  return (
    <div>
      <h2>404 - Not Found</h2>

      <span>Páginas Disponíveis:</span>
      <br />

      <Link to="/">Home</Link>
      <br />
      <Link to="/sobre">Sobre</Link>
      <br />
      <Link to="/contato">Contato</Link>
      <br />
    </div>
  );
}
