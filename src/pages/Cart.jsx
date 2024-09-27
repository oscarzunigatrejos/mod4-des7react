import React, { useState, useContext } from 'react'
import { cartaPizza } from "../pizzas.js";
import { Button, Container, ListGroup, Badge, Image } from 'react-bootstrap'
import { formatNumber } from '../scripts.js';
import { CartContext } from '../context/CartContext.jsx';
import { UserContext } from '../context/UserContext.jsx';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, addToCart, removeFromCart, count } = useContext(CartContext);
    const { token } = useContext(UserContext);
    return (
        <>


            <Container>
                <h4>Total del carrito: </h4>
                <ListGroup>
                    {cart.map((element) => (
                        <ListGroup.Item key={element.id} className='p-2'>
                            <Image
                                src={element.image}
                                style={{ width: '10%' }}
                                rounded />

                            <strong> {element.name} : </strong>{formatNumber(element.price)}

                            <Button variant='outline-secondary' onClick={() => removeFromCart(element)}>-</Button>
                            {element.cantidad}
                            <Button variant='outline-secondary' onClick={() => addToCart(element)}>+</Button>


                        </ListGroup.Item>

                    ))}
                </ListGroup>
                {count === 0 ? <p>El carrito esta vacio</p> : <div>

                    <p>TOTAL: {formatNumber(count)}</p>
                    {token ?
                        <Button variant='success'>Ir a pagar</Button> :
                        <Nav.Link as={Link} to="/login"> <Button variant='danger'>Inicia sesion para pagar</Button></Nav.Link>}
                </div>}


            </Container>

        </>
    )
}

export default Cart