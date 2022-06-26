import { useEffect, useState } from "react";
import initializeFirebase from "../Firebase/Firebase.init";
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile, getIdToken } from "firebase/auth";

// Initializing firebase
initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [regMessage, setRegMessage] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [token, setToken] = useState("");

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    useEffect(() => {
        fetch(`https://pure-depths-91725.herokuapp.com/users/${user.email}`)
        .then(res => res.json())
        .then(data => setAdmin(data.admin))
    }, [user.email])

    const regUserWithEmail = (email, password, username, navigate) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const newUser = { email, displayName: username }
                setUser(newUser);
                // Saving user on Database
                saveUserToDb(email, username, "POST")
                // Sending displayName to FIrebase
                updateProfile(auth.currentUser, {
                    displayName: username
                })
                    .then(() => {

                    })
                    .catch((error) => {

                    });

                setRegMessage("Firebase: Registration Successful !");
                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setRegMessage(errorMessage);
            })
            .finally(() => {
                setIsLoading(false)
            });
    };

    const loginUserWithEmail = (email, password, navigate) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setLoginMessage("Firebase: Login Successful !");
                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoginMessage(errorMessage);
            })
            .finally(() => setIsLoading(false));
    };

    const loginUserWithGoogle = (navigate) => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                saveUserToDb(user.email, user.displayName, "PUT")
                navigate('/');
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    // User Observer
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoading(true);
            if (user) {
                setUser(user);
                getIdToken(user)
                .then( idToken => setToken(idToken))
            } else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unSubscribe();
    }, [])

    const logOut = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => setIsLoading(false));
    };

    const saveUserToDb = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('https://pure-depths-91725.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }


    return {
        user,
        regUserWithEmail,
        loginUserWithEmail,
        logOut,
        regMessage,
        isLoading,
        loginMessage,
        loginUserWithGoogle,
        admin,
        token
    }
};

export default useFirebase;