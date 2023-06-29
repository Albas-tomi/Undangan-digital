// ------------------------------------------- GET URL PARAM -------------------------------------------
if (window.location.search) {
  const valueKeys = window.location.search;
  const value = new URLSearchParams(valueKeys);
  valueName = value.get("name");
  document.getElementById("nama").innerHTML = valueName;
  document.getElementById("nama-undangan").innerHTML = valueName;
}
// ------------------------------------------- END GET URL PARAM -------------------------------------------

// ------------------------------------------- BUKA MODAL AUTOPLAY MUSIC -------------------------------------------
const buka = async () => {
  document.getElementById("navigation").removeAttribute("id");
  document.getElementById("modalKu").removeAttribute("id");
  document.getElementById("tombol-musik").style.display = "block";
  audio.play();
  const btn = document.getElementById("tombol-musik");
  btn.innerHTML = '<i class="bi bi-pause-circle"></i>';
  btn.style.display("block");
};
// ------------------------------------------- END BUKA MODAL AUTOPLAY MUSIC -------------------------------------------

// ------------------------------------------- PLAY MUSIC -------------------------------------------
const audio = (() => {
  var instance = undefined;

  var getInstance = () => {
    if (!instance) {
      instance = new Audio();
      instance.autoplay = true;
      instance.src = document
        .getElementById("tombol-musik")
        .getAttribute("data-url");
      instance.load();
      instance.currentTime = 0;
      instance.volume = 1;
      instance.muted = false;
      instance.loop = true;
    }

    return instance;
  };

  return {
    play: () => {
      getInstance().play();
    },
    pause: () => {
      getInstance().pause();
    },
  };
})();

const play = (btn) => {
  if (btn.getAttribute("data-status").toString() != "true") {
    btn.setAttribute("data-status", "true");
    audio.play();
    btn.innerHTML = '<i class="bi bi-pause-circle"></i>';
  } else {
    btn.setAttribute("data-status", "false");
    audio.pause();
    btn.innerHTML = '<i class="bi bi-play-circle"></i>';
  }
};

// ------------------------------------------- END PLAY MUSIC -------------------------------------------

// ------------------------------------------- DATE -------------------------------------------
let hariPernikahan = new Date(2023, 6, 7);
console.log(hariPernikahan);

let hari = document.getElementById("hari");
let jam = document.getElementById("jam");
let menit = document.getElementById("menit");
let detik = document.getElementById("detik");

setInterval(function () {
  let now = new Date();
  let waktuTunggu = (hariPernikahan - now) / 1000;
  updateJam(waktuTunggu);
}, 1000);

const updateJam = (sisaWaktu) => {
  let harii = Math.floor(sisaWaktu / 86400);
  sisaWaktu -= harii * 86400;

  let jams = Math.floor(sisaWaktu / 3600);
  sisaWaktu -= jams * 3600;

  let menits = Math.floor(sisaWaktu / 60);
  sisaWaktu -= menits * 60;

  let detiks = Math.floor(sisaWaktu % 60);

  hari.innerHTML = Number(harii);
  jam.innerHTML = Number(jams);
  menit.innerHTML = Number(menits);
  detik.innerHTML = Number(detiks);
};

const Number = (number) => {
  return number < 10 ? "0" + number : number;
};
// ------------------------------------------- END DATE -------------------------------------------
