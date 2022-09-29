import { createContext, useState } from "react";


export const UserContext = createContext({})

export default function UserProvider({children}) {
    const [aluno, setAluno] = useState('Neto')
    const [qtdAlunos, setQtdAlunos] = useState(85)

    return(
        <UserContext.Provider value={{aluno, setAluno, qtdAlunos}}>
            {children}
        </UserContext.Provider>
    )
}