import { useEffect, useState } from "react";
import firebaseinit from "./Firebase.init";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  getIdToken,
} from "firebase/auth";

firebaseinit();
const useFirebase = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [loginSuccess, setLoginsuccess] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();
  const GoogleProvider = new GoogleAuthProvider();
  const [userType, setUserType] = useState("");

  // ------------------email password login---------------------
  // register
  const createAccountUsingEmailPass = (
    email,
    password,
    name,
    history,
    formData,
    userType
  ) => {
    setIsLoading(true);
    let IsJoinSuccess;
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        if (userType === "rider") {
          saveDataInBackend(formData);
          history.push("/riderprofile");
        }
        if (userType === "learner") {
          saveDataInBackendLearner(formData);
          history.push("/learnerprofile");
        }
        updateInformation(name);
        console.log(result.user);
        setError("");
        setIsLoading(false);
        IsJoinSuccess = true;
      })
      .catch((error) => {
        setError(error.message);
        setLoginsuccess(false);
        IsJoinSuccess = false;
      })
      .finally(() => setIsLoading(false));
    return IsJoinSuccess;
  };

  // Save Join riders Data in backend
  const saveDataInBackend = (formData) => {
    fetch("https://nameless-plains-00975.herokuapp.com/riders", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setLoginsuccess(data);
      })
      .catch((error) => {
        setError(error);
      });
  };
  // Save Join Data in backend
  const saveDataInBackendLearner = (formData) => {
    fetch("https://nameless-plains-00975.herokuapp.com/lrarners", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setLoginsuccess(data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  // login
  const loginUsingEmailPass = (email, password, history, location) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        setLoginsuccess(true);
        setIsLoading(false);

        const destination =  "/dashbord";
        history.push(destination);

        setError("");
      })
      .catch((error) => {
        setError(error.message);

        setLoginsuccess(false);
      })
      .finally(() => setIsLoading(false));
  };
  // update name
  const updateInformation = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {})
      .catch((error) => {});
  };
  // logout

  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setLoginsuccess(false);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  // update all auth
  useEffect(() => {
    const unSubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setError("");
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unSubscribed;
  }, []);


  // check admin

  useEffect(() => {
    fetch(`https://nameless-plains-00975.herokuapp.com/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setAdmin(data.admin));
  }, [user.email]);

  return {
    user,
    error,
    loginSuccess,
    isLoading,
    setError,
    userType,
    admin,
    createAccountUsingEmailPass,
    loginUsingEmailPass,
    logOut,
  };
};
export default useFirebase;
