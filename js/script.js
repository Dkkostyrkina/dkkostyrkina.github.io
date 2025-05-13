document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-item');
    const slideCount = slides.length;
    const slideWidth = 983 + 30; // ширина слайда + отступ

  
    let currentIndex = 0;
    let isTransitioning = false;
  
    // Клонируем первый слайд и добавляем его в конец
    const firstClone = slides[0].cloneNode(true);
    track.appendChild(firstClone);
  
    function moveToSlide(index, animated = true) {
        if (!animated) {
          track.style.transition = 'none';
        } else {
          track.style.transition = 'transform 1s ease-in-out';
        }
      
        // Центрируем слайд: вычисляем сдвиг так, чтобы он оказался в середине .carousel
        const offset = (slideWidth * index) - ((1200 - slideWidth) / 2);
        track.style.transform = `translateX(-${offset}px)`;
      }
      
  
    function autoSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex++;
  
      moveToSlide(currentIndex);
  
      // Когда доходим до клона, быстро вернёмся к 0
      if (currentIndex === slideCount) {
        setTimeout(() => {
          currentIndex = 0;
          moveToSlide(currentIndex, false); // без анимации
          isTransitioning = false;
        }, 1000); // совпадает с transition: 1s
      } else {
        setTimeout(() => {
          isTransitioning = false;
        }, 1000);
      }
    }
  
    setInterval(autoSlide, 5000);
  });
  