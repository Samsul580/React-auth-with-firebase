import React, { useContext, useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGoogle
} from '@fortawesome/free-brands-svg-icons';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    });
    const provider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
            .then(data => {
                const { displayName, photoURL, email } = data.user;
                const signedInUser = {
                    isSignIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(signedInUser);
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch(error => {
                console.log(error);
                console.log(error.message);
            })
    }
    const handleValidation = (event) => {
        let isFieldValid = true;
        if (event.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === "password") {
            const isPasswordValid = event.target.value.length > 5;
            const passwordHasNumber = /\d{1}/.test(event.target.value)
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (event.target.name === "confirm-password") {
            const isPasswordValid = event.target.value.length > 5;
            const passwordHasNumber = /\d{1}/.test(event.target.value)
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(data => {
                    const newUserInfo = { ...user };
                    setUser(newUserInfo);
                    updateUserName(user.name);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((data) => {
                    const newUserInfo = { ...user };
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        e.preventDefault();
    }
    const updateUserName = name => {
        var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name,
            photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(data => {
            console.log(data)
        })
            .catch(error => {
                // An error happened.
                console.log(error)
            });
    }
    return (
        <div>
            <div className="login-area">
                <div className="login-box">
                    <div className="login-form">
                        <h2 className="text-left mb-5">{newUser ? 'Create an account' : 'Login'}</h2>
                        <form onSubmit={handleSubmit}>
                            {
                                newUser ? <div>
                                    <input type="text" name="name" onChange={handleValidation} id="" placeholder="Name" />
                                    <input type="text" name="email" onChange={handleValidation} id="" placeholder="Username or Email" />
                                    <input type="password" name="password" onChange={handleValidation} id="" placeholder="Password" />
                                    <input type="password" name="confirm-password" onChange={handleValidation} id="" placeholder="Confirm password" />
                                </div>
                                    : <div>
                                        <input type="text" name="email" onChange={handleValidation} id="" placeholder="Email" />
                                        <input type="password" name="password" onChange={handleValidation} id="" placeholder="Password" />
                                        <div className="text-left mb-3">
                                            <input type="checkbox" name="" id="remember" />
                                            <label htmlFor="remember">Remember Me</label>
                                        </div>
                                    </div>
                            }

                            <input className="w-100 btn btn-warning" type="submit" value={newUser ? 'Create a new account' : 'Login'} />
                        </form>
                        <p className="mt-3">Don't have an account? <span className="new-account text-danger" onClick={() => setNewUser(!newUser)}>{newUser ? 'Login' : 'Create a new account'}</span></p>
                    </div>
                </div>
                <div className="icon">
                    <li><button className="btn" onClick={handleGoogleSignIn}><FontAwesomeIcon icon={faGoogle} className="text-danger" /> Continue with Google</button></li>
                </div>
            </div>
        </div>
    );
};

export default Login;