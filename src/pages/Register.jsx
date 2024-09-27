import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import imgRegister from '../assets/images/register.png';
import Figure from 'react-bootstrap/Figure';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [PasswordConfirmationError, setPasswordConfirmationError] = useState('');

    const showOk = () => {
        withReactContent(Swal).fire({
            icon: 'success',
            title: 'Registro existoso',
            html: `El usuario ${email} ha sido registrado correctamente. En un futuro serás redirigido a la página de tu perfíl.`,
        })
    }
    const showSwal = () => {
        withReactContent(Swal).fire({
            icon: 'error',
            title: 'Oops...',
            html: `Faltan campos por completar.`,
        })
    }

    const showPassword = () => {
        withReactContent(Swal).fire({
            icon: 'error',
            title: 'Oops...',
            html: `Al parecer el password no cumple los requisitos.`,
        })
    }

    const validarFormulario = (e) => {
        e.preventDefault();
        console.log(email, password, confirmPassword);
        if (email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
            showSwal()
            return
        }
        if (password.length < 6 || password !== confirmPassword) {
            showPassword()
            return
        }
        else {
            showOk()
            setEmail('')
            setPassword('');
            setConfirmPassword('');
            e.target.reset();
            return
        }
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (value.length < 6) {
            setPasswordError('El password debe tener al menos 6 caracteres');
        } else {
            setPasswordError('');
        }

        if (confirmPassword && value !== confirmPassword) {
            setPasswordConfirmationError('El password y la confirmación del password deben ser iguales');
        } else {
            setPasswordConfirmationError('');
        }
    }

    const handlePasswordConfirmation = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);

        if (password !== value) {
            setPasswordConfirmationError('El password y la confirmación del password deben ser iguales');
        } else {
            setPasswordConfirmationError('');
        }
    }


    return (


        <Container >
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
                <h4 className='text-center'>Registrate y sé parte de Mamma Mía</h4>
                <Form onSubmit={validarFormulario}>
                    <Form.Group controlId="formEmail" className='mt-4'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name='email' onChange={(e) => setEmail(e.target.value)} placeholder="Ingresa tu email" />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className='mt-4'>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" name='password' onChange={handlePasswordChange} placeholder="Ingresa contraseña" />
                        {passwordError && <Form.Text className="text-danger">{passwordError}</Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="formConfirmPassword" className='mt-4'>
                        <Form.Label>Confirmar Contraseña</Form.Label>
                        <Form.Control type="password" name='passwordConfirm' onChange={handlePasswordConfirmation} placeholder="Repite tu contraseña" />
                        {PasswordConfirmationError && <Form.Text className="text-danger">{PasswordConfirmationError}</Form.Text>}
                    </Form.Group>
                    <Container className="mt-4 d-flex flex-column d-flex justify-content-center ">
                        <Button className="mt-4 log" variant="primary" type="submit">
                            Registrarse
                        </Button>
                        <p className='text-center mt-2'>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
                    </Container>
                </Form>
            </motion.div >
        </Container>


    );
};

export default Register;
