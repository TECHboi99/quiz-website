let stage1 = document.querySelector(".stage1")
let stage2 = document.querySelector(".stage2")
let stage3 = document.querySelector(".stage3")
let stage4 = document.querySelector(".stage4")
let stage5 = document.querySelector(".stage5")
let stage6 = document.querySelector(".accountmail")


let next1 = document.querySelector(".next1")
let next2 = document.querySelector(".next2")
let next3 = document.querySelector(".next3")
let next4 = document.querySelector(".createacc")

let allStages = document.querySelectorAll(".stage")

let entryIndex = 0

allStages.forEach(stage => {
    stage.style.display = "none"
});

stage1.style.display = "block"
stage6.style.display = "none"

next1.addEventListener("click",()=>{
    let AllUsernames = document.querySelector(".userlistentry").value.split(", ")

    let i = 1
    AllUsernames.forEach(username => {
        let elem = "<div class='useritem'><span>"+i+"</span>"+username+"</div>"
        document.querySelector(".stage1user").innerHTML += elem
        i++
    });
    stage1.style.display = "none"
    stage2.style.display = "block"


})

next2.addEventListener("click",()=>{
    stage2.style.display = "none"
    stage3.style.display = "block"
    entryIndex = 0
    document.querySelector(".userpassword").value = ""
    let AllUsernames = document.querySelector(".userlistentry").value.split(", ")
    document.querySelector(".account-name").innerHTML = AllUsernames[entryIndex]
    document.querySelector(".account-name").dataset.lastentry = AllUsernames[entryIndex]
    document.querySelector(".userpassword").placeholder = makeid(5)
})

let CreaterRecord = {}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function nextEntry() {

    CreaterRecord[document.querySelector(".account-name").dataset.lastentry] = document.querySelector(".userpassword").value

    document.querySelector(".userpassword").value = ""
    let AllUsernames = document.querySelector(".userlistentry").value.split(", ")
    document.querySelector(".account-name").innerHTML = AllUsernames[entryIndex]
    document.querySelector(".account-name").dataset.lastentry = AllUsernames[entryIndex]
    document.querySelector(".userpassword").placeholder = makeid(5)
    if (entryIndex == (AllUsernames.length - 1)) {
        return
    } else {
        entryIndex++
    }

    

    
    
}

next3.addEventListener("click", ()=>{
    stage3.style.display = "none"
    stage4.style.display = "block"
    let AllUsernames = document.querySelector(".userlistentry").value.split(", ")

    let i = 1
    AllUsernames.forEach(username => {
        let password = CreaterRecord[username]
        let elem = "<div class='userentry'><div class='sno'>"+i+"</div><div class='displayusername'>"+username+"</div><div class='displaypassword'>"+password+"</div></div>"
        document.querySelector(".finalusers").innerHTML += elem
        i++
    });


})



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

async function createAccount(username) {
    newLog("⚠ Preparing account : "+username)
    var ref2 = doc(database, "LocalUserService/"+String(username))
    await setDoc(ref2, {
        Username: username,
        Password: CreaterRecord[username],
        Level: ["-","0"],
        LevelLogs: [],
        LevelProgression: [],
        Status: "Member"

        
    }).then(()=>{
        newLog("✔ Created account : "+username)
    })
    
    
}

let timeRemain = document.querySelector(".estimatedTime")

async function finalizeAccounts(acc) {
    
    let ref = doc(database, "LocalUserService","UserData")
    let Data = await getDoc(ref)
    let CurrentUsers = Data.data().Users

    acc.forEach(Account => {
        CurrentUsers.push(Account)
    });
    let ref2 = doc(database, "LocalUserService/UserData")
    await setDoc(ref2, {
        Users: CurrentUsers
    })
}

next4.addEventListener("click",()=>{
    stage4.style.display = "none"
    stage5.style.display = "block"
    newLog("Please wait..")
    newLog("Getting things ready.")
    setTimeout(() => {
        newLog("Starting process.")
        newLog("")
        let AllUsernames = document.querySelector(".userlistentry").value.split(", ")
        let index = 0

        timeRemain.innerHTML = "Estimated Time : "+((AllUsernames.length*4)+12)+" seconds."
        timeRemain.dataset.time = ((AllUsernames.length*4)+12)
        const loop = setInterval(() => {
            createAccount(AllUsernames[index])
            if (index > AllUsernames.length) {
                clearInterval(loop)
                newLog(" ")
                newLog("✅ "+AllUsernames.length+" accounts created.")
                newLog("Process end.")
                setTimeout(() => {
                    finalizeAccounts(AllUsernames)
                    createEmailRecords()
                }, 1000);
            } else {
                index++
            }
            timeRemain.dataset.time = Number(timeRemain.dataset.time)-4
            timeRemain.innerHTML = "Estimated Time : "+(Number(timeRemain.dataset.time)-4)+" seconds."

        }, 4000);
        



        

    }, 1000);
})

function newLog(text) {
    let logs = document.querySelector(".logs")
    let currentIndex = logs.querySelectorAll(".logitem").length+1
    let elem = "<div class='logitem'><span>"+currentIndex+"</span> "+text+"</div>"
    document.querySelector(".logs").innerHTML += elem
}

document.addEventListener("keyup", (e)=>{
    if (e.keyCode == 13) {
        if (document.activeElement == document.querySelector(".userpassword")) {
            nextEntry()
        }
    }
    if (e.keyCode == 16) {
        if (document.activeElement == document.querySelector(".userpassword")) {
            document.querySelector(".userpassword").value = document.querySelector(".userpassword").placeholder
        }
    }
})

newLog("Local Start")




function createEmailRecords() {

    stage6.style.display = "block"
    stage5.style.display = "none"

    let container = document.querySelector(".teamlistmail")
    container.innerHTML = ""
    let AllUsernames = document.querySelector(".userlistentry").value.split(", ")
    AllUsernames.forEach(Account => {
        let Username = Account
        let Password = CreaterRecord[Account]
        let elem = "<div class='mailteam'><p class='teamnamemail'>"+Username+"</p><input type='text' class='teamemail input-"+Username.replace(" ","_")+"'><button class='sendmail' data-value='"+Username+"'>Send</button></div>"
        container.innerHTML += elem
        
    });

    let AllButtons = document.querySelectorAll(".sendmail")
    AllButtons.forEach(Button => {
        Button.addEventListener("click",()=>{
            let MailTeamName = Button.dataset.value
            let MailRec = document.querySelector(".input-"+MailTeamName.replace(" ","_")).value
            let MailTeamPassword = CreaterRecord[MailTeamName]

            window.open("https://mail.google.com/mail/u/6/?fs=1&to="+MailRec+"&su=Christmas Hunt Login Credentials - "+MailTeamName+"&body=Hello "+MailTeamName+",%0D%0A%0D%0AYour login credentials for the Christmas Hunt 2022-23 are below. Once the hunt has begun, you will be able to login using these credentials at https://christmashunt22.netlify.app/login .%0D%0A%0D%0AUsername : "+MailTeamName+"%0D%0APassword : "+MailTeamPassword+"%0D%0A%0D%0AIf you are unable to login or have any other queries, please feel free to contact us via our discord server. %0D%0A%0D%0AHappy Hunting!.%0D%0ASports Club Mis&bcc=ronavsinghal2007@gmailcom&tf=cm")
        })
    });
}

createEmailRecords()