let kataAktif = [];

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


for(let i=0;i<20;i++){

let acak=Math.floor(
Math.random()*databaseTyping.length
);


kataAktif.push(databaseTyping[acak]);


}


indexKata=0;


tampilkanKata();


}




function tampilkanKata(){

    text.innerHTML="";

    kataAktif.forEach((kata,index)=>{

        let span=document.createElement("span");

        span.innerHTML=kata+" ";

        span.className="kata";

        if(index===0){
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





input.addEventListener("input",()=>{

    let ketik=input.value.trim();

    let target=kataAktif[indexKata];

    jumlahKarakter++;

    cekWarna(ketik);

    if(ketik===target){

        jumlahBenar++;

        document.getElementById("benar").innerHTML=jumlahBenar;

        indexKata++;

        input.value="";

        if(indexKata>=kataAktif.length){

            buatKata();

        }else{

            cekWarna("");

        }

    }
    else if(ketik.length>=target.length){

        jumlahSalah++;

        document.getElementById("salah").innerHTML=jumlahSalah;

    }

});



cekWarna(ketik);


});






function cekWarna(ketik){

    let semua=document.querySelectorAll(".kata");

    semua.forEach((el,i)=>{

        el.classList.remove("benar","salah","aktif");

        if(i<indexKata){

            el.classList.add("benar");

        }
        else if(i===indexKata){

            el.classList.add("aktif");

            if(ketik.length>0){

                if(kataAktif[i].startsWith(ketik)){

                    el.classList.add("benar");

                }else{

                    el.classList.add("salah");

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






function selesai(){


clearInterval(timer);


aktif=false;


input.disabled=true;



let skor=hitungKPM();



simpanScore(
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
