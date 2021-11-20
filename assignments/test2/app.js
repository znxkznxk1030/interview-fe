const imageList = ["image1", "image2", "image3", "image4", "image5"];
const $cardlist = document.querySelector(".card-list");
const $prevBtn = document.querySelector(".nav-prev");
const $nextBtn = document.querySelector(".nav-next");
let page = 0;
let $cards = null;
$prevBtn.addEventListener("click", (e) => {});

init();

$prevBtn.addEventListener("click", () => {
  const l = $cards ? $cards.length : 0;
  page -= 1;
  if (page < 0) page = l;
  display();
});

$nextBtn.addEventListener("click", () => {
  const l = $cards ? $cards.length : 0;
  page = (page + 1) % l;
  display();
});

function init() {
  imageList.forEach((image) => {
    $cardlist.appendChild(createCard(image));
  });

  display();
}

function display() {
  $cards = document.querySelectorAll(".card-item");
  const l = $cards.length;
  let an = 0;

  if (l > 0) {
    an = 360 / l;
  }

  $cards.forEach(($card, i) => {
    let index = ((i + page) % l);

    $card.style.backgroundImage = `url(img/image${index + 1}.png)`;
    $card.style.transform = `
      rotateY(${an * (i + page)}deg)
      translateZ(250px)
      rotateY(${-an * (i + page)}deg)`;

    // console.log("angle" + an * index);
  });
  
}

function createCard(image) {
  const $card = document.createElement("li");
  $card.classList.add("card-item");

  const $img = document.createElement("div");
  $img.classList.add("card-img");
  $img.style.backgroundImage = `url(img/${image}.png)`;

  const $mirror = document.createElement("div");

  $mirror.classList.add("card-img--mirror");

  $mirror.style.background = `linear-gradient(180deg, #FFFFFF 50%, rgba(255, 255, 255, 0.71) 100%), url(img/${image}.png)`;

  $img.appendChild($mirror);
  $card.appendChild($img);

  return $card;
}
