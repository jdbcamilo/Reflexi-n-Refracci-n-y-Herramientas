document.addEventListener("DOMContentLoaded", function () {
  const isMobileOrTablet = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const lastDismissed = localStorage.getItem("mobileModalDismissedAt");
  const now = new Date().getTime();
  const oneDay = 24 * 60 * 60 * 1000;

  if (isMobileOrTablet && (!lastDismissed || now - lastDismissed > oneDay)) {
    const modal = document.createElement("div");
    modal.id = "mobileWarningModal";

    modal.innerHTML = `
      <div id="mobileWarningContent">
        <div class="warning-icon">⚠</div>
        <h2>Advertencia</h2>
        <p>Está accediendo desde un dispositivo móvil o tablet.<br>
        Le recomendamos activar el <strong>modo escritorio</strong> en su navegador para una correcta visualización.</p>
        <button id="mobileWarningClose">Cerrar</button>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("mobileWarningClose").onclick = () => {
      modal.remove();
      localStorage.setItem("mobileModalDismissedAt", new Date().getTime());
    };
  }
});
  
  // Crear partículas de fondo
        function createParticles() {
            const container = document.getElementById('particles');
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Tamaño y posición aleatorios
                const size = Math.random() * 120 + 30;
                const posX = Math.random() * 100;
                const posY = Math.random() * 100 + 100;
                const delay = Math.random() * 15;
                
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}%`;
                particle.style.top = `${posY}%`;
                particle.style.animationDelay = `${delay}s`;
                
                container.appendChild(particle);
            }
        }
        
        // Navegación entre slides
        const slidesContainer = document.querySelector('.slides-container');
        const slides = document.querySelectorAll('.slide');
        const navDots = document.querySelectorAll('.nav-dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        // Actualizar navegación
        function updateNavigation() {
            // Actualizar puntos
            navDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
            
            // Mover contenedor de slides
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}vw)`;
            
            // Animación para el contenido de la slide actual
            setTimeout(() => {
                animateSlideContent();
            }, 300);
        }
        
        // Animación para el contenido de la slide actual
        function animateSlideContent() {
            // Animación para portada
            if (currentSlide === 0) {
                document.getElementById('main-title').classList.add('animate-in');
                document.getElementById('main-subtitle').classList.add('animate-in');
            }
            
            // Animación para las cards
            const cards = slides[currentSlide].querySelectorAll('.card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate-in');
                }, index * 200);
            });
            
            // Animación para las diferencias
            const diffCards = slides[currentSlide].querySelectorAll('.difference-card');
            diffCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate-in');
                }, index * 200);
            });
            
            // Animación para la simulación
            const simSection = slides[currentSlide].querySelector('.simulation-section');
            if (simSection) {
                setTimeout(() => {
                    simSection.classList.add('animate-in');
                }, 300);
            }
            
            // Animación para la conclusión
            const conclusion = slides[currentSlide].querySelector('.conclusion');
            if (conclusion) {
                setTimeout(() => {
                    conclusion.classList.add('animate-in');
                }, 300);
            }
        }
        
        // Navegar a slide específica
        function goToSlide(slideIndex) {
            if (slideIndex >= 0 && slideIndex < totalSlides) {
                currentSlide = slideIndex;
                updateNavigation();
            }
        }
        
        // Navegación con puntos
        navDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const slideIndex = parseInt(dot.getAttribute('data-slide'));
                goToSlide(slideIndex);
            });
        });
        
        // Botones anterior/siguiente
        prevBtn.addEventListener('click', () => {
            if (currentSlide > 0) {
                goToSlide(currentSlide - 1);
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentSlide < totalSlides - 1) {
                goToSlide(currentSlide + 1);
            }
        });
        
        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                if (currentSlide > 0) {
                    goToSlide(currentSlide - 1);
                }
            } else if (e.key === 'ArrowRight') {
                if (currentSlide < totalSlides - 1) {
                    goToSlide(currentSlide + 1);
                }
            }
        });
        
        // Inicializar
        createParticles();
        updateNavigation();
        
        // Observador de intersección para animaciones
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Observar elementos para animaciones
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });