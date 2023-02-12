const LevelMap = {
    level0: [
        "Girte Padte, chot lag gayi.",
        "Haath pe pad gaya thapad"
    ],
    level1: [
        "Ab tu bhaag milka",
        "atheltic meet"
    ],
    level2: [
        "She sits where both parties can see her.",
        "shes one of two who sit in the place where both parties can see her",
        "shes a teacher",
        
    ],
    level3: [
       "google karo bacho google karo",
       "<img src='/assets/img/img.png'>",
       "<img src='/assets/img/img3.png'>",
       "<img src='/assets/img/img5.jpeg'>"
    ],
    level4: [
        "↓<br>↓<br>↓<br>↓<br>↓<br><br>Okay found it.",
        "<img src='/assets/img/img2.png'>",
        "Oh! Christmas, finally. Andd I got a gift, I wonder what it is. But more importantly, who it is from?",
        "When the gifts aren't from </b>Santa<b>. Re-read everything.",
        "And today is the day. I wonder who I will get it from, and I hope the person I'm giving it to does not know!"
    ],
    level5: [
        "did you know, URLs cant have space. example : youtube, google, bitly, etc.",
        "<img src='/assets/img/img4.png'>",
        "The combination of two sports."
    ],
    level6: [
        "Dark dungeons.<br>No ping on my phone.",
        "Khana leke chalo rang lagane, milega raste mai.",
        "Manika Batra",
        "By now, all of you must have gotten the main plot of the story. Now just find the studio where it is made.",
        "Yea so as I was saying, this room. I'dont get any ping on my phone here, but there are still lotta pings if uk what i mean."
    ],
    level7: [
        "Yea so we've been talking about christmas and all cool, but we should prolly give credit to the team in charge",
        "His leadership is well known.",
        "haw abhi bhi is question par ho? rude."
    ],
    level8: [
        "Blessings to the commoner. <br>It can provide for a full family.",
        "Product list?",
        "https://www.parleproducts.com/"
    ],
    level9: [
        "Go a couple steps back.",
        "Itna acha , mujpe chodo to mai mandir banadoon.",
        "Again?<br><img src='/assets/img/img5.jpeg'>",
        "<img src='/assets/img/img6.jpg'>",
        "https://discord.com/channels/1052943888240877628/1054020535706734732/1056256196891386056"
        
    ],
    level10: [
        "alternate of abscence",
        "arrangement laga nahi, bache shuru",
        "pe"
    ],
    level11: [
        "jaate hai hum jha roz, hamare sar ke upar rehta woh.",
        "DG",
        "From hint 1. Face forward, go straight up, then forward."
    ],
    level12: [
        "leave notice",
        "parent portal ka assistant",
        "oh no the datasheet is here."
    ],
    level13: [
        "tinyurl.com/sunlitpath",
        "binary",
        "Art, Kicking, Punching.<br>It's large and white.<br>You've got big eye hurters, too, sometimes."

    ],
    level14: [
        "traffic light tree, london",
        "friction less in the front."
    ],
    level15: [
        "It."
    ]
    
    
}




let Hints = document.querySelector(".hints")
Hints.innerHTML = ""
let level = String(JSON.parse(window.localStorage.getItem("User")).Level[1])

let Current = LevelMap["level"+level]


let i = 1


if (Current.length == 0) {
    
} else {
    document.querySelector(".nohint").remove()
}

Current.forEach(element => {
    let elem = "<div class='hint'><h2>Hint #"+i+"</h2><p>"+element+"</p></div>"
    Hints.innerHTML += elem
    i++
});

document.querySelector(".levelname").textContent = "Level "+level




