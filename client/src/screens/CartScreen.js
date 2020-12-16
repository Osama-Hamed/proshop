import queryString from 'query-string';
import { useEffect } from 'react';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import * as cartActions from '../state/cart/actions';

const CartScreen = ({ match, location }) => {
  const productId = match.params.id;
  const { search } = location;
  const qty = search ? Number(queryString.parse(search).qty) : 1;

  const dsipatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    if (productId) dsipatch(cartActions.fetchProductDetails(productId, qty));
  }, [dsipatch, productId, qty]);

  const removeFromCart = productId => {};

  const onCheckout = () => {};

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant='info'>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product._id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product._id}`}>
                      {item.product.name}
                    </Link>
                  </Col>
                  <Col md={2}>${item.product.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={e =>
                        dsipatch(
                          cartActions.fetchProductDetails(
                            item.product._id,
                            Number(e.target.value),
                          ),
                        )
                      }
                    >
                      {[...Array(item.product.countInStock).keys()].map(n => (
                        <option key={n + 1} value={n + 1}>
                          {n + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCart(item.product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.product.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={onCheckout}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
