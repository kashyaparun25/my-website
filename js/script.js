/*
   Portfolio Logic - Modern & Enhanced
   Author: Arun Kashyap
*/

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    initSmoothScroll();
    initScrollAnimations();
    initTypingEffect();
    initChatbot();
    initScrollToTop();
    initNavHighlight();
    initParallax();
});

/* --- Mobile Navigation --- */
function initMobileNav() {
    const toggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.getElementById('main-nav');

    if (!toggle || !nav) return;

    const navLinks = nav.querySelectorAll('a');

    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        document.body.classList.toggle('nav-open');
        const isOpen = nav.classList.contains('active');
        toggle.innerHTML = isOpen
            ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            document.body.classList.remove('nav-open');
            toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
        });
    });
}

/* --- Theme Management --- */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('theme');

    // Dark mode is the default - only switch to light if explicitly saved
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        updateThemeIcon(true);
    } else {
        // Default to dark mode
        document.body.classList.remove('light-mode');
        updateThemeIcon(false);
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateThemeIcon(isLight);
    });
}

function updateThemeIcon(isLight) {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    if (isLight) {
        themeToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
    } else {
        themeToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41-1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
    }
}

/* --- Typing Effect for Hero --- */
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const phrases = [
        'intelligent AI agents',
        'RAG-powered systems',
        'multi-agent workflows',
        'GenAI solutions',
        'data-driven products'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2500; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400; // Pause before next phrase
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* --- Scroll Animations --- */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Stagger children animations
                const children = entry.target.querySelectorAll('.stagger-item');
                children.forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                    child.classList.add('animate-in');
                });
            }
        });
    }, observerOptions);

    // Observe sections and cards
    document.querySelectorAll('.section-padding, .card, .timeline-item, .hero-text, .hero-image').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Add stagger class to skill tags and project tech
    document.querySelectorAll('.skill-tag, .project-tech span').forEach(el => {
        el.classList.add('stagger-item');
    });
}

/* --- Navigation Highlight on Scroll --- */
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    function highlightNav() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
    highlightNav();
}

/* --- Smooth Scroll --- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* --- Parallax Effect --- */
function initParallax() {
    const hero = document.querySelector('#hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = hero.querySelector('.hero-image');
        if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
}

/* --- Scroll to Top Button --- */
function initScrollToTop() {
    // Create button
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`;
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);

    // Show/hide based on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* --- Enhanced Chatbot --- */
function initChatbot() {
    const toggle = document.getElementById('chatbot-toggle');
    const chatWindow = document.getElementById('chatbot-window');
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const messages = document.getElementById('chat-messages');

    if (!toggle || !chatWindow) return;

    // Portfolio data for responses
    const portfolioData = {
        skills: ['Python', 'TensorFlow', 'PyTorch', 'LangChain', 'CrewAI', 'RAG', 'AWS', 'Azure', 'FastAPI', 'Streamlit'],
        projects: [
            { name: 'Campus Calm AI', tech: 'Azure AI, RAG, FastAPI', desc: 'Mental wellness AI companion' },
            { name: 'Design Thinking AI Agents', tech: 'CrewAI, LangChain', desc: 'Multi-agent design thinking system' },
            { name: 'Case Analysis Suite', tech: 'GenAI, Python', desc: 'Automated case study analyzer' },
            { name: 'Simulated Board Discussion', tech: 'CrewAI, Firecrawl', desc: 'AI-powered board simulation' }
        ],
        experience: 'Graduate Student Assistant at Stevens Institute, Product Analyst at BlueTree, IoT Intern at Invicto',
        education: "Master's from Stevens Institute of Technology",
        contact: 'hvarunkashyap@gmail.com'
    };

    toggle.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
        if (chatWindow.classList.contains('open')) {
            toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
            setTimeout(() => input.focus(), 300);
        } else {
            toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`;
        }
    });

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `chat-message ${sender}`;
        div.innerHTML = text;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function generateResponse(query) {
        const q = query.toLowerCase();

        if (q.includes('skill') || q.includes('tech') || q.includes('know')) {
            return `Arun is skilled in: <strong>${portfolioData.skills.join(', ')}</strong>. He specializes in AI/ML, Multi-Agent Systems, and RAG pipelines.`;
        }
        if (q.includes('project') || q.includes('work') || q.includes('built')) {
            const projectList = portfolioData.projects.map(p => `<strong>${p.name}</strong> - ${p.desc}`).join('<br>');
            return `Here are Arun's featured projects:<br>${projectList}`;
        }
        if (q.includes('experience') || q.includes('job') || q.includes('career')) {
            return `Arun's experience includes: ${portfolioData.experience}. He focuses on AI development and data science.`;
        }
        if (q.includes('education') || q.includes('study') || q.includes('degree')) {
            return `Arun holds a ${portfolioData.education}, specializing in Data Science and AI.`;
        }
        if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire')) {
            return `You can reach Arun at <strong>${portfolioData.contact}</strong> or connect on LinkedIn/GitHub using the links in the Contact section.`;
        }
        if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
            return `Hello! I'm here to help you learn about Arun's work. Ask me about his <strong>skills</strong>, <strong>projects</strong>, <strong>experience</strong>, or <strong>contact info</strong>!`;
        }

        return `I can tell you about Arun's <strong>skills</strong>, <strong>projects</strong>, <strong>experience</strong>, <strong>education</strong>, or <strong>contact info</strong>. What would you like to know?`;
    }

    function handleSend() {
        const text = input.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        input.value = '';

        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot typing';
        typingDiv.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
        messages.appendChild(typingDiv);
        messages.scrollTop = messages.scrollHeight;

        setTimeout(() => {
            typingDiv.remove();
            addMessage(generateResponse(text), 'bot');
        }, 800);
    }

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
}

/* --- Project Expansion --- */
window.expandProject = async function (btn, projectId, title, description) {
    const card = btn.closest('.project-card');
    let expandedDiv = document.getElementById(`expanded-${projectId}`);

    if (expandedDiv) {
        expandedDiv.classList.add('closing');
        setTimeout(() => {
            expandedDiv.remove();
        }, 300);
        btn.textContent = 'Expand Details';
        return;
    }

    btn.innerHTML = '<span class="loading-spinner"></span> Loading...';
    btn.disabled = true;

    try {
        await new Promise(r => setTimeout(r, 800));

        const expandedContent = document.createElement('div');
        expandedContent.id = `expanded-${projectId}`;
        expandedContent.className = 'project-expanded';
        expandedContent.innerHTML = `
            <div class="expanded-header">
                <span class="expanded-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>
                </span>
                <h4>Deep Dive: ${title}</h4>
            </div>
            <p>${description}</p>
            <p class="expanded-highlight">This project showcases expertise in modern AI architecture, cloud deployment, and user-centric design principles.</p>
        `;

        card.appendChild(expandedContent);
        btn.textContent = 'Close Details';
    } catch (e) {
        console.error(e);
        btn.textContent = 'Error - Try Again';
    } finally {
        btn.disabled = false;
    }
};
