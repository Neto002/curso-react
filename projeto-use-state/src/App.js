// Usando useState, useEffect, useMemo

import React, { useState, useEffect, useMemo } from "react";
import "./App.css";

function App() {
  const [tarefas, setTarefas] = useState([]);

  const [inputTarefa, setInputTarefa] = useState("");

  // Quando componente terminar de ser montado
  useEffect(() => {
    const tarefasStorage = localStorage.getItem('tarefas');

    if (tarefasStorage) {
      setTarefas(JSON.parse(tarefasStorage))
    }

  }, []);


  // Quando componente sofrer atualização
  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
  }, [tarefas]);

  function handleAdd() {
    setTarefas([...tarefas, inputTarefa]);
    setInputTarefa("");
  }

  const totalTarefas = useMemo(()=> tarefas.length, [tarefas]);

  return (
    <div>
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa} > {tarefa} </li>
        ))}
      </ul>

      <strong>Você tem {totalTarefas} tarefas</strong><br/>

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
