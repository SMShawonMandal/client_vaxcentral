import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAkTi_d8c7gZGMhdNqEQjadYhOnPkgZL6g",
  authDomain: "vaxcentral.firebaseapp.com",
  projectId: "vaxcentral",
  storageBucket: "vaxcentral.appspot.com",
  messagingSenderId: "1081458272070",
  appId: "1:1081458272070:web:d75783ae6e2fb2bbb0a747"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth