import { Row, Col, Container } from 'react-bootstrap';

const FormContainer = ({ children }) => (
  <Container>
    <Row className='justify-content-center'>
      <Col xs={12} md={6}>
        {children}
      </Col>
    </Row>
  </Container>
);

export default FormContainer;
