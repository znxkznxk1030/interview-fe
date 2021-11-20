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

function fillstars(target) {
  $stars.forEach(($star) => {
    let cur = $star.getAttribute("data-rate");

    $star.classList.remove("full-star-icon");
    $star.classList.remove("half-star-icon");

    if (target == cur - 0.5) {
      $star.classList.add("half-star-icon");
      return;
    }

    if (cur <= target) {
      $star.classList.add("full-star-icon");
    }
  });
}
