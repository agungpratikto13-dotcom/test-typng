let kalimat = [

"Belajar mengetik cepat membutuhkan latihan yang rutin dan konsisten setiap hari",

"Indonesia adalah negara yang memiliki banyak budaya bahasa dan keindahan alam",

"Teknologi membantu manusia menyelesaikan pekerjaan dengan lebih cepat dan mudah",

"Kesuksesan datang dari usaha disiplin dan kemauan untuk terus belajar"

];


let teks="";

let waktu=60;

let timer;

let mulaiStatus=false;


const textBox=document.getElementById("text");
const input=document.getElementById("input");



function mulai(){

if(mulaiStatus) return;


mulaiStatus=true;


teks=
kalimat[
Math.floor(Math.random()*kalimat.length)
];


textBox.innerHTML=teks;


input.value="";

input.disabled=false;

input.focus();


waktu=60;

document.getElementById("timer").innerHTML=waktu;



timer=setInterval(()=>{


waktu--;

document.getElementById("timer").innerHTML=waktu;



if(waktu<=0){

selesai();

}


},1000);



}



input.addEventListener("input",()=>{


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

akurasi=
Math.round(
(benar/tulisan.length)*100
);

}



let wpm=
Math.round(
(tulisan.length/5)
/((60-waktu)/60)
);



document.getElementById("wpm").innerHTML=
isFinite(wpm)?wpm:0;


document.getElementById("akurasi").innerHTML=
akurasi;


document.getElementById("karakter").innerHTML=
tulisan.length;


document.getElementById("salah").innerHTML=
salah;



});



function selesai(){

clearInterval(timer);


input.disabled=true;


mulaiStatus=false;


document.getElementById("timer").innerHTML=
"SELESAI";


}
