let dataMudah = databaseTyping;
let dataSedang = databaseTyping;
let dataSulit = databaseTyping;

let teks = "";

let waktu=60;

let timer;

let aktif=false;

let mulaiWaktu;



let input=document.getElementById("input");

let text=document.getElementById("text");





function pilihTeks(){


let level=document.getElementById("level").value;


let sumber;


if(level=="mudah"){

sumber=dataMudah;

}

else if(level=="sedang"){

sumber=dataSedang;

}

else{

sumber=dataSulit;

}



let index=Math.floor(
Math.random()*sumber.length
);



teks=sumber[index];



text.innerHTML=teks;


}




function mulai(){


if(aktif)return;


aktif=true;


pilihTeks();


input.value="";


input.disabled=false;


input.focus();



waktu=60;


document.getElementById("timer").innerHTML=waktu;



mulaiWaktu=Date.now();



timer=setInterval(()=>{


waktu--;


document.getElementById("timer").innerHTML=waktu;



if(waktu<=0){


selesai();


}



},1000);



}






input.addEventListener("input",function(){


let tulisan=input.value;



let benar=0;

let salah=0;



for(let i=0;i<tulisan.length;i++){

    if(tulisan[i]===teks[i]){

        benar++;

    }else{

        salah++;

    }

}


let akurasi=0;



if(tulisan.length>0){


akurasi=Math.round(

(benar/tulisan.length)*100

);


}




let menit=

(60-waktu)/60;



let wpm=Math.round(

(tulisan.length/5)/menit

);



if(!isFinite(wpm)){

wpm=0;

}




document.getElementById("wpm").innerHTML=wpm;


document.getElementById("akurasi").innerHTML=akurasi;


document.getElementById("karakter").innerHTML=tulisan.length;


document.getElementById("salah").innerHTML=salah;




// otomatis ganti paragraf


if(tulisan===teks){


setTimeout(()=>{


pilihTeks();


input.value="";


},500);


}



});






function selesai(){


clearInterval(timer);


aktif=false;


input.disabled=true;



let skor=

Number(
document.getElementById("wpm").innerHTML
);



let high=

localStorage.getItem("highscore")
||0;



if(skor>high){


localStorage.setItem(
"highscore",
skor
);


high=skor;


}



document.getElementById("highscore").innerHTML=high;



document.getElementById("hasilAkhir").innerHTML=

`
Kecepatan : ${skor} WPM <br>
Akurasi : ${document.getElementById("akurasi").innerHTML}% <br>
Karakter : ${document.getElementById("karakter").innerHTML}
`;



document.getElementById("ulang").style.display="inline-block";


}







function ulang(){


location.reload();


}




window.onload=function(){


document.getElementById("highscore").innerHTML=

localStorage.getItem("highscore")
||0;


}
