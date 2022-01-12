
//首頁banner swiper
    const swiper2 = new Swiper('.s2', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
    
      });
  //公告swiper
      var swiper = new Swiper(".mySwiper", {
            slidesPerView: 1.5,
            spaceBetween: 5,
            breakpoints:{
                 // when window width is >= 320px
        320: {
          slidesPerView: 1.5,
          spaceBetween: 10
        },
              //when window width is >576px
              576: {
          slidesPerView: 2.3,
          spaceBetween: 10
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 2.7,
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
    slidesPerView: 1.5,
    spaceBetween: 8,
    // Responsive breakpoints
    breakpoints: {
      320: {
        slidesPerView: 1.8,
        spaceBetween: 10
      },
      // when window width is >= 576px
      576: {
        slidesPerView: 2.2,
        spaceBetween: 24
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 3.3,
        spaceBetween: 24
      },
      // when window width is >= 996px
      996: {
        slidesPerView: 3.5,
        spaceBetween: 40
      }
    }
  });
  


  //投稿專區swiper

    
const contributeSwiper = new Swiper(".contributeSwiper", {
  slidesPerView: 1,
  spaceBetween: 15,
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 375px
    375: {
      slidesPerView: 1.3,
      spaceBetween: 15
    },
  // when window width is >= 576px
    576: {
      slidesPerView: 1.7,
      spaceBetween: 16
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 2.3,
      spaceBetween: 18
    },
    // when window width is >= 996px
    996: {
      slidesPerView: 2.7,
      spaceBetween: 22
    }
  }
});



//Axios headers
function getAuthorizationHeader() {
  //  填入自己 ID、KEY 開始
     let AppID = 'c90e7fb7fd154cf9b4856fb906edd27e';
     let AppKey = 'HpHO3DVdPB_6MNKonn5qQF_qkOo';
  //  填入自己 ID、KEY 結束
     let GMTString = new Date().toGMTString();
     let ShaObj = new jsSHA('SHA-1', 'TEXT');
     ShaObj.setHMACKey(AppKey, 'TEXT');
     ShaObj.update('x-date: ' + GMTString);
     let HMAC = ShaObj.getHMAC('B64');
     let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
     return { 'Authorization': Authorization, 'X-Date': GMTString }; 
  }

//關鍵字搜尋(手機版)

const txt = document.querySelector(".txt");
const send = document.querySelector('.send');
send.addEventListener('click' ,function(e){
  const keyWord = txt.value;
  window.location.assign("https://ptsai129.github.io/TaiwanTravel/exploreAttraction.html");
  console.log('yes');
  //const attractionList =  document.querySelector(".attractionList");
  axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?%24filter=contains(ScenicSpotName,'${keyWord}')&%24format=JSON`,
  {
    headers: getAuthorizationHeader()
  }).then(function(response){
    let searchData = response.data;
    let str="";
    searchData.forEach(function(item){
      if(item.Picture.PictureUrl1 == undefined   || item.Class1 == undefined|| item.ScenicSpotName ==undefined){
        return;
      }
       str+=`<li>
       <div class="attractionList-item">
        <a href="page.html?=${item.ScenicSpotID}">
         <img class="attractionList-img" src="${item.Picture.PictureUrl1}" alt="${item.Picture.PictureDescription1}"></a>
         <div class="attractionList-label">
           <h3>${item.Class1}</h3>
         </div>
         <h4>${item.ScenicSpotName}</h4>
       </div>
     </li>`
     })
     attractionList.innerHTML = str;
  }).catch(function(error){
    console.log(error);
  });
})

//關鍵字搜尋(桌機平板)
const searchTxt = document.querySelector(".searchTxt");
const searchSend = document.querySelector('.searchSend');

searchSend.addEventListener('click' ,function(e){
  const keyWord = searchTxt.value;
  window.location.assign("https://ptsai129.github.io/TaiwanTravel/exploreAttraction.html");
  console.log('yes');
  axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?%24filter=contains(ScenicSpotName,'${keyWord}')&%24format=JSON`,
  {
    headers: getAuthorizationHeader()
  }).then(function(response){
    let searchData = response.data;
    let str="";
    searchData.forEach(function(item){
      if(item.Picture.PictureUrl1 == undefined   || item.Class1 == undefined|| item.ScenicSpotName ==undefined){
        return;
      }
       str+=`<li>
       <div class="attractionList-item">
        <a href="page.html?=${item.ScenicSpotID}">
         <img class="attractionList-img" src="${item.Picture.PictureUrl1}" alt="${item.Picture.PictureDescription1}"></a>
         <div class="attractionList-label">
           <h3>${item.Class1}</h3>
         </div>
         <h4>${item.ScenicSpotName}</h4>
       </div>
     </li>`
     })
     attractionList.innerHTML = str;
  }).catch(function(error){
    console.log(error);
  });
})
