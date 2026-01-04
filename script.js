// Smooth scrolling untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active navigation link saat scroll
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Animasi untuk elements saat muncul di viewport
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 1s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe semua project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.2}s`;
    observer.observe(card);
});

// Observe info boxes
document.querySelectorAll('.info-box').forEach((box, index) => {
    box.style.opacity = '0';
    box.style.animationDelay = `${index * 0.3}s`;
    observer.observe(box);
});

// Form handling with Formspree
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Animasi submit button
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.background = '#667eea';
        
        try {
            // Send to Formspree
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                submitBtn.textContent = 'Message Sent! ✓';
                submitBtn.style.background = '#38ef7d';
                
                // Reset form
                this.reset();
                
                // Show success message
                alert('Thank you! Your message has been sent successfully. I will get back to you soon!');
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Error handling
            submitBtn.textContent = 'Failed to Send ✗';
            submitBtn.style.background = '#f5576c';
            
            alert('Oops! There was a problem sending your message. Please try again or contact me directly via email.');
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }
    });
}

// Parallax effect untuk home section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const homeSection = document.querySelector('.home-section');
    
    if (homeSection && scrolled < window.innerHeight) {
        homeSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        homeSection.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Animasi typing untuk nama
const nameElement = document.querySelector('.name');
if (nameElement) {
    const originalText = nameElement.innerHTML;
    nameElement.innerHTML = '';
    nameElement.style.opacity = '1';
    
    let charIndex = 0;
    const typingSpeed = 50;
    
    function typeText() {
        if (charIndex < originalText.length) {
            nameElement.innerHTML += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, typingSpeed);
        }
    }
    
    // Mulai typing setelah 500ms
    setTimeout(typeText, 500);
}

// Animasi hover untuk tech icons
const techIcons = document.querySelectorAll('.tech-icon');

techIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.3) rotate(360deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Animasi project cards on hover
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Cursor effect (optional - untuk efek cursor kustom)
let cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Add CSS for custom cursor
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        width: 20px;
        height: 20px;
        border: 2px solid #4285f4;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        opacity: 0.5;
    }
    
    @media (max-width: 768px) {
        .custom-cursor {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Animasi counter untuk statistics (optional)
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Easter egg - konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// Log pesan selamat datang di console
console.log('%c Welcome to My Portfolio! ', 'background: #4285f4; color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c Made with ❤️ by Rayhan Priyonggo', 'color: #34a853; font-size: 14px;');

// Gallery Tab Functionality
const galleryTabs = document.querySelectorAll('.gallery-tab');
const galleryContents = document.querySelectorAll('.gallery-content');

galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        galleryTabs.forEach(t => t.classList.remove('active'));
        galleryContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding content
        const targetTab = tab.getAttribute('data-tab');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Gallery item click animation
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// Game Functions
let currentGame = null;

function openGame(gameType) {
    const modal = document.getElementById('gameModal');
    const container = document.getElementById('gameContainer');
    modal.style.display = 'block';
    
    // Clear previous game
    container.innerHTML = '';
    
    // Stop current game if exists
    if (currentGame && currentGame.stop) {
        currentGame.stop();
    }
    
    // Load selected game
    switch(gameType) {
        case 'snake':
            currentGame = loadSnakeGame(container);
            break;
        case 'flappy':
            currentGame = loadFlappyGame(container);
            break;
        case 'pong':
            currentGame = loadPongGame(container);
            break;
    }
}

function closeGame() {
    const modal = document.getElementById('gameModal');
    modal.style.display = 'none';
    
    // Stop current game
    if (currentGame && currentGame.stop) {
        currentGame.stop();
    }
    currentGame = null;
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('gameModal');
    if (event.target === modal) {
        closeGame();
    }
}

// Snake Game
function loadSnakeGame(container) {
    container.innerHTML = `
        <div class="game-info">🐍 SNAKE GAME</div>
        <div class="game-score">Score: <span id="snakeScore">0</span></div>
        <canvas id="snakeCanvas" width="400" height="400"></canvas>
        <div class="game-controls">Use Arrow Keys or WASD to move | Press SPACE to restart</div>
    `;
    
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('snakeScore');
    
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;
    
    let snake = [{x: 10, y: 10}];
    let food = {x: 15, y: 15};
    let dx = 0;
    let dy = 0;
    let score = 0;
    let gameRunning = true;
    let gameLoop;
    
    function drawGame() {
        if (!gameRunning) return;
        
        // Clear canvas
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Move snake
        if (dx !== 0 || dy !== 0) {
            const head = {x: snake[0].x + dx, y: snake[0].y + dy};
            
            // Check collision with walls
            if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
                gameOver();
                return;
            }
            
            // Check collision with self
            if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
                gameOver();
                return;
            }
            
            snake.unshift(head);
            
            // Check if ate food
            if (head.x === food.x && head.y === food.y) {
                score++;
                scoreElement.textContent = score;
                placeFood();
            } else {
                snake.pop();
            }
        }
        
        // Draw snake
        snake.forEach((segment, index) => {
            const gradient = ctx.createLinearGradient(
                segment.x * gridSize, segment.y * gridSize,
                segment.x * gridSize + gridSize, segment.y * gridSize + gridSize
            );
            gradient.addColorStop(0, '#38ef7d');
            gradient.addColorStop(1, '#11998e');
            ctx.fillStyle = gradient;
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
            
            if (index === 0) {
                // Draw eyes
                ctx.fillStyle = '#fff';
                ctx.fillRect(segment.x * gridSize + 5, segment.y * gridSize + 5, 3, 3);
                ctx.fillRect(segment.x * gridSize + 12, segment.y * gridSize + 5, 3, 3);
            }
        });
        
        // Draw food
        ctx.fillStyle = '#f5576c';
        ctx.beginPath();
        ctx.arc(food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2, gridSize/2 - 2, 0, Math.PI * 2);
        ctx.fill();
    }
    
    function placeFood() {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        
        // Make sure food doesn't spawn on snake
        if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
            placeFood();
        }
    }
    
    function gameOver() {
        gameRunning = false;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', canvas.width/2, canvas.height/2);
        ctx.font = '20px Arial';
        ctx.fillText('Press SPACE to restart', canvas.width/2, canvas.height/2 + 40);
    }
    
    function resetGame() {
        snake = [{x: 10, y: 10}];
        dx = 0;
        dy = 0;
        score = 0;
        scoreElement.textContent = score;
        gameRunning = true;
        placeFood();
    }
    
    document.addEventListener('keydown', function snakeKeyHandler(e) {
        if (e.code === 'Space' && !gameRunning) {
            resetGame();
            return;
        }
        
        if (!gameRunning) return;
        
        switch(e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                if (dy === 0) { dx = 0; dy = -1; }
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                if (dy === 0) { dx = 0; dy = 1; }
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                if (dx === 0) { dx = -1; dy = 0; }
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                if (dx === 0) { dx = 1; dy = 0; }
                break;
        }
    });
    
    gameLoop = setInterval(drawGame, 100);
    
    return {
        stop: () => {
            clearInterval(gameLoop);
            gameRunning = false;
        }
    };
}

// Flappy Bird Game
function loadFlappyGame(container) {
    container.innerHTML = `
        <div class="game-info">🐦 FLAPPY BIRD</div>
        <div class="game-score">Score: <span id="flappyScore">0</span></div>
        <canvas id="flappyCanvas" width="400" height="600"></canvas>
        <div class="game-controls">Press SPACE or Click to Flap</div>
    `;
    
    const canvas = document.getElementById('flappyCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('flappyScore');
    
    let bird = {
        x: 50,
        y: canvas.height / 2,
        velocity: 0,
        radius: 15
    };
    
    let pipes = [];
    let score = 0;
    let gameRunning = true;
    let gameLoop;
    let frameCount = 0;
    
    const gravity = 0.5;
    const jump = -8;
    const pipeWidth = 60;
    const pipeGap = 150;
    
    function drawBird() {
        const gradient = ctx.createRadialGradient(bird.x, bird.y, 0, bird.x, bird.y, bird.radius);
        gradient.addColorStop(0, '#764ba2');
        gradient.addColorStop(1, '#667eea');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Eye
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(bird.x + 5, bird.y - 3, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(bird.x + 6, bird.y - 3, 2, 0, Math.PI * 2);
        ctx.fill();
    }
    
    function drawPipes() {
        pipes.forEach(pipe => {
            const gradient = ctx.createLinearGradient(pipe.x, 0, pipe.x + pipeWidth, 0);
            gradient.addColorStop(0, '#38ef7d');
            gradient.addColorStop(1, '#11998e');
            ctx.fillStyle = gradient;
            ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
            ctx.fillRect(pipe.x, pipe.bottom, pipeWidth, canvas.height - pipe.bottom);
        });
    }
    
    function updateGame() {
        if (!gameRunning) return;
        
        frameCount++;
        
        // Clear canvas
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update bird
        bird.velocity += gravity;
        bird.y += bird.velocity;
        
        // Check collision with ground/ceiling
        if (bird.y + bird.radius > canvas.height || bird.y - bird.radius < 0) {
            gameOver();
            return;
        }
        
        // Add new pipes
        if (frameCount % 90 === 0) {
            const topHeight = Math.random() * (canvas.height - pipeGap - 100) + 50;
            pipes.push({
                x: canvas.width,
                top: topHeight,
                bottom: topHeight + pipeGap,
                scored: false
            });
        }
        
        // Update and draw pipes
        pipes.forEach((pipe, index) => {
            pipe.x -= 3;
            
            // Check collision
            if (bird.x + bird.radius > pipe.x && bird.x - bird.radius < pipe.x + pipeWidth) {
                if (bird.y - bird.radius < pipe.top || bird.y + bird.radius > pipe.bottom) {
                    gameOver();
                    return;
                }
            }
            
            // Score
            if (!pipe.scored && bird.x > pipe.x + pipeWidth) {
                pipe.scored = true;
                score++;
                scoreElement.textContent = score;
            }
            
            // Remove off-screen pipes
            if (pipe.x + pipeWidth < 0) {
                pipes.splice(index, 1);
            }
        });
        
        drawPipes();
        drawBird();
    }
    
    function gameOver() {
        gameRunning = false;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', canvas.width/2, canvas.height/2);
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, canvas.width/2, canvas.height/2 + 40);
    }
    
    function flap() {
        if (gameRunning) {
            bird.velocity = jump;
        }
    }
    
    function handleKeyPress(e) {
        if (e.code === 'Space') {
            e.preventDefault();
            flap();
        }
    }
    
    canvas.addEventListener('click', flap);
    document.addEventListener('keydown', handleKeyPress);
    
    gameLoop = setInterval(updateGame, 1000/60);
    
    return {
        stop: () => {
            clearInterval(gameLoop);
            gameRunning = false;
            canvas.removeEventListener('click', flap);
            document.removeEventListener('keydown', handleKeyPress);
        }
    };
}

// Pong Game
function loadPongGame(container) {
    container.innerHTML = `
        <div class="game-info">🏓 PONG GAME</div>
        <div class="game-score">Player: <span id="playerScore">0</span> | AI: <span id="aiScore">0</span></div>
        <canvas id="pongCanvas" width="600" height="400"></canvas>
        <div class="game-controls">Use W/S or Arrow Up/Down to move</div>
    `;
    
    const canvas = document.getElementById('pongCanvas');
    const ctx = canvas.getContext('2d');
    const playerScoreElement = document.getElementById('playerScore');
    const aiScoreElement = document.getElementById('aiScore');
    
    const paddleWidth = 10;
    const paddleHeight = 80;
    const ballSize = 10;
    
    let player = {
        x: 20,
        y: canvas.height / 2 - paddleHeight / 2,
        score: 0,
        dy: 0
    };
    
    let ai = {
        x: canvas.width - 30,
        y: canvas.height / 2 - paddleHeight / 2,
        score: 0
    };
    
    let ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        dx: 4,
        dy: 4
    };
    
    let gameRunning = true;
    let gameLoop;
    let keys = {};
    
    function drawPaddle(x, y) {
        const gradient = ctx.createLinearGradient(x, y, x + paddleWidth, y + paddleHeight);
        gradient.addColorStop(0, '#f093fb');
        gradient.addColorStop(1, '#f5576c');
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, paddleWidth, paddleHeight);
    }
    
    function drawBall() {
        const gradient = ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, ballSize);
        gradient.addColorStop(0, '#fff');
        gradient.addColorStop(1, '#667eea');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ballSize, 0, Math.PI * 2);
        ctx.fill();
    }
    
    function updateGame() {
        if (!gameRunning) return;
        
        // Clear canvas
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw center line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.setLineDash([10, 10]);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Update player
        if (keys['w'] || keys['ArrowUp']) {
            player.y = Math.max(0, player.y - 6);
        }
        if (keys['s'] || keys['ArrowDown']) {
            player.y = Math.min(canvas.height - paddleHeight, player.y + 6);
        }
        
        // Update AI
        const aiCenter = ai.y + paddleHeight / 2;
        if (aiCenter < ball.y - 20) {
            ai.y = Math.min(canvas.height - paddleHeight, ai.y + 4);
        } else if (aiCenter > ball.y + 20) {
            ai.y = Math.max(0, ai.y - 4);
        }
        
        // Update ball
        ball.x += ball.dx;
        ball.y += ball.dy;
        
        // Ball collision with top/bottom
        if (ball.y - ballSize < 0 || ball.y + ballSize > canvas.height) {
            ball.dy *= -1;
        }
        
        // Ball collision with paddles
        if (ball.x - ballSize < player.x + paddleWidth &&
            ball.y > player.y && ball.y < player.y + paddleHeight) {
            ball.dx = Math.abs(ball.dx);
            ball.dx *= 1.05;
        }
        
        if (ball.x + ballSize > ai.x &&
            ball.y > ai.y && ball.y < ai.y + paddleHeight) {
            ball.dx = -Math.abs(ball.dx);
            ball.dx *= 1.05;
        }
        
        // Score
        if (ball.x < 0) {
            ai.score++;
            aiScoreElement.textContent = ai.score;
            resetBall();
        }
        if (ball.x > canvas.width) {
            player.score++;
            playerScoreElement.textContent = player.score;
            resetBall();
        }
        
        drawPaddle(player.x, player.y);
        drawPaddle(ai.x, ai.y);
        drawBall();
    }
    
    function resetBall() {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = (Math.random() > 0.5 ? 1 : -1) * 4;
        ball.dy = (Math.random() > 0.5 ? 1 : -1) * 4;
    }
    
    function handleKeyDown(e) {
        keys[e.key] = true;
    }
    
    function handleKeyUp(e) {
        keys[e.key] = false;
    }
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    gameLoop = setInterval(updateGame, 1000/60);
    
    return {
        stop: () => {
            clearInterval(gameLoop);
            gameRunning = false;
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }
    };
}