const imageList = ["image1", "image2", "image3", "image4", "image5"];
let imgUrlList = [];
const $cardlist = document.querySelector(".card-list");
const $prevBtn = document.querySelector(".nav-prev");
const $nextBtn = document.querySelector(".nav-next");
const $uploadBtn = document.getElementById("upload");

let page = 0;
let $cards = null;

$uploadBtn.addEventListener("change", function () {
  if (this.files && this.files[0]) {
    const newImgUrl = URL.createObjectURL(this.files[0]);
    // imgUrlList.push(URL.createObjectURL(this.files[0]));
    $cardlist.appendChild(createCard(newImgUrl));

    $cards = document.querySelectorAll(".card-item");
    const l = $cards ? $cards.length : 0;
    page = 1;

    rotateCards();
  }
});

$prevBtn.addEventListener("click", () => {
  const l = $cards ? $cards.length : 0;
  page -= 1;
  if (page < 0) page = 0;
  rotateCards();
});

$nextBtn.addEventListener("click", () => {
  const l = $cards ? $cards.length : 0;
  page++;
  rotateCards();
});

init();

function init() {
  imgUrlList = imageList.map((image) => imgToUrl(image));
  imgUrlList.forEach((imgUrl) => {
    $cardlist.appendChild(createCard(imgUrl));
  });

  rotateCards(0);
}

function rotateCards() {
  $cards = document.querySelectorAll(".card-item");
  const l = $cards.length;
  let an = 0;

  if (l > 0) {
    an = 360 / l;
  }

  $cards.forEach(($card, i) => {
    $card.style.transform = `
      rotateY(${an * (i + page)}deg)
      translateZ(320px)
      rotateY(${-an * (i + page)}deg)`;
  });
}

function imgToUrl(image) {
  return `img/${image}.png`;
}

function createCard(imgUrl) {
  const $card = document.createElement("li");
  $card.classList.add("card-item");

  const $img = document.createElement("div");
  $img.classList.add("card-img");
  $img.style.background = `url(${imgUrl}) no-repeat center center/cover`;

  const $mirror = document.createElement("div");

  $mirror.classList.add("card-img--mirror");

  $mirror.style.background = `linear-gradient(180deg, #FFFFFF 50%, rgba(255, 255, 255, 0.71) 100%), url(${imgUrl}) no-repeat center center/cover`;

  $img.appendChild($mirror);
  $card.appendChild($img);

  return $card;
}
