
        function generateStars(count = 150) {
                const star = document.querySelector(".star");
                const stars = [];
                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight;

                for (let i = 0; i < count; i++) {
                const x = Math.floor(Math.random() * screenWidth);
                const y = Math.floor(Math.random() * screenHeight);
                stars.push(`${x}px ${y}px #fff`);
                }

                star.style.boxShadow = stars.join(", ");
                }

                window.addEventListener("load", generateStars);
                window.addEventListener("resize", () => generateStars())

        function spawnMeteor() {
                const container = document.getElementById("meteors-container");
                const meteor = document.createElement("div");
                meteor.className = "meteor";

                meteor.style.left = Math.floor(Math.random() * 100 - Math.random() ) + "vw";
                meteor.style.top = Math.floor(Math.random() * 20) + "vh"; 

                container.appendChild(meteor);

                // Remove meteor after animation
                meteor.addEventListener("animationend", () => {
                meteor.remove();
                });
                }

                setInterval(() => {
                spawnMeteor();
                }, Math.random() * 700 + 300); 
