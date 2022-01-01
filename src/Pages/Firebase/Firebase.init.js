import firebaseConfig from "./Firebase.config";
import { initializeApp } from "firebase/app";
const firebaseinit = () => {
    return initializeApp(firebaseConfig);
}
export default firebaseinit;