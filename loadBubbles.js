const bubbleContainer = document.getElementById('bubble-container');

const bubbleColors = [
    '#c8e1cc', // Green
    '#b8d8be', // Green
    '#AFE1AF', // Green
    '#ADD8E6', // Blue
    '#98bad5',  // Blue
    '#c8d9ed'  // Blue
];

const maxBubbles = 50; // Maximum number of bubbles on the screen
const bubbleSpeedRange = [3, 5]; // Range of animation speed (in seconds)
const minBubbleSize = 20; // Minimum bubble size in pixels
const maxBubbleSize = 150; // Maximum bubble size in pixels
const screenHeight = window.innerHeight; // Height of the screen

function createBubble() {
    if (bubbleContainer.childElementCount < maxBubbles) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.style.backgroundColor = getRandomColor();
        bubble.style.left = `${Math.random() * window.innerWidth}px`;
        const bubbleSize = getRandomSize();
        bubble.style.width = `${bubbleSize}px`;
        bubble.style.height = `${bubbleSize}px`;
        bubble.style.borderRadius = '50%'; // Ensures circular shape

        bubble.style.animationDuration = `${getRandomSpeed()}s`;
        bubble.style.animationTimingFunction = 'linear';
        bubble.style.animationIterationCount = '1'; // Only animate once

        bubble.addEventListener('animationend', () => {
            // Remove the bubble when the animation ends
            bubble.remove();
        });

        bubbleContainer.appendChild(bubble);
    }
}

function getRandomColor() {
    return bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
}

function getRandomSpeed() {
    return (Math.random() * (bubbleSpeedRange[1] - bubbleSpeedRange[0]) + bubbleSpeedRange[0]).toFixed(2);
}

function getRandomSize() {
    return Math.floor(Math.random() * (maxBubbleSize - minBubbleSize + 1)) + minBubbleSize;
}

function generateBubbles() {
    createBubble(); // Create an initial bubble
    setInterval(() => {
        createBubble();
    }, 350); // Create a new bubble every 1 second
}

generateBubbles();

