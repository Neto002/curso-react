import { useParams } from "react-router-dom";

export default function Produto() {
  const { id } = useParams();

  return (
    <div>
      <h2>Produto</h2>
      <p>Detalhes do produto { id }</p>
    </div>
  );
}
