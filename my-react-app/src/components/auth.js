import React, { useState } from "react";
import netlogo from '../assets/images/netlogo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadString } from 'firebase/storage';

export const Auth = ({ setUser }) => {
    const [getEmail, setEmail] = useState("");
    const [getPassword, setPassword] = useState("");
    const [email, checkEmail] = useState("");
    const [password, checkPassword] = useState("");
    const navigate = useNavigate();

    const signup = async () => {
        try {
            // Create user with email and password
            await createUserWithEmailAndPassword(auth, getEmail, getPassword);

            // Set user state
            setUser({ email: getEmail });

            // Initialize Firebase Storage
            const storage = getStorage();

            // Create folder in Firebase Storage with user's email as folder name
            const folderPath = getEmail + '/'; // Example: 'user@example.com/'
            const storageRef = ref(storage, folderPath);

            // Upload a text file inside the folder
            const textContent = 'This is a text file created inside the folder.';
            const textFileName = 'myFile.txt';
            const textFileRef = ref(storageRef, textFileName);
            await uploadString(textFileRef, textContent, 'raw');

            // Navigate to home page
            navigate('/home');
            alert("Account created successfully");

        } catch (err) {
            console.error('Error signing up:', err);
            alert("Failed to create account. Please try again.");
        }
    }

    const signin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setUser({ email: email });
            navigate('/home');
            alert("Signed in");

        } catch (error) {
            console.error('Error signing in:', error);
            alert("Sign in failed");
        }
    }

    return (
        <div className="body" id="bgcolor">
            <navbar>
                <div className="box-1">
                    <div className="imagefront">
                        <img className="image-1" src={netlogo} alt="logo"></img>
                        <input className="em-2" placeholder="Email address" type="email" onChange={(e) => checkEmail(e.target.value)}></input>
                        <input className="ps-2" placeholder="Password" type="password" onChange={(e) => checkPassword(e.target.value)}></input>
                        <button type="button" id="btn-1" className="btn btn-danger" onClick={signin}>Sign in</button>
                    </div>
                </div>
            </navbar>
            <div className="box-2">
                <h1 className="headind-1">Unlimited movies, TV shows and more</h1>
                <h3 className="headind-2">Watch anywhere. Cancel anytime.</h3>
                <h4 className="headind-3">Ready to watch? Enter your email to create or restart your membership.</h4>
                <div className="box-3">
                    <input className="em-1" placeholder="Email address" type="email" onChange={(e) => setEmail(e.target.value)}></input><br />
                    <input className="ps-1" placeholder="Create password" type="password" onChange={(e) => setPassword(e.target.value)}></input>
                    <button type="button" id="btn-2" className="btn btn-danger" onClick={signup}>Get Started ⇒ </button>
                </div>
            </div>
        </div>
    )
}

export default Auth;
