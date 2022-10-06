import { useState } from "react"
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi"
import { Link } from "react-router-dom"
import Header from "../../components/Header"
import Title from '../../components/Title'
import './dashboard.css'

export default function Dashboard() {

    const [chamados, setChamados] = useState([]);

    return(
        <div>
            <Header/>
            <div className="content">
                <Title name="Atendimentos" >
                    <FiMessageSquare size={25} />
                </Title>

                {chamados.length === 0 ? (

                    <div className="container dashboard">
                    <span>Nenhum chamado registrado...</span>

                    <Link to="/new" className="new">
                        <FiPlus size={25} color="white"/>
                        Novo chamado
                    </Link>
                    </div>
                ) : (
                    <>
                        <Link to="/new" className="new">
                            <FiPlus size={25} color="white" />
                            Novo Chamado
                        </Link>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Assunto</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Cadastrado em</th>
                                    <th scope="col">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td data-label="Cliente">Sujeito</td>
                                    <td data-label="Assunto">Suporte</td>
                                    <td data-label="Status">
                                        <span className="badge" style={{backgroundColor: '#5cb85c'}}>Em aberto</span>
                                    </td>
                                    <td data-label="Cadastrado">20/06/2021</td>
                                    <td data-label="#">
                                        <button className="action" style={{backgroundColor: '#3583f6'}}>
                                            <FiSearch color="white" size={17} />
                                        </button>

                                        <button className="action" style={{backgroundColor: '#f6a935'}}>
                                            <FiEdit2 color="white" size={17} />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                )}

            </div>
        </div>
    )
}