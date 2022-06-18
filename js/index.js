// $(document).ready(async function() {
//     let link = window.location.pathname;
//
//     if (link === "/ru/") {
//         $("#text-page").load("/ru/text.html")
//     } else if (link === "/") {
//         $("#text-page").load("/text.html")
//     }
//
//     function mainPage() {
//         window.history.replaceState("", "", "/FizCoin/ru/");
//
//         document.title = "FizCoin"
//         $(".blur-bg").removeClass("blur-bg-blurred");
//         // window.scrollTo(0, 0)
//
//         $("#about-text").removeClass("opacity-1");
//         $("#get-fiz-text").removeClass("opacity-1");
//         $("#buy-sell-text").removeClass("opacity-1");
//         $("#governance-text").removeClass("opacity-1");
//
//         setTimeout(function () {
//             $("#about-text").removeClass("visible");
//             $("#get-fiz-text").removeClass("visible");
//             $("#governance-text").removeClass("visible");
//             $("#buy-sell-text").removeClass("visible");
//         }, 800)
//
//         $(".block-expended").css("height", "100vh");
//     }
//
//     document.getElementById("fizcoin").addEventListener("click", function () {
//         mainPage();
//     })
//
//     function aboutPage() {
//         let link = window.location.pathname;
//
//         if (link === ("/FizCoin/ru/" || "/ru" || "/")) {
//             window.history.replaceState("", "", "about");
//         }
//
//         document.title = "About FizCoin"
//         $(".blur-bg").addClass("blur-bg-blurred");
//         window.scrollTo(0, 0)
//
//         $("#about-text").addClass("visible");
//
//         setTimeout(function () {
//             $("#about-text").addClass("opacity-1");
//             $("#get-fiz-text").removeClass("opacity-1");
//             $("#governance-text").removeClass("opacity-1");
//             $("#buy-sell-text").removeClass("opacity-1");
//         }, 100)
//
//         $("#get-fiz-text").removeClass("visible");
//         $("#governance-text").removeClass("visible");
//         $("#buy-sell-text").removeClass("visible");
//
//         $(".block-expended").css("height", "0vh");
//     }
//
//     document.getElementById("about").addEventListener("click", function () {
//         aboutPage();
//     })
//
//     function launchApp() {
//         let link = window.location.pathname;
//
//         if (link === ("/FizCoin/ru/" || "/ru" || "/")) {
//             window.history.replaceState("", "", "app");
//         }
//
//         document.title = "FizCoin App"
//         $(".blur-bg").addClass("blur-bg-blurred");
//         window.scrollTo(0, 0)
//
//         $("#get-fiz-text").addClass("visible");
//
//         setTimeout(function () {
//             $("#get-fiz-text").addClass("opacity-1");
//             $("#about-text").removeClass("opacity-1");
//             $("#buy-sell-text").removeClass("opacity-1");
//             $("#governance-text").removeClass("opacity-1");
//         }, 100)
//
//         $("#about-text").removeClass("visible");
//         $("#governance-text").removeClass("visible");
//         $("#buy-sell-text").removeClass("visible");
//
//         $(".block-expended").css("height", "0vh");
//     }
//
//
//     document.getElementById("get-fiz").addEventListener("click", function () {
//         launchApp();
//     })
//
//     function governance() {
//         let link = window.location.pathname;
//
//         if (link === ("/FizCoin/ru/" || "/ru" || "/")) {
//             window.history.replaceState("", "", "governance");
//         }
//
//         document.title = "Governance"
//         $(".blur-bg").addClass("blur-bg-blurred");
//         window.scrollTo(0, 0)
//
//         $("#governance-text").addClass("visible");
//
//         setTimeout(function () {
//             $("#get-fiz-text").removeClass("opacity-1");
//             $("#about-text").removeClass("opacity-1");
//             $("#buy-sell-text").removeClass("opacity-1");
//             $("#governance-text").addClass("opacity-1");
//         }, 100)
//
//         $("#get-fiz-text").removeClass("visible");
//         $("#about-text").removeClass("visible");
//         $("#buy-sell-text").removeClass("visible");
//
//         $(".block-expended").css("height", "0vh");
//     }
//
//     document.getElementById("governance").addEventListener("click", function () {
//         governance()
//     })
//
//     function buySell() {
//         let link = window.location.pathname;
//
//         if (link === ("/FizCoin/ru/" || "/ru" || "/")) {
//             window.history.replaceState("", "", "buy-sell");
//         }
//
//         document.title = "Buy/Sell FIZ"
//         $(".blur-bg").addClass("blur-bg-blurred");
//         window.scrollTo(0, 0)
//
//         $("#buy-sell-text").addClass("visible");
//
//         setTimeout(function () {
//             $("#get-fiz-text").removeClass("opacity-1");
//             $("#about-text").removeClass("opacity-1");
//             $("#buy-sell-text").addClass("opacity-1");
//             $("#governance-text").removeClass("opacity-1");
//         }, 100)
//
//         $("#get-fiz-text").removeClass("visible");
//         $("#about-text").removeClass("visible");
//         $("#governance-text").removeClass("visible");
//
//         $(".block-expended").css("height", "0vh");
//     }
//
//     document.getElementById("buy-sell").addEventListener("click", function () {
//         buySell();
//     })
//
//     switch (link) {
//         case ("/ru/about/" || "/about/"):
//             aboutPage();
//             break;
//         case ("/ru/buy-sell/" || "/buy-sell/"):
//             buySell();
//             break;
//         case ("/governance/" || "/governance/"):
//             governance();
//             break;
//         case ("/ru/app/" || "/app/"):
//             launchApp();
//             break;
//     }
// });
//
