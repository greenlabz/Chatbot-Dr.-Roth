// GSAP Animations
gsap.from('#chat-toggle', { scale: 0, duration: 0.5, delay: 0.5, ease: 'back.out(1.7)' });

// Add some styles to main.js messages via JS for simplicity
const style = document.createElement('style');
style.textContent = `
    .msg-user { text-align: right; color: var(--accent); margin: 5px 0; }
    .msg-bot { text-align: left; color: white; margin: 5px 0; }
`;
document.head.appendChild(style);
