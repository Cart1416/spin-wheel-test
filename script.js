const canvas = document.getElementById('spinWheel');
const ctx = canvas.getContext('2d');

const sections = ['Random Piece', 'Double your money ', 'Free map expansion ', 'Free ball'];
const colors = [
    '#890000', '#874100', '#848000', '#3c8200'
];

const wheelRadius = canvas.width / 2;
const arcSize = (2 * Math.PI) / sections.length;
let currentAngle = 0;
let spinSpeed = 0;
let isSpinning = false;

// Draw the initial wheel
function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let startAngle = currentAngle;

    sections.forEach((amount, index) => {
        const endAngle = startAngle + arcSize;

        // Draw slice
        ctx.beginPath();
        ctx.moveTo(wheelRadius, wheelRadius);
        ctx.arc(wheelRadius, wheelRadius, wheelRadius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = colors[index];
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.stroke();

        // Add text inside the section
        ctx.save();
        ctx.translate(wheelRadius, wheelRadius);
        ctx.rotate(startAngle + arcSize / 2);
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(amount, wheelRadius / 1.5, 10); // Text inside section
        ctx.restore();

        startAngle = endAngle;
    });
}

// Spin the wheel
function spinWheel() {
    if (isSpinning) return;

    isSpinning = true;
    spinSpeed = Math.random() * 10 + 20; // Initial spin speed
    const spinDuration = Math.random() * 5000 + 5000; // Spin time: 5-10 seconds
    const deceleration = spinSpeed / (spinDuration / 20); // Gradual slowdown per frame

    const spinInterval = setInterval(() => {
        currentAngle += spinSpeed * Math.PI / 180; // Convert degrees to radians
        spinSpeed -= deceleration;

        if (spinSpeed <= 0) {
            clearInterval(spinInterval);
            isSpinning = false;
            showResult();
        }

        drawWheel();
    }, 20);
}

// Show the result using SweetAlert
function showResult() {
    const finalAngle = currentAngle % (2 * Math.PI);
    const winningIndex = Math.floor((sections.length - (finalAngle / (2 * Math.PI) * sections.length)) % sections.length);
    const winningAmount = sections[winningIndex];
    
    alert(winningAmount);
}

// Initialize the wheel
drawWheel();



