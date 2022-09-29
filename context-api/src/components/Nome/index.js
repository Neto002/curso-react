// Sem Context API

/* function Nome({ nome, mudaNome }) {
  return (
    <div className="App">
      <h1>oi {nome}</h1>
      <button onClick={() => mudaNome('antonio')} >Muda nome</button>
    </div>
  );
}

export default Nome;
 */

// Com Context API

import { useContext } from "react";
import { UserContext } from "../../contexts/user";

function Nome() {

  const {aluno, setAluno} = useContext(UserContext)

  return (
    <div>
      <h1>oi {aluno} </h1>
      <button onClick={() => setAluno("Antonio")}>Troca Nome</button>
    </div>
  );
}

export default Nome;