// ==UserScript==
// @name         AniDB uTorrent rss list generator
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Generates a | delimited anime name list for you to optimally edit
// @author       SouLSLayeR
// @match        https://anidb.net/user/wishlist/*
// @grant        none
// ==/UserScript==

(function () {
  var animuTitles;

  var animus = Array.from(document.querySelectorAll(".wishlist > td.name > a"));
  if (animus.length > 0) {
    let button = `<li id="animu-list-button"><a name="unclickable" href="#">Generate uTorrent rss list</a></li>`;
    document
      .querySelector(".g_list, .nav")
      .insertAdjacentHTML("beforeend", button);
    animuTitles = animus.map(({ innerText }) => `*${innerText}*|`).join("");

    document
      .querySelector("#animu-list-button")
      .addEventListener("click", () => {
        var dummy = document.createElement("textarea");
        // to avoid breaking orgain page when copying more words
        // cant copy when adding below this code
        // dummy.style.display = 'none'
        document.body.appendChild(dummy);
        //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
        dummy.value = animuTitles;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);

        toastr.success("Copied uTorrent rss list to clipboard");
      });
  }
})();
