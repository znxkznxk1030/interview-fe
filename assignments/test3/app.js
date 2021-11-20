const $stars = document.querySelectorAll(".rate-stars .star");
const $stars_rate = document.querySelectorAll(".rate-stars div");

console.log($stars);

$stars_rate.forEach(($star) => {
  $star.addEventListener("mouseover", (e) => {
    e.stopPropagation();
    let rate = $star.getAttribute("data-rate");
    fillstars(rate);
  });
});

function fillstars(rate) {
  $stars.forEach(($star) => {
    let cur = $star.getAttribute("data-rate");
    if (cur <= rate) {
      $star.classList.add("full-star-icon");
    } else {
      $star.classList.remove("full-star-icon");
      $star.classList.remove("half-star-icon");
    }

    if (rate == cur - 0.5) {
      $star.classList.add("half-star-icon");
    }
  });
}
