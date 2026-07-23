let kataAktif = [];

let indexKata = 0;

let aktif=false;

let waktu=60;

let timer;


let input=document.getElementById("input");

let text=document.getElementById("text");



function buatKata(){


kataAktif=[];


for(let i=0;i<20;i++){

let acak=Math.floor(
Math.random()*databaseTyping.length
);


kataAktif.push(
databaseTyping[acak]
);

}


indexKata=0;


tampilkanKata();

}





function tampilkanKata(){


text.innerHTML="";


kataAktif.forEach((kata,index)=>{


let span=document.createElement("span");


span.innerHTML=kata+" ";

span.className="kata normal";


if(index<indexKata){

span.className="kata benar";

}


text.appendChild(span);


});


}





function mulai(){


if(aktif)return;


aktif=true;


input.disabled=false;

input.value="";

input.focus();



buatKata();



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


let ketik=input.value.trim();


let target=kataAktif[indexKata];



if(ketik.length===target.length){



if(ketik===target){


indexKata++;


input.value="";



if(indexKata>=kataAktif.length){


buatKata();


}


}


}



cekWarna(ketik);



});






function cekWarna(ketik){


let semua=document.querySelectorAll(".kata");


semua.forEach((el,i)=>{


if(i<indexKata){


el.className="kata benar";


}

else if(i===indexKata){


if(ketik.length>0 && !kataAktif[i].startsWith(ketik)){


el.className="kata salah";


}else{


el.className="kata normal";


}

}

});


}






function selesai(){


clearInterval(timer);


aktif=false;


input.disabled=true;


}
