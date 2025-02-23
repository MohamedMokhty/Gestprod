import {useEffect, useContext} from "react"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const Logout = () => {
    const { setIsAuthenticated } = useContext(AuthContext);
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    
    useEffect(() => {       
        (async () => {         
            try {
                const {} = await  
                    axios.post('http://localhost:8000/logout/',{
                        refresh_token:localStorage.getItem('refresh_token')
                    } ,
                    {headers: {'Content-Type': 'application/json'}},  
                    {withCredentials: true});

                localStorage.clear();
                setUser('');  // Définir l'utilisateur dans le contexte
                setIsAuthenticated(false); // Passer le statut d'authentification à AuthContext
                navigate('/');  // Rediriger vers la page d'accueil
                    
                //axios.defaults.headers.common['Authorization'] = null;
                //window.location.href = '/'
            } catch (e) {
                console.log('logout not working', e)
            }
        })();
    }, []);
    return (
        <div></div>
    )
}

export default Logout