import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import * as userProfileActions from '../state/userProfile/actions';
import * as userProfileUpdateActions from '../state/userProfileUpdate/actions';
import routes from '../shared/routes';
import Message from '../components/Message';

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const { authUser } = useSelector(state => state.userLogin);
  const {
    user: userProfile,
    error: userProfileError,
    loading: userProfileLoading,
  } = useSelector(state => state.userProfile);
  const {
    error: updateError,
    success: updateSuccess,
    loading: updateLoading,
  } = useSelector(state => state.userProfileUpdate);
  useEffect(() => {
    if (!authUser) {
      history.push(routes.loginScreen.path());
    } else {
      if (!userProfile) {
        dispatch(userProfileActions.fetchUserProfile());
      } else {
        setName(userProfile.name);
        setEmail(userProfile.email);
      }
    }
  }, [authUser, userProfile, history, dispatch]);

  useEffect(() => {
    if (updateError) {
      const nErr = updateError.find(err => err.field === 'name');
      const eErr = updateError.find(err => err.field === 'email');
      const pErr = updateError.find(err => err.field === 'password');
      nErr ? setNameError(nErr.message) : setNameError('');
      eErr ? setEmailError(eErr.message) : setEmailError('');
      pErr ? setPasswordError(pErr.message) : setPasswordError('');
    }
  }, [updateError]);
  const updateProfile = e => {
    e.preventDefault();
    setNameError('');
    setEmailError('');
    setPasswordError('');
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      dispatch(
        userProfileUpdateActions.updateUserProfile(name, email, password),
      );
    }
  };

  return (
    <Row>
      {userProfileLoading && <Loader />}
      {updateLoading && <Loader />}
      {userProfileError ? (
        <Message variant='danger'>{userProfileError}</Message>
      ) : (
        <>
          <Col md={3}>
            <h2>User Profile</h2>
            {updateSuccess && (
              <Message variant='success'>Profile Updated</Message>
            )}
            <Form onSubmit={updateProfile}>
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
                Update
              </Button>
            </Form>
          </Col>
          <Col md={9}>
            <h2>My Orders</h2>
          </Col>
        </>
      )}
    </Row>
  );
};

export default ProfileScreen;
