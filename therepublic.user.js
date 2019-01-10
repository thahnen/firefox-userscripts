// ==UserScript==
// @name        TheRepublic - Unnervig
// @version     1.0.0
// @description Löscht all die Werbung, Social-Media-Scheisse etc, die uBlock Origin nicht wegbannt, nachträglich!
// @license     MIT
// @author      Tobias Hahnen
// @namespace   https://github.com/thahnen
// @include     http://*therepublic.com*
// @include     https://*therepublic.com*
// @run-at      document-begin
// @icon        http://www.therepublic.com/wp-content/uploads/sites/6/2016/03/TheRepublic-Icon-1024x1024-300x300.jpg
// @updateURL   https://raw.githubusercontent.com/thahnen/firefox-userscripts/master/therepublic.user.js
// @downloadURL https://raw.githubusercontent.com/thahnen/firefox-userscripts/master/therepublic.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Alle Elemente, die entfernt werden sollen, über Query ausmachen!
    // ===============================================================
    //
    // Generell:
    // --------
    // 1. '.td-ss-row.td-pb-row.wpb_row.vc_row > .td-pb-span4.vc_column_container.wpb_column > .wpb_wrapper'
    // => Community Connections Seitenleiste interessiert mich nicht
    // 2. '.td-social-style-2.footer-social-wrap'
    // => Social-Media Buttons im Footer
    // 3. '.homepageweather.weatherforecast'
    // => mich interessiert das Wetter im Idioten-Format nicht
    // 4. '.sfHover.menu-item-1061947.td-normal-menu.td-menu-item.menu-item-object-custom.menu-item-type-custom.menu-item > [href="http://www.therepublic.com/subscribe"]'
    // => Menu-Element "Subscribe" braucht kein Mensch
    // => ggf. dalassen
    // 5. '.menu-item-93474.td-normal-menu.td-menu-item.menu-item-first.menu-item-has-children.current-menu-parent.current-menu-ancestor.menu-item-object-custom.menu-item-type-custom.menu-item > .sf-with-ul'
    // => Menu-Element "Local" braucht kein Mensch
    // => ggf. dalassen
    // 6. '.menu-item-14614.td-normal-menu.td-menu-item.menu-item-has-children.menu-item-object-custom.menu-item-type-custom.menu-item > .sf-with-ul'
    // => Menu-Element "Sports" braucht kein Mensch
    // => ggf. dalassen
    //
    // Übersicht-Seite(n):
    // ------------------
    // 1. 'div.td-pb-row.wpb_row.vc_row:nth-of-type(1) > .td-pb-span4.vc_column_container.wpb_column'
    // => Social-Media + Wetter neben Elementen
    // 2. '.wpb_content_element.wpb_widgetised_column > .wpb_wrapper'
    // => Social-Media + Poll neben den Elementen
    //
    // Artikel-Seite(n):
    // ----------------
    // 1. '.td-post-sharing-top.td-post-sharing'
    // => Social-Media Buttons über dem Artikel
    // 2. '.td-post-sharing-bottom.td-post-sharing'
    // => Social-Media Buttons unter dem Artikel
    // 2. '.td-ss-main-sidebar'
    // => Social-Media Seitenleiste neben dem Artikel
    //
    // Vlt. sortieren, nach welchen die wiederkommen könnten und nur die alle paar Sekunden überprüfen?

    let milliseconds = 5000;

    let elems = [
        '.td-ss-row.td-pb-row.wpb_row.vc_row > .td-pb-span4.vc_column_container.wpb_column > .wpb_wrapper',
        '.td-social-style-2.footer-social-wrap',
        '.homepageweather.weatherforecast',
        'div.td-pb-row.wpb_row.vc_row:nth-of-type(1) > .td-pb-span4.vc_column_container.wpb_column',
        '.wpb_content_element.wpb_widgetised_column > .wpb_wrapper',
        '.td-post-sharing-top.td-post-sharing',
        '.td-post-sharing-bottom.td-post-sharing',
        '.td-ss-main-sidebar'
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