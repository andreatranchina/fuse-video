import firebase from "./FirebaseConfig";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail,
signInWithPopup, GoogleAuthProvider, GithubAuthProvider, 
FacebookAuthProvider, onAuthStateChanged} from 'firebase/auth'
import { store } from "../redux/store";
import { setUser, toggleLogin } from "../redux/user/user.actions";
import axios from 'axios';

const auth = firebase.auth;

const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);


};

const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

const logoutUser = () => {
    return auth.signOut(); //important to relinquish jwt token from ever being used againsed

}

const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider);
}

const loginWithGithub = () => {
    console.log("github")
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
}

const loginWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
}

onAuthStateChanged (auth, async (user) => {
    console.log("user status changed: " + JSON.stringify(user));
    if (user?.email){

        // store.dispatch(setUser(user));
        try{
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/byEmail/${user.email}`);
            if (response.data){
                store.dispatch(setUser(response.data));
            }

        }
        catch(error){
            console.log(error.message);
        }
    }

});

const FirebaseAuthService = {
    registerUser,
    loginUser,
    logoutUser,
    sendPasswordResetEmail: (email) => {
        sendPasswordResetEmail(auth, email);
    },
    loginWithGoogle,
    loginWithGithub,
    loginWithFacebook,
    onAuthStateChanged,
}

export default FirebaseAuthService;