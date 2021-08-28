import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';

function SigninScreen(props) {

    //For Loading
    const [loading, setLoading] = useState(false);

    //For Error
    const [error, setError] = useState(false);

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';
    

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;


    //For Email
    const [userEmail, setEmail] = useState('');

    //For Password
    const [userPassword, setPassword] = useState('');

    const dispatch = useDispatch();

    //For Form Submission
    const submitHandler = (e) => {
        e.preventDefault();
       //Sign In action
        dispatch(signin(userEmail, userPassword));
    };

    

    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    return (
        <div>
            <Container>
                <Row>
                    <Form onSubmit={submitHandler}>

                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email"
                                placeholder="Enter email"
                                id="userEmail"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                placeholder="Enter password"
                                id="userPassword"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group> */}
                        <Button variant="primary" type="submit">
                            Sign In
                        </Button>
                    </Form>
                </Row>
            </Container>
        </div>
    );
}

export default SigninScreen;