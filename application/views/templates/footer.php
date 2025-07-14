        <script>

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
                window.addEventListener("resize", () => generateStars());

        function spawnMeteor() {
                const container = document.getElementById("meteors-container");
                const meteor = document.createElement("div");
                meteor.className = "meteor";

                // Random starting horizontal position (from right edge)
                meteor.style.left = Math.floor(Math.random() * 100 - Math.random() ) + "vw"; // start offscreen right
                meteor.style.top = Math.floor(Math.random() * 20) + "vh"; // top 20% of screen

                container.appendChild(meteor);

                // Remove meteor after animation
                meteor.addEventListener("animationend", () => {
                meteor.remove();
                });
                }

                // Spawn a meteor every 300–1000ms
                setInterval(() => {
                spawnMeteor();
                }, Math.random() * 700 + 300); // 300ms to 1000ms interval
                </script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        
        <script src="<?php echo base_url(); ?>assets/js/window.js"></script>
        </body>
</html>