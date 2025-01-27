import firebaseConfig from './config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
  //Inicilizando la configuración de firebase con todo lo que necesitamos 
  firebase.initializeApp(firebaseConfig);
  console.log(`Base de datos iniciada`);
  
  const db = firebase.firestore();
  const storage = firebase.storage();
 
  export default {
    firebase,
    db,
    storage
}