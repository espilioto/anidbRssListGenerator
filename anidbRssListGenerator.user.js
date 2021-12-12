// ==UserScript==
// @name         AniDB torrent rss list generator
// @namespace    anindbrss
// @version      1.1
// @description  Generates a delimited anime name list for you to optimally edit
// @author       SouLSLayeR
// @match        https://anidb.net/user/wishlist/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/espilioto/anidbRssListGenerator/master/anidbRssListGenerator.user.js
// @updateURL	   https://raw.githubusercontent.com/espilioto/anidbRssListGenerator/master/anidbRssListGenerator.user.js
// @homepage	   https://github.com/espilioto/anidbRssListGenerator
// ==/UserScript==

(function () {
  var utorrentString, qbtRegexString;

  var animuTitles = Array.from(document.querySelectorAll(".wishlist .wishlist_type_towatch > td.name > a")).map(x => x.innerText.replaceAll('`', '\''));
  if (animuTitles.length > 0) {
    let button = `<li id="animu-list-button"><a name="unclickable" href="#">Generate rss list</a></li>`;
    document.querySelector(".g_list, .nav").insertAdjacentHTML("beforeend", button);

    utorrentString = animuTitles.map((x) => `*${x}*`).join("|");
    qbtRegexString = animuTitles.map((x) => `(${x})`).join("|");

    document.querySelector("#animu-list-button").addEventListener("click", () => {
        var tempTextbox = document.createElement("textarea");
        document.body.appendChild(tempTextbox);
        tempTextbox.value = `uTorrent format:\r\n${utorrentString}\r\n\r\nqBt format:\r\n${qbtRegexString}`;
        tempTextbox.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextbox);

        toastr.success("Copied to clipboard");
      });
  }
})();
