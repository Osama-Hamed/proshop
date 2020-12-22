import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import routes from './shared/routes';

const App = () => (
  <React.Suspense fallback={<span>Loading...</span>}>
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route
              path={routes.homeScreen.path()}
              component={React.lazy(routes.homeScreen.component)}
              exact
            />
            <Route
              path={routes.productScreen.path()}
              component={React.lazy(routes.productScreen.component)}
              exact
            />
            <Route
              path={routes.cartScreen.path()}
              component={React.lazy(routes.cartScreen.component)}
              exact
            />
            <Route
              path={routes.loginScreen.path()}
              component={React.lazy(routes.loginScreen.component)}
              exact
            />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  </React.Suspense>
);

export default App;
