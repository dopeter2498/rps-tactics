import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import config from './firebaseConfig';

const app: FirebaseApp = initializeApp(config);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { app as default, auth, db };
