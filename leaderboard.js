import { db } from './firebase.js';

import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  collection,
  query,
  orderBy,
  limit
} from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js';

const leaderboardRef = collection(db, 'leaderboard');

// Tampilkan leaderboard realtime
export function tampilLeaderboard() {
  const box = document.getElementById('leaderboard');

  const q = query(
    leaderboardRef,
    orderBy('kpm', 'desc'),
    limit(10)
  );

  onSnapshot(q, (snapshot) => {
    box.innerHTML = '';

    if (snapshot.empty) {
      box.innerHTML = '<p>Belum ada pemain</p>';
      return;
    }

  snapshot.forEach((docSnap, index) => {

    const pemain = docSnap.data();

    let kelas = "";

    if(index === 0){
        kelas = "rank1";
    }else if(index === 1){
        kelas = "rank2";
    }else if(index === 2){
        kelas = "rank3";
    }

    box.innerHTML += `
        <div class="${kelas}">
            <b>${index + 1}. ${pemain.nama}</b>
            <br>
            ⚡ ${pemain.kpm} KPM
        </div>
    `;

});
  });
}

// Simpan rekor terbaik pemain
export async function simpanScore(nama, kpm) {
  const namaBersih = nama.trim();

  if (!namaBersih) {
    alert('Nama tidak boleh kosong');
    return false;
  }

  const docRef = doc(db, 'leaderboard', namaBersih);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const dataLama = docSnap.data();

    if (kpm > dataLama.kpm) {
      await setDoc(docRef, {
        nama: namaBersih,
        kpm: kpm,
        level: document.getElementById('level').value,
        updatedAt: new Date()
      });

      return true;
    }

    return false;
  }

  await setDoc(docRef, {
    nama: namaBersih,
    kpm: kpm,
    level: document.getElementById('level').value,
    createdAt: new Date()
  });

  return true;
}

// Jalankan leaderboard saat halaman dibuka
tampilLeaderboard();

.rank1{

    background:linear-gradient(145deg,#FFD700,#FFC107);

    color:#222;

    padding:18px;

    border-radius:18px;

    margin-bottom:15px;

    font-size:22px;

    font-weight:700;

    box-shadow:
        0 15px 35px rgba(255,215,0,.6),
        inset 0 2px 5px rgba(255,255,255,.8);

    transform:perspective(800px) rotateX(8deg);

    transition:.3s;

}

.rank1:hover{

    transform:perspective(800px) rotateX(0deg) scale(1.04);

}

.rank2{

    background:linear-gradient(145deg,#d9d9d9,#a7a7a7);

    color:#222;

    padding:16px;

    border-radius:15px;

    margin-bottom:12px;

    font-weight:700;

    box-shadow:0 10px 25px rgba(255,255,255,.3);

}

.rank3{

    background:linear-gradient(145deg,#cd7f32,#a0522d);

    color:white;

    padding:16px;

    border-radius:15px;

    margin-bottom:12px;

    font-weight:700;

    box-shadow:0 10px 25px rgba(205,127,50,.4);

}
