//首頁banner swiper
    const swiper2 = new Swiper('.s2', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
    
      });
      var swiper = new Swiper(".mySwiper", {
            slidesPerView: 1.5,
            spaceBetween: 5,
            breakpoints:{
                 // when window width is >= 320px
        320: {
          slidesPerView: 1.7,
          spaceBetween: 10
        },
              //when window width is >576px
              576: {
          slidesPerView: 2.2,
          spaceBetween: 15
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 2.5,
          spaceBetween: 5
        },
        // when window width is >= 996px
        996: {
          slidesPerView: 3.5,
          spaceBetween: 20
        }
         },
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
          });

//人氣景點探索 swiper 

  
const atttractionSwiper = new Swiper(".atttractionSwiper", {
    slidesPerView: 1.7,
    spaceBetween: 16,
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 576px
      576: {
        slidesPerView: 2.7,
        spaceBetween: 20
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 3,
        spaceBetween: 24
      },
      // when window width is >= 996px
      996: {
        slidesPerView: 3.5,
        spaceBetween: 40
      }
    }
  });
  