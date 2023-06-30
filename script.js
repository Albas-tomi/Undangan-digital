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

// -----------------------------------------Kirim Wa--------------------------------------------------
function sendWhatsAppMessage(nomor, pesan) {
  const waNomor = encodeURIComponent(nomor);
  const waPesan = encodeURIComponent(pesan);
  const waUrl = `https://web.whatsapp.com/send?phone=${waNomor}&text=${waPesan}`;

  window.open(waUrl, "_blank");
}
// -----------------------------------------Last Kirim Wa--------------------------------------------------

// ---------------------------------------Kirim Ucapan-----------------------------
function submitForm(event) {
  event.preventDefault();
  const form = event.target;
  const nama = form.elements.nama.value;
  const ucapan = form.elements.ucapan.value;

  const payload = {
    query: `
      mutation InsertUcapan($nama: String!, $ucapan: String!) {
        insert_Ucapan(objects: [{ nama: $nama, ucapan: $ucapan }]) {
          affected_rows
        }
      }
    `,
    variables: {
      nama: nama,
      ucapan: ucapan,
    },
  };

  // Kirim permintaan HTTP POST menggunakan fetch
  fetch("https://mighty-honeybee-36.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret":
        "d61umfEQbfmvDlXvZFQdtJJ3392Y5Ifuju2ozM7BnI5M3rV17MISI7kRA5Dw9o82",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Ucapan Berhasil Terkirim ");
      form.reset();
      const nomorPenerima = "62895638079961";
      const pesanWhatsApp = ` ${ucapan} dari, ${nama}`;
      sendWhatsAppMessage(nomorPenerima, pesanWhatsApp);
    })
    .catch((error) => {
      console.error("Terjadi kesalahan saat mengirim data:", error);
    });
}
// --------------------------------------Last mengirim ucapan -----------------------------------------

// -------------------------------------- ucapan -----------------------------------------

// Fungsi untuk mendapatkan data ucapan terbaru
function getLatestUcapan() {
  function formatTime(time) {
    const [hour, minute, second] = time.split(":");

    let formattedHour = parseInt(hour);
    const amPm = formattedHour < 12 ? "AM" : "PM";
    if (formattedHour === 0) {
      formattedHour = 12;
    } else if (formattedHour > 12) {
      formattedHour -= 12;
    }

    const formattedMinute = parseInt(minute);
    const formattedSecond = parseInt(second);

    const formattedTime = `${formattedHour}:${formattedMinute}:${formattedSecond} ${amPm}`;
    return formattedTime;
  }
  fetch("https://mighty-honeybee-36.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret":
        "d61umfEQbfmvDlXvZFQdtJJ3392Y5Ifuju2ozM7BnI5M3rV17MISI7kRA5Dw9o82",
    },
    body: JSON.stringify({
      query: `
      query GetLatestUcapan {
          Ucapan(order_by: {makeUcapan: desc}) {
            id
            nama
            ucapan
            create_At
          }
        }
      `,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const ucapanContainer = document.getElementById("ucapan-container");
      ucapanContainer.innerHTML = "";
      const count = document.getElementById("countUcapan");
      count.innerHTML = `
      <p>(${data.data.Ucapan.length})</p>
      `;
      const latestUcapan = data.data.Ucapan.slice(-3);
      latestUcapan.forEach((ucapan) => {
        const ucapanItem = document.createElement("div");
        ucapanItem.classList.add("ucapan-item");
        const createTime = ucapan.create_At;
        const formattedTime = formatTime(createTime);
        ucapanItem.innerHTML = `
          <div class="flex justify-between">
            <p class="text-xl my-2 font-bold">${ucapan.nama}</p>
            <p class="my-2">${formattedTime}</p>
          </div>
          <div class="line"></div>
          <span class="text-lg text-gray-600">${ucapan.ucapan}</span>
        `;
        ucapanContainer.appendChild(ucapanItem);
      });
    })
    .catch((error) => {
      console.error("Terjadi kesalahan saat mengambil data:", error);
    });
}

getLatestUcapan();

// -------------------------------------- ucapan -----------------------------------------
