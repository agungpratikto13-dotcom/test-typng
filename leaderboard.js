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
