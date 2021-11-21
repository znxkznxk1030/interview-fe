let page = 1
const $nav_links = document.querySelectorAll(".nav-link")
const $contents = document.querySelectorAll(".content > section")

console.log($nav_links)

window.onload = () => {
  $nav_links.forEach(($navlink) => {
    console.log($navlink)
    console.log($navlink.getAttribute('data-page'))

    $navlink.addEventListener("click", (e) => {
      e.preventDefault()
      console.log(e)
      page = $navlink.getAttribute("data-page")
      removeActiveLinkAll()
      $navlink.classList.add("active")
    })
  })
}

const $nav_top = document.getElementsByClassName("link-topfive")

function removeActiveLinkAll() {
  $nav_links.forEach(($navlink) => {
    $navlink.classList.remove("active")
  })
}
