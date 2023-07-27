import firebase from "./FirebaseConfig";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail,
signInWithPopup, GoogleAuthProvider, GithubAuthProvider, 
FacebookAuthProvider, onAuthStateChanged} from 'firebase/auth'
import { store } from "../redux/store";
import { setUser } from "../redux/user/user.actions";

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
    const provider = new GithubAuthProvider();
    return signInWithPopup(provider);
}

const loginWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(provider);
}

onAuthStateChanged (auth, (user) => {
    console.log("user status changed: " + JSON.stringify(user));
    if(user){
        const loggedInUser = {
            email: user.email,
            fullName: user.displayName,
            imgUrl: user.photoURL,

        }
        store.dispatch(setUser(loggedInUser));
    }
    else{
        store.dispatch(setUser(null));
        return null;
    }

})

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