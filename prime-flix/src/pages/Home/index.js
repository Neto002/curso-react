import { useEffect, useState } from "react"
import api from "../../services/api";

export default function Home() {

    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: '8722a889e8aa183266cfc4a9386ffa0e',
                    language: 'pt-BR',
                    page: 1
                }
            });
            console.log(response.data.results);
        }

        loadFilmes();
    }, [])

    return(
        <div>
            <h1>Home</h1>
        </div>
    )
}