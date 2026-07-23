let dataMudah = [

"Belajar mengetik cepat membutuhkan latihan setiap hari agar kemampuan tangan menjadi lebih baik",

"Komputer membantu manusia menyelesaikan pekerjaan dengan cepat dan mudah",

"Indonesia memiliki banyak budaya dan bahasa yang sangat beragam"

];


let dataSedang = [

"Teknologi berkembang sangat cepat dan memberikan banyak manfaat bagi kehidupan manusia modern",

"Disiplin dan kerja keras adalah kunci utama untuk mencapai tujuan yang diinginkan",

"Latihan mengetik secara rutin dapat meningkatkan kecepatan dan ketelitian seseorang"

];


let dataSulit = [

"Perkembangan teknologi digital memberikan perubahan besar terhadap cara manusia bekerja, belajar, dan berkomunikasi di seluruh dunia",

"Kemampuan mengetik dengan cepat dan akurat menjadi salah satu keterampilan penting dalam dunia kerja yang menggunakan komputer",

"Kesuksesan membutuhkan proses panjang yang terdiri dari usaha, kesabaran, evaluasi, dan kemauan untuk terus berkembang"

];



let teks="";

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
