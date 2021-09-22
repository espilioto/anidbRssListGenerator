// ==UserScript==
// @name         AniDB uTorrent rss list generator
// @namespace    anindbrss
// @version      1.01
// @description  Generates a | delimited anime name list for you to optimally edit
// @author       SouLSLayeR
// @match        https://anidb.net/user/wishlist/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/espilioto/anidbRssListGenerator/master/anidbRssListGenerator.user.js
// @updateURL	   https://raw.githubusercontent.com/espilioto/anidbRssListGenerator/master/anidbRssListGenerator.user.js
// @homepage	   https://github.com/espilioto/anidbRssListGenerator
// ==/UserScript==

(function () {
  var animuTitles;

  var animus = Array.from(document.querySelectorAll(".wishlist .wishlist_type_towatch > td.name > a"));
  if (animus.length > 0) {
    let button = `<li id="animu-list-button"><a name="unclickable" href="#">Generate rss list</a></li>`;
    document.querySelector(".g_list, .nav").insertAdjacentHTML("beforeend", button);
    animuTitles = animus.map(({ innerText }) => `*${innerText}*|`).join("");

    document.querySelector("#animu-list-button").addEventListener("click", () => {
        var tempTextbox = document.createElement("textarea");
        document.body.appendChild(tempTextbox);
        tempTextbox.value = animuTitles;
        tempTextbox.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextbox);

        toastr.success("Copied to clipboard");
      });
  }
})();
