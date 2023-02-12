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

let LocalUserList = {}

async function loadUserByName(name) {
    
    var ref = doc(database, "LocalUserService", String(name))
    let data = await getDoc(ref)

    LocalUserList[name] = data.data()
    
    window.localStorage.setItem("AdminUserList", JSON.stringify(LocalUserList))

    

}
document.querySelector(".refresh").addEventListener("click",()=>{
    console.log("Getting new users.")
    getNewUsers()
})

async function getNewUsers() {
    let AllUsers = document.querySelectorAll(".user")
    AllUsers.forEach(User => {
        User.remove()
    });
    window.localStorage.setItem("AdminUserList", JSON.stringify(""))

    LocalUserList = {}
    var ref = doc(database, "LocalUserService","UserData")
    let data = await getDoc(ref)
    data = data.data()

    

    let Array = data.Users
    window.localStorage.setItem("AdminUserRaw", JSON.stringify(Array))
    Array.forEach(User => {
        loadUserByName(User)
    });
    setTimeout(() => {
        loadUsersLocally()
    }, 2000);
    


    
}




function loadData(username) {
    let Data = JSON.parse(window.localStorage.getItem("AdminUserList"))
    Data = Data[username]

    document.querySelector(".loadteamname").innerHTML = username
    document.querySelector(".loadlevel").innerHTML = Data.Level[1]
    document.querySelector(".leveltime").innerHTML = "At "+ Data.LevelProgression.splice(-1)

    let Logs = document.querySelector(".logs")
    Logs.innerHTML = ""

    Data.LevelLogs.forEach(Log => {
        let elem = "<div class='log'>"+Log+"</div>"
        Logs.innerHTML += elem

    });

    let Progs = document.querySelector(".progs")
    Progs.innerHTML = ""

    let i = 1
    
    Data.LevelProgression.forEach(Log => {
        let elem = "<div class='prog'><span>Reached "+i+"</span> "+Log+"</div>"
        i++
        Progs.innerHTML += elem

    });
    let elem = "<div class='prog'><span> Reached "+Data.Level[1]+"</span> "+document.querySelector(".leveltime").textContent.split(" ")[1]+"</div>"
    Progs.innerHTML += elem

    

}

function loadUsersLocally() {
    // 
    let AllUsers = document.querySelectorAll(".user")
    AllUsers.forEach(User => {
        User.remove()
    });


    let UserList = JSON.parse(window.localStorage.getItem("AdminUserList"))
    let Raw = JSON.parse(window.localStorage.getItem("AdminUserRaw"))
    let i = 1
    Raw.forEach(User => {
        let Data = UserList[User]
        console.log(Data)
        let Elem = "<div class='user' data-id='"+User+"'><div class='number'>"+i+"</div><div class='name'>"+Data.Username+"</div><div class='level'><p>"+Data.Level[1]+"</p><p>"+Data.LevelProgression.slice(-1)+"</p></div></div>"
        document.querySelector(".userlist").innerHTML += Elem
        i++
    });
    let AllUsers2 = document.querySelectorAll(".user")

    AllUsers2.forEach(User => {
        User.addEventListener("click",()=>{
            loadData(User.dataset.id)
        })
    });
}



loadUsersLocally()





// let AllUsers = document.querySelectorAll(".user")
// AllUsers.forEach(User => {
//     User.remove()
// });
// loadUsersLocally()