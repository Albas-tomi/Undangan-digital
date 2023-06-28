
//--script yang bisa anda copykan pada appscript spreadsheet anda
// ingat anda harus deploy pada app script kemudian ambil alamat form action dan masukan pada sction form HTML

function doPost(e) {

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
  var newRow = sheet.getLastRow() + 1;
  var rowData = [];

  rowData[0] = new Date();        // Tanggal dan Waktu
  rowData[1] = e.parameter.nama;  // Nama
  rowData[2] = e.parameter.ktp;   // Nomor KTP
  rowData[3] = e.parameter.tgl_lahir; // Tanggal Lahir
  rowData[4] = e.parameter.alamat; // Alamat
  rowData[5] = e.parameter.no_hp; // Nomor HP

  sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
  return ContentService.createTextOutput("Data berhasil disimpan");
}

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
    btn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
  } else {
    btn.setAttribute("data-status", "false");
    audio.pause();
    btn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
  }
};
