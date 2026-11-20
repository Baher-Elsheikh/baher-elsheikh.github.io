/* Mobile menu for pages that do not load site.js */
(function(){
  var nav = document.getElementById("mainnav"), mb = document.querySelector(".menu-btn");
  if (!nav || !mb) return;
  function close(){ nav.classList.remove("open"); mb.setAttribute("aria-expanded", "false"); }
  mb.addEventListener("click", function(){ var o = nav.classList.toggle("open"); mb.setAttribute("aria-expanded", o); });
  nav.addEventListener("click", function(e){ if (e.target.closest("a")) close(); });
  document.addEventListener("keydown", function(e){ if (e.key === "Escape" && nav.classList.contains("open")) { close(); mb.focus(); } });
})();
