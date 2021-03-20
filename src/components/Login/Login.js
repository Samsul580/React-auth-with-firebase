import React, { useContext, useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGoogle,
    faFacebook
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
        photo: '',
        error: ''
    });

    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
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
    const handleFbSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((data) => {
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
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode, errorMessage, email, credential)
            });
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
                    newUserInfo.error = '';
                    setUser(newUserInfo);
                    updateUserName(user.name);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    setUser(newUserInfo);
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((data) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    setUser(newUserInfo);
                });
        }
        e.preventDefault();
    }
    const updateUserName = name => {
        var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
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
                                    <input type="text" name="name" onChange={handleValidation} id="" placeholder="Name" required />
                                    <input type="text" name="email" onChange={handleValidation} id="" placeholder="Username or Email" required />
                                    <input type="password" name="password" onChange={handleValidation} id="" placeholder="Password" required />
                                    <input type="password" name="confirm-password" onChange={handleValidation} id="" placeholder="Confirm password" required />
                                </div>
                                    : <div>
                                        <input type="text" name="email" onChange={handleValidation} id="" placeholder="Email" required />
                                        <input type="password" name="password" onChange={handleValidation} id="" placeholder="Password" required />
                                        <div className="text-left mb-3">
                                            <input type="checkbox" name="" id="remember" />
                                            <label htmlFor="remember">Remember Me</label>
                                        </div>
                                    </div>
                            }
                            <p style={{ color: 'red' }}>{user.error}</p>
                            <input className="w-100 btn btn-warning" type="submit" value={newUser ? 'Create a new account' : 'Login'} />
                        </form>
                        <p className="mt-3">Don't have an account? <span className="new-account text-danger" onClick={() => setNewUser(!newUser)}>{newUser ? 'Login' : 'Create a new account'}</span></p>
                    </div>
                </div>
                <div className="icon">
                    <li><button className="btn" onClick={handleGoogleSignIn}><FontAwesomeIcon icon={faGoogle} className="text-danger" /> Continue with Google</button></li>
                    <li><button className="btn" onClick={handleFbSignIn}><FontAwesomeIcon icon={faFacebook} className="text-primary" /> Continue with Google</button></li>
                </div>
            </div>
        </div>
    );
};

export default Login;