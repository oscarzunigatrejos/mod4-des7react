import React, { useState, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import imgRegister from '../assets/images/login.png';
import Figure from 'react-bootstrap/Figure';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { token, setToken } = useContext(UserContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const data = await response.json();
        data?.error ? alerMensaje('error', data?.error) : alerMensaje('success', 'Logeado correctamente');
        localStorage.setItem("token", data.token);
        console.log(data.token);
        setToken(true);
        if (data.token) {
            navigate('/profile');
        }

    };

    const alerMensaje = (icon, msg) => {

        withReactContent(Swal).fire({
            icon: icon,
            title: msg,
        })

    }


    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (value.length < 6) {
            setPasswordError('El password debe tener al menos 6 caracteres');
        } else {
            setPasswordError('');
        }
    }

    return (


        <Container>
            <Figure className="my-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Figure.Image
                    width={671}
                    height={180}
                    alt="Registro de usuario"
                    src={imgRegister}

                />
            </Figure>
            <motion.div initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }} className="formulario">
                <h4 className='text-center'>Inicia tu sesión de Mamma Mía</h4>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmailLogin" className='mt-4'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name='emailLogin' onChange={(e) => setEmail(e.target.value)} placeholder="Ingresa tu email" />
                    </Form.Group>

                    <Form.Group controlId="formPasswordLogin" className='mt-4'>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" name='passwordLogin' onChange={handlePasswordChange} placeholder="Ingresa contraseña" />
                        {passwordError && <Form.Text className="text-danger">{passwordError}</Form.Text>}

                    </Form.Group>

                    <Container className="mt-4 d-flex flex-column d-flex justify-content-center ">
                        <Button className="mt-4 log" variant="primary" type="submit">
                            Acceder
                        </Button>
                        <p className='text-center mt-2'>¿No tienes una cuenta? <Link to="/register">Regístrate</Link></p>
                    </Container>
                </Form>
            </motion.div >
        </Container>


    );
};

export default Login;
