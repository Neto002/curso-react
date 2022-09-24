import React, { useState } from "react";
import "./App.css";

function App() {
  const [tarefas, setTarefas] = useState(["tarefa1", "tarefa2"]);

  const [inputTarefa, setInputTarefa] = useState("");

  function handleAdd() {
    setTarefas([...tarefas, inputTarefa]);
    setInputTarefa("");
  }

  return (
    <div>
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa} > {tarefa} </li>
        ))}
      </ul>

      <label>Nova tarefa: </label>
      <input
        type="text"
        value={inputTarefa}
        onChange={(e) => setInputTarefa(e.target.value)}
      />
      <br />

      <button type="button" onClick={handleAdd}>
        Adicionar Tarefa
      </button>
    </div>
  );
}

export default App;
