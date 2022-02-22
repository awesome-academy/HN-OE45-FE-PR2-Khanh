import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCK9cohHFaQL19whhnhkRnPTthV1A6nsSc",
  authDomain: "pr2-e-done.firebaseapp.com",
  projectId: "pr2-e-done",
  storageBucket: "pr2-e-done.appspot.com",
  messagingSenderId: "1093732415913",
  appId: "1:1093732415913:web:2831dcd5a39a695edaacb8",
  measurementId: "G-1SGTVBL194"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
