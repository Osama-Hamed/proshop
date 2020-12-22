import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import * as userRegistrationActions from '../state/userRegistration/actions';
import routes from '../shared/routes';

const RegistrationScreen = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector(state => state.userRegistration);
  useEffect(() => {
    if (user) history.push(routes.homeScreen.path());
  }, [user, history]);
  useEffect(() => {
    if (error) {
      const nErr = error.find(err => err.field === 'name');
      const eErr = error.find(err => err.field === 'email');
      const pErr = error.find(err => err.field === 'password');
      nErr ? setNameError(nErr.message) : setNameError('');
      eErr ? setEmailError(eErr.message) : setEmailError('');
      pErr ? setPasswordError(pErr.message) : setPasswordError('');
    }
  }, [error]);
  const register = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      dispatch(userRegistrationActions.register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {loading && <Loader />}
      <Form onSubmit={register}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Name'
            value={name}
            onChange={e => setName(e.target.value)}
            isInvalid={!!nameError}
          />
          {nameError && (
            <Form.Control.Feedback type='invalid'>
              {nameError}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email Address'
            value={email}
            onChange={e => setEmail(e.target.value)}
            isInvalid={!!emailError}
          />
          {emailError && (
            <Form.Control.Feedback type='invalid'>
              {emailError}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            isInvalid={!!passwordError}
          />
          {passwordError && (
            <Form.Control.Feedback type='invalid'>
              {passwordError}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password Confirmation'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Sign Up
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Have an Account? <Link to={routes.loginScreen.path()}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegistrationScreen;
