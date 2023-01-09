$(function () {
    if ($("#hero-kids").length > 0) {

        // gsap.to("#hero-kids .divimg", {
        //     duration: 5,
        //     y: 50,
        //     // yPercent: -5,
        //     repeat: -1,
        //     yoyo: true,
        // });

        // gsap.from("#hero-kids .drop", {
        //     duration: 10,
        //     x: 10,
        //     xPercent: -50,
        //     y: 20,
        //     yPercent: -50,
        //     repeat: -1,
        //     rotation: 360,
        //     yoyo: true,
        // });
        $(".home-nav ul li a").on("click", function () {
            let liIndex = $(this).data("value");
            let liTarget = $(".container .home:nth-child(" + liIndex + ")");
            if($(this).parent().hasClass("active")) {
                $(".home-nav ul li").removeClass("active");
                $(this).parent().removeClass("active");
            } else {
                $(".home-nav ul li").removeClass("active");
                $(this).parent().addClass("active");
            }


            if(liTarget.hasClass("active")) {
                $(".container .home").removeClass("active");
                $(".container .home:nth-child(1)").addClass("active");
            } else {
                $(".container .home").removeClass("active");
                liTarget.addClass("active");
            }
            gsap.from(".home .content", {
                duration: 0.5,
                opacity: 0,
                y: 100,
                ease: "power1.out"
            });
        });
    }
});