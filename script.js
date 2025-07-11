const canvas = document.getElementById('starry-sky-canvas');
const ctx = canvas.getContext('2d');

let stars = [];
let numStars = 200;
const speed = 0.2; // Slow movement

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    numStars = Math.floor((canvas.width * canvas.height) / 20000);
}

function createStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random(),
            twinkleSpeed: Math.random() * 0.02 + 0.005,
            twinkleDirection: Math.random() < 0.5 ? 1 : -1,
            vx: (Math.random() - 0.5) * speed,
            vy: (Math.random() - 0.5) * speed,
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
    });
}

function updateStars() {
    stars.forEach(star => {
        // Move stars
        star.x += star.vx;
        star.y += star.vy;

        // Twinkle effect
        star.alpha += star.twinkleSpeed * star.twinkleDirection;
        if (star.alpha <= 0.1 || star.alpha >= 1) {
            star.twinkleDirection *= -1;
        }
        // Clamp alpha
        star.alpha = Math.max(0.1, Math.min(1, star.alpha));


        // Wrap around screen
        if (star.x < -star.radius) star.x = canvas.width + star.radius;
        if (star.x > canvas.width + star.radius) star.x = -star.radius;
        if (star.y < -star.radius) star.y = canvas.height + star.radius;
        if (star.y > canvas.height + star.radius) star.y = -star.radius;
    });
}

function animate() {
    updateStars();
    drawStars();
    requestAnimationFrame(animate);
}

// Initial setup
window.addEventListener('resize', () => {
    resizeCanvas();
    createStars(); // Recreate stars for new size
});

resizeCanvas();
createStars();
animate();

