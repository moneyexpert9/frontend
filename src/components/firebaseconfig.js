// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaKizDgjJkzdUAP6lkqmzZe6XHyi0-NXc",
  authDomain: "invest-online-earn-online.firebaseapp.com",
  projectId: "invest-online-earn-online",
  storageBucket: "invest-online-earn-online.appspot.com",
  messagingSenderId: "792193844953",
  appId: "1:792193844953:web:26de4c076dcd196f05e0c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imgDb = getStorage(app);



export {imgDb};



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import {getStorage} from "firebase/storage";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBqCIjTGHhnPvoxY_Ww93CV1V0O9fcipqA",
//   authDomain: "lift-cd32c.firebaseapp.com",
//   projectId: "lift-cd32c",
//   storageBucket: "lift-cd32c.appspot.com",
//   messagingSenderId: "309610392881",
//   appId: "1:309610392881:web:af8911c90d9a56e8199410"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const imgDb = getStorage(app);



// export {imgDb};