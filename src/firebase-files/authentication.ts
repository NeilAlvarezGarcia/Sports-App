import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const auth = getAuth();

export async function login(email:string, password:string) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch(err: any) {
        let message = '';
        if( err.code === 'auth/user-not-found') message = 'Email not found. type correctly the email';
        else if( err.code === 'auth/wrong-password') message = 'Password wrong. Click on "Forgot password" to change it';
        else if( err.code === 'auth/network-request-failed') message = 'Not internet connection to login';
        else message = 'Failed to login';
        
        return {error: message};
    }
}

export async function signUp(email:string, password:string) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch(err: any) {
        let message = '';
        if( err.code === 'auth/email-already-in-use') message = 'Email already in use';
        else if( err.code === 'auth/network-request-failed') message = 'Not internet connection to create the account';
        else message = 'Failed to create an account';
        
        return message;
    }
}
export async function forgotPassword(email:string) {
    try {
        await sendPasswordResetEmail(auth, email);
        return {error: ''}
    } catch(err: any) {
        let message = '';
        if( err.code === 'auth/user-not-found') message = 'Email not found. type correctly the email to change the password';
        else if( err.code === 'auth/network-request-failed') message = 'Not internet connection to continue';
        else message = 'Something went wrong';
        
        return {error: message};
    }
}

export async function logout() {
    await signOut(auth);
}