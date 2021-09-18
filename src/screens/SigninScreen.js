import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';


export default function SigninScreen(props) {

    // //For Loading
    // const [loading, setLoading] = useState(false);

    // //For Error
    // const [error, setError] = useState(false);

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';


    const userSignin = useSelector((state) => state.userSignin);
    const { loading, error, userInfo } = userSignin;


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
        if (userInfo && userInfo.isAdmin)  {
            props.history.push('/adminDashboard');
        } else if (userInfo){
            props.history.push('/userDashboard');
        }
    }, [props.history, redirect, userInfo]);

    return (
        <div>
            <div class="card card-authentication1 mx-auto my-5 formBackgroud">
                <div class="card-body">
                    <div class="card-content p-2">
                        <div class="text-center">
                            <img src="assets/images/logo-icon.png" alt="logo icon" />
                        </div>
                        <div class="card-title text-uppercase text-center py-3">Sign In</div>
                        <form onSubmit={submitHandler}>
                            <div class="form-group">
                                <label for="exampleInputEmail" class="sr-only">Email</label>
                                <div class="position-relative has-icon-right">
                                    <input id="userEmail"
                                        class="form-control input-shadow"
                                        type="email"
                                        placeholder="Enter email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required />
                                    <div class="form-control-position">
                                        <i class="icon-user"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword" class="sr-only">Password</label>
                                <div class="position-relative has-icon-right">
                                    <input class="form-control input-shadow"
                                        type="password"
                                        placeholder="Enter password"
                                        id="userPassword"
                                        onChange={(e) => setPassword(e.target.value)}
                                        required />
                                    <div class="form-control-position">
                                        <i class="icon-lock"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-6 text-left">
                                    <a href="reset-password.html"></a>
                                </div>
                                <div class="form-group col-6 text-right">
                                    <a href="reset-password.html"></a>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-light btn-block" >Sign In</button>
                        </form>
                    </div>
                </div>
                <div class="card-footer text-center py-3">
                    <p class="text-warning mb-0">Do not have an account? <a href="register.html"> Sign Up here</a></p>
                </div>
            </div>
        </div > 
    );
};