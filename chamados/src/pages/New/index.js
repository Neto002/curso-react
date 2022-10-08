/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { AuthContext } from "../../contexts/auth";
import firebase from "../../firebase/config";
import { useParams, useHistory } from "react-router-dom";
import "./new.css";

export default function New() {
  const { id } = useParams();
  const history = useHistory();

  const [customers, setCustomers] = useState([]);
  const [loadCustomers, setLoadCustomers] = useState(true);
  const [customerSelected, setCustomerSelected] = useState(0);

  const [assunto, setAssunto] = useState("Suporte");
  const [status, setStatus] = useState("Aberto");
  const [complemento, setComplemento] = useState("");

  const [idCustomer, setIdCustomer] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function loadCustomers() {
      await firebase
        .firestore()
        .collection("customers")
        .get()
        .then((snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nomeFantasia: doc.data().nomeFantasia,
            });
          });

          if (lista.length === 0) {
            console.log("nenhuma empresa encontrada");
            setCustomers([{ id: 1, nomeFantasia: "freela" }]);
            setLoadCustomers(false);
            return;
          }

          setCustomers(lista);
          setLoadCustomers(false);

          if (id) {
            loadId(lista);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoadCustomers(false);
          setCustomers([{ id: 1, nomeFantasia: "" }]);
        });
    }

    loadCustomers();
  }, [id]);

  async function loadId(lista) {
    await firebase
      .firestore()
      .collection("chamados")
      .doc(id)
      .get()
      .then(async (snapshot) => {
        setAssunto(snapshot.data().assunto);
        setStatus(snapshot.data().status);
        setComplemento(snapshot.data().complemento);

        let index = lista.findIndex(
          (item) => item.id === snapshot.data().clienteId
        );
        setCustomerSelected(index);
        setIdCustomer(true);
      })
      .catch((error) => {
        console.log(error);
        setIdCustomer(false);
      });
  }

  async function handleRegister(e) {
    e.preventDefault();

    if (idCustomer) {
      await firebase
        .firestore()
        .collection("chamados")
        .doc(id)
        .update({
          cliente: customers[customerSelected].nomeFantasia,
          clienteId: customers[customerSelected].id,
          assunto: assunto,
          status: status,
          complemento: complemento,
          userId: user.uid,
        })
        .then(() => {
          toast.success("Chamado editado com sucesso!");
          setComplemento("");
          setCustomerSelected(0);
          history.push("/dashboard");
        })
        .catch((error) => {
          toast.error("Erro ao registrar");
          console.log(error);
        });

      return;
    }

    await firebase
      .firestore()
      .collection("chamados")
      .add({
        created: new Date(),
        cliente: customers[customerSelected].nomeFantasia,
        clienteId: customers[customerSelected].id,
        assunto: assunto,
        status: status,
        complemento: complemento,
        userId: user.uid,
      })
      .then(() => {
        toast.success("Chamado registrado com sucesso!");
        setComplemento("");
        setCustomerSelected(0);
        history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao registrar");
      });
  }

  function handleOptionChange(e) {
    setStatus(e.target.value);
  }

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Novo Chamado">
          <FiPlusCircle size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>Cliente</label>

            {loadCustomers ? (
              <input type="text" disabled value="Carregando clientes..." />
            ) : (
              <select
                value={customerSelected}
                onChange={(e) => setCustomerSelected(e.target.value)}
              >
                {customers.map((item, index) => {
                  return (
                    <option key={item.id} value={index}>
                      {item.nomeFantasia}
                    </option>
                  );
                })}
              </select>
            )}

            <label>Assunto</label>
            <select
              value={assunto}
              onChange={(e) => setAssunto(e.target.value)}
            >
              <option value="Suporte">Suporte</option>
              <option value="Visita Técnica">Visita Técnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                name="radio"
                value="Aberto"
                checked={status === "Aberto"}
                onChange={handleOptionChange}
              />
              <span>Em Aberto</span>

              <input
                type="radio"
                name="radio"
                value="Progresso"
                checked={status === "Progresso"}
                onChange={handleOptionChange}
              />
              <span>Progresso</span>

              <input
                type="radio"
                name="radio"
                value="Atendido"
                checked={status === "Atendido"}
                onChange={handleOptionChange}
              />
              <span>Atendido</span>
            </div>

            <label>Complemento</label>
            <textarea
              type="text"
              placeholder="Descreva seu problema (opcional)"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />

            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
