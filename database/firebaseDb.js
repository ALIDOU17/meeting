//export default firebase;
import firebase from 'firebase';




  var firebaseConfig = {
    apiKey: "AIzaSyCuXAkxktXowV1PVn3_LijZAwzpx70cXZ0",
    authDomain: "mareu-27584.firebaseapp.com",
    projectId: "mareu-27584",
    storageBucket: "mareu-27584.appspot.com",
    messagingSenderId: "934904362175",
    appId: "1:934904362175:web:08034f06dcc58c7648420a"
  };


  
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  export default db;
