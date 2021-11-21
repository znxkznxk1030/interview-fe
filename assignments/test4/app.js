let page = 1
const $nav_links = document.querySelectorAll(".nav-link")
const $contents = document.querySelectorAll(".content > section")


function init() {
  activeLink()
  slideContent()
}

$nav_links.forEach(($navlink) => {
  console.log($navlink)
  $navlink.addEventListener("click", (e) => {
    page = $navlink.getAttribute("data-page")
    activeLink()
    slideContent()
  })
})

const $nav_top = document.getElementsByClassName("link-topfive")

function activeLink() {
  $nav_links.forEach(($navlink) => {
    $navlink.classList.remove("active")
    const data_page = $navlink.getAttribute("data-page")
    if (page === data_page) {
      $navlink.classList.add("active")
    } else {
      $navlink.classList.remove("active")
    }
  })
}

function slideContent() {
  $contents.forEach(($content) => {
    $content.style.transform = `translateX(-${100 * (page - 1)}vw)`
  })
}
