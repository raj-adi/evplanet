import BrowserRouter from 'react-router-dom/BrowserRouter';
import HomeScreen from './screens/HomeScreen';
import { Route } from 'react-router';
import SigninScreen from './screens/SigninScreen';
import { useDispatch, useSelector } from 'react-redux';
import testScreen from './screens/testScreen';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { signout } from './actions/userActions';
import { Link } from 'react-router-dom';
import BillingHistoryScreen from './screens/BillingHistoryScreen';

function App() {

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link to="#features">Features</Nav.Link>
                  <Nav.Link to="#pricing">Pricing</Nav.Link>
                </Nav>
                <Nav>
                  {
                    userInfo ? (
                      <Nav.Link as={Link} to="#">{userInfo.userName}</Nav.Link>
                    ) :
                      (
                        <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
                      )
                  }
                </Nav>
                <Nav>
                  {
                    userInfo ? (
                      <NavDropdown title="" id="collasible-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/billinghistory">Billing History</NavDropdown.Item>
                        {/* <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
                        <NavDropdown.Divider />
                        <NavDropdown.Item to="#signout" onClick={signOutHandler}>Sign Out</NavDropdown.Item>
                      </NavDropdown>
                    ) :
                      (
                        <h1></h1>
                      )
                  }

                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <Route path="/" component={HomeScreen} exact></Route>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/billinghistory" component={BillingHistoryScreen} exact></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
