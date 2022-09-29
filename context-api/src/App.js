// Sem Context API

/* import { useState } from "react";
import Aluno from "./components/Aluno";

function App() {
  const [nome, setNome] = useState('neto')
  return (
    <div className="App">
      <h1>Context API</h1>
      <Aluno nome={nome} mudaNome={setNome} />
    </div>
  );
}

export default App;
 */

// Com Context API

import Aluno from "./components/Aluno";
import UserProvider from "./contexts/user";

function App() {
  return(
    <UserProvider>
      <div>
        <h1>ESCOLA</h1>
        <hr/>
        <Aluno />
      </div>
    </UserProvider>
  )
}

export default App;