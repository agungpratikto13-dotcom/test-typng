let dataScore =
JSON.parse(localStorage.getItem("score")) || [];


function simpanScore(nama,kpm){


dataScore.push({

nama:nama,
kpm:kpm

});


dataScore.sort(
(a,b)=>b.kpm-a.kpm
);


dataScore=dataScore.slice(0,10);



Firebase Firestore.setItem(
"score",
JSON.stringify(dataScore)
);


tampilLeaderboard();


}



function tampilLeaderboard(){


let box=document.getElementById("leaderboard");


box.innerHTML="";


dataScore.forEach((pemain,index)=>{


box.innerHTML+=`

<div>

<b>${index+1}. ${pemain.nama}</b>

<br>

⚡ ${pemain.kpm} KPM

</div>

<hr>

`;

});


}


tampilLeaderboard();
