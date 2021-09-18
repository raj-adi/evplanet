import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'

//Import Actions
import { signout } from './actions/userActions';

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
        <header class="topbar-nav">

          <nav class="navbar navbar-expand fixed-top">

            {userInfo && userInfo.isAdmin ? (
              <ul class="navbar-nav mr-auto align-items-center">
                <li class="nav-item">
                  <Link class="nav-link toggle-menu" to="/adminDashboard">Dashboard</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link toggle-menu" to="/adminDevice">Devices</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link toggle-menu" to="/adminRFID">RFID</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link toggle-menu" to="/adminPayment">Payment</Link>
                </li>
              </ul>
            ) : userInfo ? (
              <ul class="navbar-nav mr-auto align-items-center">
                <li class="nav-item">
                  <Link class="nav-link toggle-menu" to="/userDashboard">Dashboard</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link toggle-menu" to="/userBilling">Billing</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link toggle-menu" to="/userPayment">Payment</Link>
                </li>
              </ul>

            ) : (
              <ul class="navbar-nav mr-auto align-items-center">
                <li class="nav-item">
                  <Link class="nav-link toggle-menu" to="/">Home</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link toggle-menu" to="/vision">Our Vision</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link toggle-menu" to="/about">About Us</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link toggle-menu" to="/contact">Contact</Link>
                </li>
              </ul>
            )}

            {userInfo && userInfo.isAdmin ? (
              <ul class="navbar-nav align-items-center right-nav-link">
                <li class="nav-item dropdown-lg">
                  <a class="nav-link dropdown-toggle dropdown-toggle-nocaret waves-effect" data-toggle="dropdown" href="javascript:void();">
                    Welcome {userInfo.userName}
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link dropdown-toggle dropdown-toggle-nocaret" data-toggle="dropdown" href="#">
                    <span class="user-profile"><img src="https://via.placeholder.com/110x110" class="img-circle" alt="user avatar" /></span>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-right">
                    <li class="dropdown-item user-details">
                      <a href="javaScript:void();">
                        <div class="media">
                          <div class="avatar"><img class="align-self-start mr-3" src="https://via.placeholder.com/110x110" alt="user avatar" /></div>
                          <div class="media-body">
                            <h6 class="mt-2 user-title">{userInfo.userName}</h6>
                            <p class="user-subtitle">{userInfo.userEmail}</p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li class="dropdown-divider"></li>
                    <li class="dropdown-item">
                      <i class="icon-envelope mr-2"></i>
                      <Link to="#signout">Our Vision</Link>
                    </li>
                    <li class="dropdown-divider"></li>
                    <li class="dropdown-item"><i class="icon-wallet mr-2"></i>
                      <Link to="/adminProfile">My Profile</Link>
                    </li>
                    {/* <li class="dropdown-divider"></li>
                  <li class="dropdown-item"><i class="icon-settings mr-2"></i> Setting</li> */}
                    <li class="dropdown-divider"></li>
                    <li class="dropdown-item">
                      <i class="icon-power mr-2"></i>
                      <Link to="#signout" onClick={signOutHandler}>Logout</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            ) : userInfo ? (

              <ul class="navbar-nav align-items-center right-nav-link">
                <li class="nav-item dropdown-lg">
                  <a class="nav-link dropdown-toggle dropdown-toggle-nocaret waves-effect" data-toggle="dropdown" href="javascript:void();">
                    Welcome {userInfo.userName}
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link dropdown-toggle dropdown-toggle-nocaret" data-toggle="dropdown" href="#">
                    <span class="user-profile"><img src="https://via.placeholder.com/110x110" class="img-circle" alt="user avatar" /></span>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-right">
                    <li class="dropdown-item user-details">
                      <a href="javaScript:void();">
                        <div class="media">
                          <div class="avatar"><img class="align-self-start mr-3" src="https://via.placeholder.com/110x110" alt="user avatar" /></div>
                          <div class="media-body">
                            <h6 class="mt-2 user-title">{userInfo.userName}</h6>
                            <p class="user-subtitle">{userInfo.userEmail}</p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li class="dropdown-divider"></li>
                    <li class="dropdown-item">
                      <i class="icon-envelope mr-2"></i>
                      <Link to="#signout">Our Vision</Link>
                    </li>
                    <li class="dropdown-divider"></li>
                    <li class="dropdown-item"><i class="icon-wallet mr-2"></i>
                      <Link to="/adminProfile">My Profile</Link>
                    </li>
                    {/* <li class="dropdown-divider"></li>
                  <li class="dropdown-item"><i class="icon-settings mr-2"></i> Setting</li> */}
                    <li class="dropdown-divider"></li>
                    <li class="dropdown-item">
                      <i class="icon-power mr-2"></i>
                      <Link to="#signout" onClick={signOutHandler}>Logout</Link>
                    </li>
                  </ul>
                </li>
              </ul>

            ) : (
              <ul class="navbar-nav align-items-center right-nav-link">
                <li class="nav-item dropdown-lg">
                  <Link to="/signin">Sign In</Link>
                </li>
              </ul>
            )}
          </nav>

        </header>
        <div id="wrapper">
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/signin" component={SigninScreen}></Route>


          {/* Admin Routes */}
          <AdminRoute path="/adminDashboard" component={adminDashboard}></AdminRoute>
          <AdminRoute path="/adminDevice" component={adminDevice}></AdminRoute>
          <AdminRoute path="/adminPayment" component={adminPayment}></AdminRoute>
          <AdminRoute path="/adminRFID" component={adminRFID}></AdminRoute>

          {/* User Routes */}
          <UserRoute path="/userDashboard" component={userDashboard} exact></UserRoute>
          <UserRoute path="/userBilling" component={userBilling} exact></UserRoute>
          <UserRoute path="/userPayment" component={userPayment} exact></UserRoute>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
