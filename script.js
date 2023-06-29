const buka = async () => {
  document.getElementById("navigation").removeAttribute("id");
  document.getElementById("modalKu").removeAttribute("id");
  document.getElementById("tombol-musik").style.display = "block";
  audio.play();
  const btn = document.getElementById("tombol-musik");
  btn.innerHTML = '<i class="bi bi-pause-circle"></i>';
  btn.style.display("block");
};

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
