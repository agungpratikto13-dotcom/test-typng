let kalimat = [

"Belajar mengetik cepat membutuhkan latihan yang rutin dan konsisten. Kemampuan mengetik dapat membantu pekerjaan menjadi lebih mudah, terutama dalam dunia kerja yang menggunakan komputer setiap hari.",

"Komputer telah menjadi bagian penting dalam kehidupan modern. Banyak pekerjaan dapat diselesaikan dengan lebih cepat menggunakan teknologi yang terus berkembang.",

"Disiplin adalah salah satu kunci utama untuk mencapai keberhasilan. Dengan latihan yang teratur seseorang dapat meningkatkan kemampuan dan menjadi lebih baik dari sebelumnya.",

"Internet memberikan banyak manfaat bagi manusia. Melalui internet kita dapat mencari informasi, belajar hal baru, berkomunikasi, dan mengembangkan berbagai keterampilan.",

"Bahasa Indonesia merupakan bahasa persatuan yang digunakan oleh masyarakat dari berbagai daerah. Walaupun memiliki banyak perbedaan budaya, masyarakat Indonesia tetap dapat berkomunikasi dengan baik.",

"Kemajuan teknologi membawa perubahan besar dalam kehidupan manusia. Banyak kegiatan yang dahulu membutuhkan waktu lama kini dapat dilakukan dengan lebih cepat dan praktis.",

"Menjaga kesehatan tubuh sangat penting agar dapat menjalankan aktivitas sehari hari dengan baik. Pola makan yang seimbang, olahraga, dan istirahat cukup dapat membantu menjaga kondisi tubuh.",

"Kesabaran dan ketekunan merupakan sikap yang diperlukan untuk mencapai tujuan. Setiap proses membutuhkan waktu dan usaha yang tidak sedikit.",

"Belajar sesuatu yang baru mungkin terasa sulit pada awalnya. Namun dengan latihan yang terus menerus kemampuan seseorang akan meningkat secara perlahan.",

"Lingkungan yang bersih dapat memberikan kenyamanan bagi semua orang. Menjaga kebersihan adalah tanggung jawab bersama yang harus dilakukan setiap hari.",

"Kerja sama dalam sebuah tim dapat menghasilkan pekerjaan yang lebih baik. Setiap anggota memiliki peran penting untuk mencapai tujuan bersama.",

"Penggunaan teknologi harus dilakukan dengan bijak. Teknologi dapat memberikan manfaat besar apabila digunakan untuk hal yang positif.",

"Kecepatan mengetik bukan hanya tentang seberapa cepat tangan bergerak. Ketelitian dan kemampuan membaca juga sangat berpengaruh terhadap hasil akhir.",

"Latihan mengetik secara rutin dapat meningkatkan kemampuan seseorang. Semakin sering berlatih maka semakin terbiasa tangan dan pikiran bekerja bersama.",

"Masa depan yang baik dapat dipersiapkan mulai dari sekarang. Setiap usaha kecil yang dilakukan hari ini dapat memberikan hasil besar di kemudian hari."

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
