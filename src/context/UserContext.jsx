import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [token, setToken] = useState(true);
    const navigate = useNavigate();


    const logout = () => {
        setToken(false);
        withReactContent(Swal).fire({
            icon: 'info',
            title: 'Sesión finalizada',
            html: `Serás redirigido a la pagina de inicio.`,
        }).then(() => {
            navigate('/');

        });
    };

    return (
        <UserContext.Provider value={{ token, logout, setToken }}>
            {children}
        </UserContext.Provider >

    )
}

export default UserProvider;