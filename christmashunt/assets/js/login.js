

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyBitFIGq7erLyJ_A_s8JO2Ue054jRfYF5c",
    authDomain: "christmashunt-7921c.firebaseapp.com",
    databaseURL: "https://christmashunt-7921c-default-rtdb.firebaseio.com",
    projectId: "christmashunt-7921c",
    storageBucket: "christmashunt-7921c.appspot.com",
    messagingSenderId: "824330788884",
    appId: "1:824330788884:web:aa94b27749da340a3c4701",
    measurementId: "G-2LR1GCDGBX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import {
    getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField
}
from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"

const database = getFirestore();


async function getQuestionData(level) {
    var ref = doc(database, "LocalResponseService", "level"+level)
    let docSnap = await getDoc(ref)
    docSnap = docSnap.data()
    window.localStorage.setItem("PlayerData", JSON.stringify(level))
    window.localStorage.setItem("CurrentQuestion", JSON.stringify(docSnap.Question))
    window.localStorage.setItem("ClientID", JSON.stringify(btoa(docSnap.Answer)))
    window.location.replace("/index.html")
}


async function validate() {
    // if (window.localStorage.getItem("disq") == "disq") {
    //     document.querySelectorAll(".field").forEach(element => {
    //         element.remove()
    //     });
    //     document.querySelector(".login").remove()
    //     document.querySelector(".error").style.color = "black"
    //     document.querySelector(".error").style.marginTop = "50px"
    //     document.querySelector(".error").innerHTML =  "Sorry. You can not log in from this device anymore due to disqualification."
    //     return
    // }
    var ref2 = doc(database, "LocalUserService",document.querySelector(".username").value)
    let docRef = await getDoc(ref2)
    if (docRef.data() == undefined) {
        document.querySelector(".error").innerHTML =  "This user does not exist."

    } else {
        let data = docRef.data()
        if (data.Status == "disq") {
            document.querySelector(".error").innerHTML =  "This account has been disqualified."
            return
        }
        if (data.Password == document.querySelector(".password").value) {
            document.querySelector(".error").innerHTML =  "Login successfull. "
            window.localStorage.setItem("User", JSON.stringify(data))
            getQuestionData(data.Level[1])
            
        } else {
            document.querySelector(".error").innerHTML =  "Incorrect password. "

        }
    }
}



document.querySelector(".login").addEventListener("click", ()=>{
    let res = validate()
})
