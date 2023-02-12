let input = document.querySelector(".answer")
let levelC = document.querySelector(".level")
let content = document.querySelector(".content")
let question = document.querySelector(".question")



if (String(window.location.pathname).includes("end")){
} else {
    window.location.replace("/end")

}

document.querySelector(".main").style.opacity = "1"

document.title = "Christmas Hunt 2022-23"
if (input == null) {
    input = document.querySelector(".noinput")
}

if (window.localStorage.getItem("LocalLogs") == undefined) {
    window.localStorage.setItem("LocalLogs", JSON.stringify([]))
}
if (window.localStorage.getItem("ClientID") == undefined) {
    window.localStorage.setItem("ClientID", JSON.stringify("ZGFyc2hhbmFtYWFt"))
}
if (window.localStorage.getItem("PlayerData") == undefined) {
    window.localStorage.setItem("PlayerData", JSON.stringify("0"))
}


function getTime() {
    let date = new Date()
    let time = date.getHours()+":"+date.getMinutes()
    
    return time
}

getTime()


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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import {
    getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField
}
from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"

const database = getFirestore();


function saveAnswer(answer) {
    let CurrentList = window.localStorage.getItem("LocalLogs")
    CurrentList = JSON.parse(CurrentList)
    let level = String(JSON.parse(window.localStorage.getItem("PlayerData")))

    let Val = "[Level "+level+", "+getTime()+"] "+answer
    CurrentList.push(Val)
    window.localStorage.setItem("LocalLogs", JSON.stringify(CurrentList))
}

function validate(obj) {
    obj.value = obj.value.toLowerCase().replace(" ","")
}

input.addEventListener("keyup",()=>{
    validate(input)
})



async function updateTeamData(reqLevel) {
    let team = JSON.parse(window.localStorage.getItem("User"))

    let CurrentLogs = team.LevelLogs
    let NewLogs = JSON.parse(window.localStorage.getItem("LocalLogs"))

    let NewEntry = CurrentLogs

    NewLogs.forEach(log => {
        NewEntry.push(log)
    });

    let LevelProgress = team.LevelProgression
    LevelProgress.push(getTime())

    var ref = doc(database, "LocalUserService", team.Username)
    await setDoc(ref,{
        Level: ["-", String(reqLevel)],
        LevelLogs: NewEntry,
        Password: team.Password,
        Status: team.Status,
        Username: team.Username,
        LevelProgression: LevelProgress
    })
    window.localStorage.setItem("LocalLogs", JSON.stringify([]))
    window.location.reload()
}

async function getQuestionData(level) {

    let LastLevel = String(JSON.parse(window.localStorage.getItem("LastLevel")))
    if (String(LastLevel) == String(level)) {
        
        let Level = Number(JSON.parse(window.localStorage.getItem("PlayerData")))
        levelC.textContent = "Level "+String(JSON.parse(window.localStorage.getItem("PlayerData")))

        content.innerHTML = JSON.parse(window.localStorage.getItem("CurrentQuestion"))

        return
    }
    window.localStorage.setItem("LocalLogs", JSON.stringify([]))
    
    window.localStorage.setItem("LastLevel", JSON.stringify(level))
    levelC.textContent = "Level "+String(JSON.parse(window.localStorage.getItem("PlayerData")))
    


    var ref = doc(database, "LocalResponseService", "level"+level)
    let docSnap = await getDoc(ref)
    
    docSnap = docSnap.data()
    window.localStorage.setItem("PlayerData", JSON.stringify(level))
    window.localStorage.setItem("CurrentQuestion", JSON.stringify(docSnap.Question))
    window.localStorage.setItem("ClientID", JSON.stringify(btoa(docSnap.Answer)))
    content.innerHTML = JSON.parse(window.localStorage.getItem("CurrentQuestion"))
    levelC.textContent = "Level "+String(JSON.parse(window.localStorage.getItem("PlayerData")))
    // window.location.replace("/index.html")
    
    
}

async function getTeamData() {
    let team = JSON.parse(window.localStorage.getItem("User")).Username
    var ref = doc(database, "LocalUserService", team)
    let docSnap = await getDoc(ref)

    

    window.localStorage.setItem("User", JSON.stringify(docSnap.data()))
    if (docSnap.data().Status == "disq") {
        window.location.replace("/logout?error=disq")
        window.localStorage.setItem("disq", "disq")
        return
    }
    
    
    getQuestionData(docSnap.data().Level[1])
    
}




function processPlayer() {
    let level = Number(JSON.parse(window.localStorage.getItem("PlayerData")))
    level++
    if (level == 16) {
        question.style.display = "none"
        document.querySelector(".win").style.display = "block"
        window.localStorage.setItem("Win", "true")
        document.getElementById("confettis").style.display = "block"

    }
    window.localStorage.setItem("PlayerData", JSON.stringify(level))
    updateTeamData(level)
}

function reloadDiv() {
    question.style.opacity = "0"
    setTimeout(() => {
        question.style.opacity = "1"
        input.disabled = null
        input.focus()
    }, 200);
    
}

document.addEventListener("keyup", (e)=>{
    if (e.keyCode == 13) {
        if (document.activeElement == input) {
            if (input.value == "" || input.value == " " || input.disabled == "true") {
                return
            }
            input.disabled = "true"

            saveAnswer(input.value)
            if (input.value == atob(JSON.parse(window.localStorage.getItem("ClientID"))).toLowerCase()) {
                question.style.opacity = "0"
                processPlayer()
                return
            }
            input.value = ""
            reloadDiv()
        }
    } 
})

window.onload = function() {
    
    let user = JSON.parse(window.localStorage.getItem("User"))
    if (user.Status == "Admin") {
        
        document.querySelectorAll(".showonadmin").forEach(element => {
            
            element.classList.remove("showonadmin")
            element.class = undefined
            element.querySelector("button").style.display = "auto"
        });
        document.querySelectorAll(".hideonadmin").forEach(element => {
            
            
            element.querySelector("button").style.display = "none"
            element.remove()
            
        });
    } else {
        document.querySelectorAll(".showonadmin").forEach(element => {
            element.remove()
        });
        
    }
    input.focus()
    if (document.querySelector(".main").dataset.ismain == "true") {
        if (window.localStorage.getItem("Win") == "true") {
            question.style.display = "none"
            document.querySelector(".win").style.display = "block"
            document.getElementById("confettis").style.display = "block"
            return
        }
        getTeamData()

    }
    
    document.title = "Christmas Hunt 2022-23"
    
   
}


// import { LevelMap } from "/assets/js/data.js"

// 



window.onbeforeunload = function() {
    
}



function openMain() {

}


document.querySelector(".navtoggle").addEventListener("click",()=>{
    let elem = document.querySelector(".navtoggle")
    if (elem.dataset.active == "false") {
        elem.dataset.active = "true"
        elem.querySelector(".fa").style.color = "var(--main)"
        document.querySelector(".buttons").style.display = "block"
    } else {
        elem.dataset.active = "false"
        elem.querySelector(".fa").style.color = "black"
        document.querySelector(".buttons").style.display = "none"

    }
})