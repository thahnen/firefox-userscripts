// ==UserScript==
// @name        YouTube - Unablenkend
// @version     1.0.0
// @description Entfernt alles, was mich neben meinen normalen YT-Abos (gefiltert?) ablenken könnte
// @license     MIT
// @author      Tobias Hahnen
// @namespace   https://github.com/thahnen
// @include     http://*youtube.com*
// @include     https://*youtube.com*
// @run-at      document-begin
// @icon        https://s.ytimg.com/yts/img/favicon_144-vfliLAfaB.png
// @updateURL   https://raw.githubusercontent.com/thahnen/firefox-userscripts/master/youtube.user.js
// @downloadURL https://raw.githubusercontent.com/thahnen/firefox-userscripts/master/youtube.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Alle Elemente, die entfernt werden sollen, über Query/Queries ausmachen!
    // ===============================================================
    //
    // Generell:
    // --------
    // ...
    //
    // Start-Seite:
    // -----------
    // 1. '#dismissable'
    // => alles was einem vorgeschlagen wird, meistens Scheisse :(
    // => Allerdings wird nachgeladen, wenn man alles gelöscht hat, vlt. abfangen vor Anfrage?
    // 2. '#button'
    // => alles, was als Button in der UI auftaucht in der Kopfzeile usw.
    // => dann muss man entsprechende filtern und entfernen
    // 3. '#endpoint'
    // => alle Seitenleisten-Elemente, dann muss das mit "Trends", "Bibliothek", "Verlauf", "Videos, die ..."
    // 4. 'ytd-guide-section-renderer.ytd-guide-renderer.style-scope:nth-of-type(3)'
    // => "Mehr von YouTube"-Seitenleisten-Bereich
    // 5. 'ytd-guide-section-renderer.ytd-guide-renderer.style-scope:nth-of-type(4)'
    // => "Einstellungen" etc. Seitenleisten-Bereich
    // 6. '#vat-notice'
    // => "Alle Preise ..."-Seitenleisten-Element
    //
    // Abos-Seite:
    // ----------
    // ...
    //
    // Video-Seite:
    // -----------
    // 1. '#sections'
    // => Kommentar-Sektion und der ganze Quatsch
    // 2. '#secondary'
    // => Nächstes Video + vorgeschlagene Videos
    // => wenn das entfernt wird, verbreitert sich das Video unnatürlich, vlt. mal handlen!
    // 3. '#sponsor-button'
    // => Sponsoren-Button für Paid-Content, will ich nicht haben
    // 4. 'ytd-button-renderer.force-icon-button.size-default.style-default.ytd-menu-renderer.style-scope:nth-of-type(1) > .ytd-button-renderer.style-scope.yt-simple-endpoint'
    // => "Video teilen" Button brauch ich auch nicht
    // 5. '#button'
    // => Das Einstellungs-Rädchen kann auch weg!
    //
    // Vlt. sortieren, nach welchen die wiederkommen könnten und nur die alle paar Sekunden überprüfen?

    let milliseconds = 5000;

    let elems = [
        //'ytd-guide-section-renderer.ytd-guide-renderer.style-scope:nth-of-type(3)', // jeweils nur einmal wegen nth!
        //'ytd-guide-section-renderer.ytd-guide-renderer.style-scope:nth-of-type(4)', // jeweils nur einmal wegen nth!
        '#vat-notice',
        '#sections',
        '#secondary',
        '#sponsor-button',
        'ytd-button-renderer.force-icon-button.size-default.style-default.ytd-menu-renderer.style-scope:nth-of-type(1) > .ytd-button-renderer.style-scope.yt-simple-endpoint'
    ];

    function checkGarbage() {
        elems.forEach((x) => {
            let elem = document.querySelector(x);
            if (elem != null) {
                elem.remove();
            }
        });
    }

    // direkt einmal am aufrufen
    checkGarbage();

    // Interval setzen, damit es alle paar Sekunden neu überprüft wird.
    setInterval(checkGarbage, milliseconds);
})();