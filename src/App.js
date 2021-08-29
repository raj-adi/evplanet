import BrowserRouter from 'react-router-dom/BrowserRouter';
import { Route } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

//Import Actions
import { signout } from './actions/userActions';

//Import Bootstrap Components
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

//Import Home Screens
import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/SigninScreen';

//Import Admin Screens
import adminDashboard from './screens/admin/adminDashboard';
import adminDevice from './screens/admin/AdminDeviceScreen';
import adminPayment from './screens/admin/adminPayment';
import adminRFID from './screens/admin/adminRFID';

//Import User Screens
import userDashboard from './screens/user/userDashboard';
import userBilling from './screens/user/userBilling';
import userPayment from './screens/user/userPayment';

//Import Routes
import UserRoute from './components/UserRoute';
import AdminRoute from './components/AdminRoute';

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
              <Navbar.Brand as={Link} to="/">EV PLANET</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">

                {userInfo && userInfo.isAdmin ? (
                  <Nav className="me-auto">
                    <Nav.Link as={Link} to="/adminDashboard">Dashboard</Nav.Link>
                    <Nav.Link as={Link} to="/adminDevice">Devices</Nav.Link>
                    <Nav.Link as={Link} to="/adminRFID">RFID</Nav.Link>
                    <Nav.Link as={Link} to="/adminPayment">Payment</Nav.Link>
                  </Nav>

                )
                  : userInfo ?
                    (
                      <Nav className="me-auto">
                        <Nav.Link as={Link} to="/userDashboard">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/userBilling">Billing</Nav.Link>
                        <Nav.Link as={Link} to="/userPayment">Payment</Nav.Link>
                      </Nav>
                    )
                    : (
                      <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/vision">Our Vision</Nav.Link>
                        <Nav.Link as={Link} to="/about">About Us</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
                      </Nav>
                    )}

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
                  {userInfo && userInfo.isAdmin ? (
                    <NavDropdown title="" id="collasible-nav-dropdown">
                      <NavDropdown.Item as={Link} to="/adminProfile">Admin Profile</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item to="#signout" onClick={signOutHandler}>Sign Out</NavDropdown.Item>
                    </NavDropdown>
                  ) : userInfo ? (
                    <NavDropdown title="" id="collasible-nav-dropdown">
                      <NavDropdown.Item as={Link} to="/userProfile">My Profile</NavDropdown.Item>
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


        {/* Admin Routes */}
        <AdminRoute path="/adminDashboard" component={adminDashboard} exact></AdminRoute>
        <AdminRoute path="/adminDevice" component={adminDevice} exact></AdminRoute>
        <AdminRoute path="/adminPayment" component={adminPayment} exact></AdminRoute>
        <AdminRoute path="/adminRFID" component={adminRFID} exact></AdminRoute>

        {/* User Routes */}
        <UserRoute path="/userDashboard" component={userDashboard} exact></UserRoute>
        <UserRoute path="/userBilling" component={userBilling} exact></UserRoute>
        <UserRoute path="/userPayment" component={userPayment} exact></UserRoute>
      </div>
    </BrowserRouter>
  );
}

export default App;
