import { simpanScore } from './leaderboard.js';

let kataAktif = [];

let statusKata = [];

let indexKata = 0;

let aktif = false;

let waktu = 60;

let timer;


let input = document.getElementById("input");

let text = document.getElementById("text");


let jumlahBenar = 0;
let jumlahSalah = 0;
let jumlahKarakter = 0;

let namaPemain = "";

let waktuMulai;



function buatKata(){


kataAktif=[];

statusKata=[];

for(let i=0;i<20;i++){

    let acak=Math.floor(Math.random()*databaseTyping.length);

    kataAktif.push(databaseTyping[acak]);

}

statusKata = new Array(kataAktif.length).fill(null);

indexKata=0;

tampilkanKata();


}




function tampilkanKata(){

    text.innerHTML="";

    kataAktif.forEach((kata,index)=>{

        let span=document.createElement("span");

        span.innerHTML=kata+" ";

        span.className="kata";

        if(index===indexKata){
            span.classList.add("aktif");
        }

        text.appendChild(span);

    });

}





function mulai(){


if(aktif)return;



namaPemain=document.getElementById("nama").value;



if(namaPemain==""){

alert("Masukkan nama terlebih dahulu");

return;

}



aktif=true;


jumlahBenar=0;

jumlahSalah=0;

jumlahKarakter=0;


document.getElementById("benar").innerHTML=0;

document.getElementById("salah").innerHTML=0;

document.getElementById("kpm").innerHTML=0;



waktuMulai=Date.now();



input.disabled=false;

input.value="";

input.focus();



buatKata();



waktu=parseInt(
document.getElementById("durasi").value
);



document.getElementById("timer").innerHTML=waktu;



timer=setInterval(()=>{


waktu--;


document.getElementById("timer").innerHTML=waktu;


hitungKPM();



if(waktu<=0){

selesai();

}


},1000);



}





input.addEventListener("input", () => {

    let target = kataAktif[indexKata];
    let ketik = input.value;

    cekWarna(ketik.trim());

    // Jika pengguna menekan spasi
    if (ketik.endsWith(" ")) {

        let kata = ketik.trim();

        jumlahKarakter += kata.length;

       if (kata === target) {

    jumlahBenar++;

    statusKata[indexKata] = true;

    document.getElementById("benar").innerHTML = jumlahBenar;

}

     else {

    jumlahSalah++;

    statusKata[indexKata] = false;

    document.getElementById("salah").innerHTML = jumlahSalah;

}

        indexKata++;

        input.value = "";

        if (indexKata >= kataAktif.length) {

            buatKata();

        } else {

            tampilkanKata();
            cekWarna("");

        }

    }

});


function cekWarna(ketik){

    let semua=document.querySelectorAll(".kata");

    semua.forEach((el,i)=>{

        el.classList.remove("aktif","benar","salah");

        if(statusKata[i]===true){

            el.classList.add("benar");

        }

        if(statusKata[i]===false){

            el.classList.add("salah");

        }

        if(i===indexKata){

            el.classList.add("aktif");

            if(ketik.length>0){

                if(kataAktif[i].startsWith(ketik)){

                    el.style.opacity="1";

                }else{

                    el.style.opacity=".8";

                }

            }

        }

    });

}







function hitungKPM(){


let menit=
(Date.now()-waktuMulai)/60000;


let kpm=Math.floor(
(jumlahKarakter/5)/menit
);



if(!isFinite(kpm)){

kpm=0;

}



document.getElementById("kpm").innerHTML=kpm;


return kpm;


}






async function selesai(){


clearInterval(timer);


aktif=false;


input.disabled=true;



let skor=hitungKPM();



await simpanScore(
namaPemain,
skor
);



document.getElementById("hasil").innerHTML=

`
Nama : ${namaPemain}<br>
KPM : ${skor}<br>
Benar : ${jumlahBenar}<br>
Salah : ${jumlahSalah}
`;



document.getElementById("popup").style.display="flex";


}





document.getElementById("start").onclick=mulai;


document.getElementById("ulang").onclick=function(){

location.reload();

};


document.getElementById("closePopup").onclick=function(){

document.getElementById("popup").style.display="none";

};
