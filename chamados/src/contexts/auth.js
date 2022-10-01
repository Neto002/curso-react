import { createContext, useEffect, useState } from "react";
import firebase from "../firebase/config";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadStorage() {
      const storageUser = localStorage.getItem("SistemaUser");
      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }

      setLoading(false);
    }
    loadStorage();
  }, []);

  function storageUser(data) {
    localStorage.setItem("SistemaUser", JSON.stringify(data));
  }

  async function signIn(email, password) {
    setLoadingAuth(true);
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        const userProfile = await firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .get();

        let data = {
          uid: uid,
          nome: userProfile.data().nome,
          avatarURL: userProfile.data().avatarURL,
          email: value.user.email,
        };

        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
      })
      .catch((error) => {
        setLoadingAuth(false);
        console.log(error);
      });
  }

  async function signUp(nome, email, password) {
    setLoadingAuth(true);
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        await firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .set({
            nome: nome,
            avatarURL: null,
          })
          .then(() => {
            let data = {
              uid: uid,
              nome: nome,
              email: value.user.email,
              avatarURL: null,
            };
            setUser(data);
            storageUser(data);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false);
      });
  }

  async function signOut() {
    await firebase.auth().signOut();
    localStorage.removeItem("SistemaUser");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, loadingAuth, signUp, signOut, signIn }}
    >
      {/*!!user - caso o objeto exista = true*/}
      {children}
    </AuthContext.Provider>
  );
}
