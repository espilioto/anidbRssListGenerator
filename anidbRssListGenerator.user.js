// ==UserScript==
// @name          AniDB torrent rss list generator
// @namespace     anindbrss
// @version       1.2
// @description   Generates a delimited anime name list for you to optimally edit
// @author        SouLSLayeR
// @match         https://anidb.net/user/wishlist/*
// @grant         GM.setClipboard
// @downloadURL   https://raw.githubusercontent.com/espilioto/anidbRssListGenerator/master/anidbRssListGenerator.user.js
// @updateURL     https://raw.githubusercontent.com/espilioto/anidbRssListGenerator/master/anidbRssListGenerator.user.js
// @homepage      https://github.com/espilioto/anidbRssListGenerator
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
      try{
        GM.setClipboard(`uTorrent format:\r\n${utorrentString}\r\n\r\nqBt format:\r\n${qbtRegexString}`);
        toastr.success("Copied to clipboard");
      }
      catch(ex) {
        toastr.error("Error copying to clipboard", ex);
      }
    });
  }
})();
