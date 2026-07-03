const URL = "https://script.google.com/macros/s/AKfycbyAMHIbAUuXCtG_V4s7tsWtOiCPVg7DUT_mA4tU1YWLte6_Y6nlAnpOv0Kd-WvJNGxaoQ/exec";

function tampilJam(){

const sekarang = new Date();

document.getElementById("tanggal").innerHTML =
sekarang.toLocaleDateString("id-ID",{

weekday:"long",

day:"numeric",

month:"long",

year:"numeric"

});

document.getElementById("jam").innerHTML =
sekarang.toLocaleTimeString("id-ID");

}

setInterval(tampilJam,1000);

tampilJam();



function absen(){

let nama=document.getElementById("nama").value;

if(nama==""){

alert("Nama harus diisi");

return;

}

document.getElementById("loading").innerHTML="Mengambil lokasi GPS...";

navigator.geolocation.getCurrentPosition(

function(pos){

let latitude=pos.coords.latitude;

let longitude=pos.coords.longitude;

let maps="https://maps.google.com/?q="+latitude+","+longitude;

const sekarang=new Date();

let data={

nama:nama,

tanggal:sekarang.toLocaleDateString("id-ID"),

jam:sekarang.toLocaleTimeString("id-ID"),

lokasi:maps

};

fetch(URL,{

method:"POST",

body:JSON.stringify(data)

})

.then(res=>res.text())

.then(res=>{

document.getElementById("loading").innerHTML="";

document.getElementById("hasil").innerHTML=`

<h3 style="color:green">

✅ ABSENSI BERHASIL

</h3>

<p><b>Nama :</b> ${nama}</p>

<p><b>Tanggal :</b> ${data.tanggal}</p>

<p><b>Jam :</b> ${data.jam}</p>

<p><a href="${maps}" target="_blank">Lihat Lokasi</a></p>

`;

document.getElementById("nama").value="";

})

.catch(err=>{

alert("Gagal mengirim data");

});

},

function(){

alert("GPS ditolak.");

}

);

}