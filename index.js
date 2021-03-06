$(document).ready(async function() {
    function mainPage() {
        window.history.replaceState("", "", "/");

        document.title = "FizCoin"
        $(".blur-bg").removeClass("blur-bg-blurred");
        // window.scrollTo(0, 0)

        $("#about-text").removeClass("opacity-1");
        $("#terms-text").removeClass("opacity-1");
        $("#buy-sell-text").removeClass("opacity-1");
        $("#governance-text").removeClass("opacity-1");

        setTimeout(function () {
            $("#about-text").removeClass("visible");
            $("#terms-text").removeClass("visible");
            $("#governance-text").removeClass("visible");
            $("#buy-sell-text").removeClass("visible");
        }, 800)
    }

    function aboutPage() {
        window.history.replaceState("", "", "/about");

        document.title = "About FizCoin"
        $(".blur-bg").addClass("blur-bg-blurred");
        window.scrollTo(0, 0)

        setTimeout(function () {
            $("#about-text").addClass("visible");
        }, 100);

        setTimeout(function () {
            $("#about-text").addClass("opacity-1");
            $("#terms-text").removeClass("opacity-1");
            $("#governance-text").removeClass("opacity-1");
            $("#buy-sell-text").removeClass("opacity-1");
        }, 200);

        $("#terms-text").removeClass("visible");
        $("#governance-text").removeClass("visible");
        $("#buy-sell-text").removeClass("visible");

    }

    function terms() {
        window.history.replaceState("", "", "/terms");

        document.title = "FizCoin | Terms"
        $(".blur-bg").addClass("blur-bg-blurred");
        window.scrollTo(0, 0)

        setTimeout(function () {
            $("#terms-text").addClass("visible");
        }, 100);

        setTimeout(function () {
            $("#terms-text").addClass("opacity-1");
            $("#about-text").removeClass("opacity-1");
            $("#buy-sell-text").removeClass("opacity-1");
            $("#governance-text").removeClass("opacity-1");
        }, 200)

        $("#about-text").removeClass("visible");
        $("#governance-text").removeClass("visible");
        $("#buy-sell-text").removeClass("visible");
    }

    function governance() {
        window.history.replaceState("", "", "/governance");

        document.title = "FizCoin | Governance"
        $(".blur-bg").addClass("blur-bg-blurred");
        window.scrollTo(0, 0)

        setTimeout(function () {
            $("#governance-text").addClass("visible");
        }, 100);

        setTimeout(function () {
            $("#terms-text").removeClass("opacity-1");
            $("#about-text").removeClass("opacity-1");
            $("#buy-sell-text").removeClass("opacity-1");
            $("#governance-text").addClass("opacity-1");
        }, 200)

        $("#terms-text").removeClass("visible");
        $("#about-text").removeClass("visible");
        $("#buy-sell-text").removeClass("visible");

    }

    function buySell() {
        window.history.replaceState("", "", "/buy-sell");

        document.title = "FizCoin | Buy/Sell FIZ"
        $(".blur-bg").addClass("blur-bg-blurred");
        window.scrollTo(0, 0)

        setTimeout(function () {
            $("#buy-sell-text").addClass("visible");
        }, 100);

        setTimeout(function () {
            $("#terms-text").removeClass("opacity-1");
            $("#about-text").removeClass("opacity-1");
            $("#buy-sell-text").addClass("opacity-1");
            $("#governance-text").removeClass("opacity-1");
        }, 200)

        $("#terms-text").removeClass("visible");
        $("#about-text").removeClass("visible");
        $("#governance-text").removeClass("visible");
    }

    let link = window.location.pathname;

    await $.get("/footer.html", function (data) {
         $(".footer").append(data)
    })
    await $.get("/header.html", function (data) {
        $(".header").append(data)
    })
    await $.get("/mobile-menu.html", function (data) {
        $(".mobile-menu").append(data)
    })
    await $(".words-list").load("/words.html")
    await $("#text-page").load("/text.html")

    function close_menu() {
        $(".close-button").css("display", "none");
        $(".open-button").css("display", "block");
        $(".mobile-menu").removeClass("open");
    }

    await document.getElementById("fizcoin").addEventListener("click", function () { mainPage(); close_menu(); })
    await document.getElementById("about").addEventListener("click", function () { aboutPage(); })
    await document.getElementById("governance").addEventListener("click", function () { governance(); })
    await document.getElementById("buy-sell").addEventListener("click", function () { buySell(); })
    await document.getElementById("terms").addEventListener("click", function () { terms(); })

    await document.getElementById("about-mobile").addEventListener("click", function () { aboutPage(); close_menu(); })
    await document.getElementById("governance-mobile").addEventListener("click", function () { governance(); close_menu(); })
    await document.getElementById("buy-sell-mobile").addEventListener("click", function () { buySell(); close_menu(); })
    await document.getElementById("terms-mobile").addEventListener("click", function () { terms(); close_menu(); })

    await document.getElementById("open-button").addEventListener("click", function () {
        $(".open-button").css("display", "none");
        $(".close-button").css("display", "block");
        $(".mobile-menu").addClass("open");
    })

    await document.getElementById("close-button").addEventListener("click", function () {
        $(".close-button").css("display", "none");
        $(".open-button").css("display", "block");
        $(".mobile-menu").removeClass("open");
    })

    if (link === "/about" || link === "/about/" || link === "/about/index.html") {
        console.log("about");
        aboutPage();
    }
    if (link === "/buy-sell" || link === "/buy-sell/" || link === "/buy-sell/index.html") {
        console.log("buy-sell");
        buySell();
    }
    if (link === "/governance" || link === "/governance/" || link === "/governance/index.html") {
        console.log("governance");
        governance();
    }
    if (link === "/terms" || link === "/terms/" || link === "/terms/index.html") {
        console.log("terms");
        terms();
    }
});

