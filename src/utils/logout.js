import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

export  const logout = async (clearUser) => {
    await signOut(auth);
    clearUser()
}