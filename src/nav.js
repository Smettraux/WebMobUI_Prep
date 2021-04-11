// HTML api History
const changePage = (event) => {
    let h = document.location.hash;
  
    // validate anchor
    if (!h) h = "#todo";
    anchor = h.replace("#", "#page-");
    try {document.querySelector(anchor)} catch { return }
    // if no page exists, choose the default one
    if (!document.querySelector(anchor)) {
      h = "#todo";
      anchor = "#page-todo";
    }
  
    // Hide all pages
    let pages = document.querySelectorAll(".page");
    for (let page of pages) page.classList.add('hidden');
    // Show the selected one
    let currentPage = document.querySelector(anchor);
    currentPage.classList.remove('hidden');
  
    // remove "active" feddback on menu links
    let links = document.querySelectorAll("#wrapper > nav a");
    for (let link of links) link.classList.remove('active');
    // and add it to the current active one
    let currentLink = document.querySelector(`[href="${h}"]`);
    currentLink.classList.add('active');
  
    window.scrollTo(0, 0);
  }
  
  window.addEventListener("popstate", changePage);
  changePage();
  
  // Handler for small screen navigation
  document.querySelector("#wrapper nav").addEventListener("click", evt => {
    // Execute the click handler only on small screen
    if (!window.matchMedia("screen and (max-width: 32rem), screen and (max-device-width: 32rem)").matches) return;
    let menu = document.querySelector("#wrapper nav ul");
    menu.classList.toggle('show');
  });