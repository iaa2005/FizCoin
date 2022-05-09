$(document).ready(async function() {
    function mainPage() {
        window.history.replaceState("", "", "/");

        document.title = "FizCoin"
        $(".blur-bg").removeClass("blur-bg-blurred");
        // window.scrollTo(0, 0)

        $("#about-text").removeClass("opacity-1");
        // $("#get-fiz-text").removeClass("opacity-1");
        $("#buy-sell-text").removeClass("opacity-1");
        $("#governance-text").removeClass("opacity-1");

        setTimeout(function () {
            $("#about-text").removeClass("visible");
            // $("#get-fiz-text").removeClass("visible");
            $("#governance-text").removeClass("visible");
            $("#buy-sell-text").removeClass("visible");
        }, 800)
    }

    document.getElementById("fizcoin").addEventListener("click", function () {
        mainPage();
    })

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
            // $("#get-fiz-text").removeClass("opacity-1");
            $("#governance-text").removeClass("opacity-1");
            $("#buy-sell-text").removeClass("opacity-1");
        }, 200);

        // $("#get-fiz-text").removeClass("visible");
        $("#governance-text").removeClass("visible");
        $("#buy-sell-text").removeClass("visible");

    }

    document.getElementById("about").addEventListener("click", function () {
        aboutPage();
    })

    // function launchApp() {
    //     window.history.replaceState("", "", "/app");

    //     document.title = "FizCoin App"
    //     $(".blur-bg").addClass("blur-bg-blurred");
    //     window.scrollTo(0, 0)

    //     setTimeout(function () {
    //         $("#get-fiz-text").addClass("visible");
    //     }, 100);

    //     setTimeout(function () {
    //         $("#get-fiz-text").addClass("opacity-1");
    //         $("#about-text").removeClass("opacity-1");
    //         $("#buy-sell-text").removeClass("opacity-1");
    //         $("#governance-text").removeClass("opacity-1");
    //     }, 200)

    //     $("#about-text").removeClass("visible");
    //     $("#governance-text").removeClass("visible");
    //     $("#buy-sell-text").removeClass("visible");
    // }


    // document.getElementById("get-fiz").addEventListener("click", function () {
    //     launchApp();
    // })

    function governance() {
        window.history.replaceState("", "", "/governance");

        document.title = "Governance"
        $(".blur-bg").addClass("blur-bg-blurred");
        window.scrollTo(0, 0)

        setTimeout(function () {
            $("#governance-text").addClass("visible");
        }, 100);

        setTimeout(function () {
            // $("#get-fiz-text").removeClass("opacity-1");
            $("#about-text").removeClass("opacity-1");
            $("#buy-sell-text").removeClass("opacity-1");
            $("#governance-text").addClass("opacity-1");
        }, 200)

        // $("#get-fiz-text").removeClass("visible");
        $("#about-text").removeClass("visible");
        $("#buy-sell-text").removeClass("visible");

    }

    document.getElementById("governance").addEventListener("click", function () {
        governance()
    })

    function buySell() {
        window.history.replaceState("", "", "/buy-sell");

        document.title = "Buy/Sell FIZ"
        $(".blur-bg").addClass("blur-bg-blurred");
        window.scrollTo(0, 0)

        setTimeout(function () {
            $("#buy-sell-text").addClass("visible");
        }, 100);

        setTimeout(function () {
            // $("#get-fiz-text").removeClass("opacity-1");
            $("#about-text").removeClass("opacity-1");
            $("#buy-sell-text").addClass("opacity-1");
            $("#governance-text").removeClass("opacity-1");
        }, 200)

        // $("#get-fiz-text").removeClass("visible");
        $("#about-text").removeClass("visible");
        $("#governance-text").removeClass("visible");
    }

    document.getElementById("buy-sell").addEventListener("click", function () {
        buySell();
    })

    let link = window.location.pathname;

    async function load() {
        if (link.substring(0, 4) === "/ru/") {
            await $("#text-page").load("/ru/text.html")
        } else if (link === "/") {
            await $("#text-page").load("/text.html")
        }
    }

    load().then(function () {
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
        // if (link === "/ru/app" || link === "/ru/app/" || link === "/ru/app/index.html") {
        //     console.log("app");
        //     launchApp();
        // }
    });
});

