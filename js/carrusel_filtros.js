const app = {
    slideIndex: 0,
    slideWidth: 300,
    totalSlides: 0,
    track: null,
  
    init() {
      this.track = document.getElementById("track");
      this.totalSlides = this.track.children.length;
      this.updatePosition();
  
      // Evento para girar las tarjetas (botón "Ver más")
      document.querySelectorAll(".btn-transparente").forEach(btn => {
        btn.addEventListener("click", e => {
          const cardInner = e.target.closest('.flip-card').querySelector('.flip-card-inner');
          cardInner.classList.toggle("flipped");
        });
      });
  
      // Evento para regresar al frente (botón "Regresar")
      document.querySelectorAll(".btn-regresar").forEach(btn => {
        btn.addEventListener("click", e => {
          const cardInner = e.target.closest('.flip-card').querySelector('.flip-card-inner');
          cardInner.classList.remove("flipped");
        });
      });
  
      // Eventos para botones prev y next del carrusel
      document.querySelectorAll('[data-button="button-prev"], [data-button="button-next"]').forEach(btn => {
        btn.addEventListener("click", (e) => this.processingButton(e));
      });
    },
  
    updatePosition() {
      const position = -this.slideIndex * this.slideWidth;
      this.track.style.transform = `translateX(${position}px)`;
    },
  
    processingButton(event) {
      const button = event.currentTarget;
      if (button.dataset.button === "button-next") {
        this.slideIndex++;
        if (this.slideIndex > this.totalSlides - 3) {
          this.slideIndex = 0;
        }
      } else if (button.dataset.button === "button-prev") {
        this.slideIndex--;
        if (this.slideIndex < 0) {
          this.slideIndex = this.totalSlides - 3;
        }
      }
      this.updatePosition();
    }
  };
  
  window.onload = () => {
    app.init();
  };