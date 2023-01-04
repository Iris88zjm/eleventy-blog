$(function () {
    if ($("#gsap").length > 0) {
        // s1
        gsap.to(".box", {
            duration: 2,
            backgroundColor: '#8d3dae',
            x: 800,
            xPercent: -100,
            // y: 200,
            rotation: 360,
            repeat: -1,
        });

        // s2
        gsap.to(".svgBox", {
            duration: 2,
            x: 200, // use transform shorthand (this is now using SVG units not px, the SVG viewBox is 100 units wide)
            xPercent: -50,
            // or target SVG attributes
            yoyo: true,
            repeat: -1,
            attr: {
                fill: '#8d3dae',
                rx: 20,
            },
        });

        // s3
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#28a92b";
        let position = { x: 0, y: 0 };

        function draw() {
            // erase the canvas
            ctx.clearRect(0, 0, 300, 300);
            // redraw the square at it's new position
            ctx.fillRect(position.x, position.y, 100, 100);
        }
        //animate x and y of point
        gsap.to(position, {
            x: 200,
            y: 200,
            duration: 4,
            // unlike DOM elements, canvas needs to be redrawn and cleared on every tick
            repeat: -1,
            onUpdate: draw
        });

        // s4
        gsap.to(".test.green", {
            rotation: 360,
            duration: 1,
            repeat: 1,
            repeatDelay: 2,
            ease: "bounce.out"
        });


        gsap.to(".test.purple", {
            rotation: 360,
            duration: 1,
            delay: 1, // delay the start of this animation
            repeat: -1,
            ease: "back.out",
        });

        gsap.from(".s5", {
            duration: 2,
            scale: 0.5,
            opacity: 0,
            delay: 0.5,
            stagger: 0.2, // 间隔推迟时间
            ease: "elastic",
            // force3D: true
        });

        document.querySelectorAll(".s5").forEach(function (box) {
            box.addEventListener("click", function () {
                gsap.to(".s5", {
                    duration: 0.5,
                    opacity: 0,
                    y: -100,
                    stagger: 0.1,
                    ease: "back.in"
                });
            });
        });


        gsap.to(".s6", 1, {
            scale: 0.1,
            y: 600,
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut",
            delay: 1,
            stagger: {
                amount: 1.5,  //所花时间
                //   each: 1,
                grid: [8, 8], // 变化的形式
                from: "center" //变化的开始
            }
        });
    }

    //   homepage-v2
    if ($("#homepage-v2").length > 0) {

        gsap.to("#homepage-v2 .divimg", {
            duration: 5,
            y: 50,
            // yPercent: -5,
            repeat: -1,
            yoyo: true,
        });

        gsap.from("#homepage-v2 .drop", {
            duration: 10,
            x: 10,
            xPercent: -50,
            y: 20,
            yPercent: -50,
            repeat: -1,
            rotation: 360,
            yoyo: true,
        });
        $(".home-nav ul li a").on("click", function () {

            let liIndex = $(this).parent().index();
            $(".container .home").removeClass("active");
            $(".container .home:nth-child(" + (liIndex + 1) + ")").addClass("active");
            gsap.from(".home .content, .home .divimg", {
                duration: 0.5,
                opacity: 0,
                y: 100,
                ease: "power1.out"
            });
        });
    }

});