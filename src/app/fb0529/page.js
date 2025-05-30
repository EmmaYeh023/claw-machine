"use client"
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useEffect } from "react";

export default function fb0529() {

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdjD0LTgW1VsAR07i01J8e76Pq_FLdKhE",
  authDomain: "claw-machine-b1f30.firebaseapp.com",
  projectId: "claw-machine-b1f30",
  storageBucket: "claw-machine-b1f30.firebasestorage.app",
  messagingSenderId: "357399650164",
  appId: "1:357399650164:web:04887cc34eb10ea3ee9621",
  measurementId: "G-E2180782D7",
  databaseURL:"https://claw-machine-b1f30-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database, "/");

const auth = getAuth();
const provider = new GoogleAuthProvider();


useEffect(()=> {
  onValue(dbRef, (snapshot)=>{
    console.log( snapshot.val( ));
  });

  const userRef = ref(database, "/accounts/0000001");
  set(userRef, {
    
    points: 200
  });
  
},[]);

const addNewAccount =() =>{
  console.log('clicked') ;
  const accountRef = ref(database, "/accounts");

  push(accountRef),{
    name: "wing",
    type: "User",
    point: "10"
  }
}

const login = () => {
  signInWithPopup(auth, provider).then((result) =>{
    console.log(result);
    console.log(result.user.uid);
    console.log(result.user.displayName);

    const uid = result.user.uid;

    const accountRef = ref(database, "/accounts/" + uid);
    console.log(accountRef);

    if(accountRef){
      //沒有此帳號，獨立一個
      console.log('enter');

      push(accountRef,{
        name: "wing",
        type: "User",
        point: "10",
        uid: uid
      });
    }
   
    
  });
}

  return (
    <>
      fb0529
      <div onClick={ addNewAccount } className='text-white border-white border-2 px-4 py-1 inline-block'> Add new Account</div>
      <div onClick={ login } className='text-white border-white border-2 px-4 py-1 inline-block'> Login with GOOGLE</div>
    </>
  );
}
