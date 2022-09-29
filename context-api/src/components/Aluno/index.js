// Sem Context API

/* import Nome from "../Nome";

function Aluno({ nome, mudaNome }) {
    return (
      <div className="App">
        <Nome nome={nome} mudaNome={mudaNome} />
      </div>
    );
  }
  
  export default Aluno;
   */

// Com ContextAPI

import { useContext } from "react";
import { UserContext } from "../../contexts/user";
import Nome from "../Nome";

function Aluno() {
  const { qtdAlunos } = useContext(UserContext);

  return (
    <div>
      a escola tem {qtdAlunos} alunos
      <Nome />
    </div>
  );
}

export default Aluno;
