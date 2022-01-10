
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


//人氣景點探索按鈕swiper

const categoryBtnSwiper = new Swiper(".categoryBtn-swiper", {
  slidesPerView: 2.5,
  spaceBetween: 15,
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 375px
    375: {
      slidesPerView: 3.4,
      spaceBetween: 30
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

//初始化
function init(){
  getAttractions();
}
init();

//預設狀態 顯示所有旅遊景點資料
function getAttractions(){
  axios.get(
    'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?%24top=30&%24format=JSON',
    {
       headers: getAuthorizationHeader()
    }
  )
  .then(function (response) {
   let attractionData = response.data;
   let str ="";
   attractionData.forEach(function(item){
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
   document.querySelector(".attractionList").innerHTML = str;
  })
  .catch(function (error) {
   console.log(error);
  }); 
  }
  
   
//選擇縣市後再點擊按鈕取得資料

const selectGroup = document.querySelector('.selectGroup');
const selectGroupMobile = document.querySelector('.selectGroup-mobile');
const selectCity = document.querySelector(".areaList");
selectGroup.addEventListener('click',function(e){
  if(e.target.getAttribute("data-type") != 'allAttraction'){
         return;
       }else{
         
        let city = selectCity.value;
        if (city == "選取地區"){
          getAttractions();
          return;
        }
        axios.get(
          `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${city}?%24top=300&%24format=JSON`,
          {
             headers: getAuthorizationHeader()
          }
        )
        .then(function (response) {
         let cityAttractionData = response.data;
         let str ="";
         cityAttractionData.forEach(function(item){
          if(item.Picture.PictureUrl1 == undefined)
          {  
            item.Picture.PictureUrl1 = 'img/taiwantravelimg.png';
            
          }else if(item.Picture.PictureDescription1 == undefined){
            item.Picture.PictureDescription1 = '景點示意圖';
          }
           str+=`<li>
           <div class="attractionList-item">
           <a href="page.html?=${item.ScenicSpotID}">
             <img class="attractionList-img" src="${item.Picture.PictureUrl1}" alt="${item.Picture.PictureDescription1}"></a>
             <div class="attractionList-label">
               <h3>${item.City}</h3>
             </div>
             <h4>${item.ScenicSpotName}</h4>
           </div>
         </li>`
         })
         document.querySelector(".attractionList").innerHTML = str;
        })
        .catch(function (error) {
         console.log(error);
        });       

       }
})


selectGroupMobile.addEventListener('click',function(e){
  if(e.target.getAttribute("data-type") != 'allAttraction'){
         return;
       }else{
       
        let city = selectCity.value;
        if (city == "選取地區"){
          return;
        }
        axios.get(
          `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${city}?%24top=300&%24format=JSON`,
          {
             headers: getAuthorizationHeader()
          }
        )
        .then(function (response) {
         let cityAttractionData = response.data;
         let str ="";
         cityAttractionData.forEach(function(item){
         
          if(item.Picture.PictureUrl1 == undefined)
          {  
            item.Picture.PictureUrl1 = 'img/taiwantravelimg.png';
            
          }else if(item.Picture.PictureDescription1 == undefined){
            item.Picture.PictureDescription1 = '景點示意圖';
          }
           str+=`<li>
           <div class="attractionList-item">
           <a href="page.html?=${item.ScenicSpotID}">
             <img class="attractionList-img" src="${item.Picture.PictureUrl1}" alt="${item.Picture.PictureDescription1}"></a>
             <div class="attractionList-label">
               <h3>${item.City}</h3>
             </div>
             <h4>${item.ScenicSpotName}</h4>
           </div>
         </li>`
         })
         document.querySelector(".attractionList").innerHTML = str;
        })
        .catch(function (error) {
         console.log(error);
        });       

       }
})


//篩選出有哪些旅遊類別
// let tourTypes = {};
// function getTourType(){
//   axios.get(
//     `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?%24format=JSON`,
//     {
//       headers: getAuthorizationHeader()
//     }
//   ).then(function (response){
//    const thisData = response.data;
//    thisData.forEach(function (item){
//      if(tourTypes[item.Class1] == undefined){
//        tourTypes[item.Class1]=1;
//      }else{
//        tourTypes[item.Class1] +=1;
//      }
//    })
//    console.log(tourTypes);
//   })
// }
//getTourType();


//依據選取類別顯示資料(觀光餐飲)
selectGroup.addEventListener('click',function(e){
  if(e.target.getAttribute("data-type") != 'foodAttraction'){
         return;
       }else{
        
        let city = selectCity.value;
        if (city == "選取地區"){
          return;
        }
        axios.get(
          `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/${city}?%24top=30&%24format=JSON`,
          {
             headers: getAuthorizationHeader()
          }
        )
        .then(function (response) {
         let foodAttractionData = response.data;
         let str ="";
         foodAttractionData.forEach(function(item){
          if(item.Picture.PictureUrl1 == undefined ){
            item.Picture.PictureUrl1 = 'img/taiwannight.png';
          }else if (item.Picture.PictureDescription1 == undefined){
            item.Picture.PictureDescription1 = '餐廳示意圖';
          }
           str+=`<li>
           <div class="attractionList-item">
           <a href="page.html?=${item.RestaurantID}">
             <img class="attractionList-img" src="${item.Picture.PictureUrl1}" alt="${item.Picture.PictureDescription1}"></a>
             <div class="attractionList-label">
               <h3>${item.City}</h3>
             </div>
             <h4>${item.RestaurantName}</h4>
           </div>
         </li>`
         })
         document.querySelector(".attractionList").innerHTML = str;
        })
        .catch(function (error) {
         console.log(error);
        });       

       }
})

selectGroupMobile.addEventListener('click',function(e){
  if(e.target.getAttribute("data-type") != 'foodAttraction'){
         return;
       }else{
        
        let city = selectCity.value;
        if (city == "選取地區"){
          return;
        }
        axios.get(
          `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/${city}?%24format=JSON`,
          {
             headers: getAuthorizationHeader()
          }
        )
        .then(function (response) {
         let foodAttractionData = response.data;
         let str ="";
         foodAttractionData.forEach(function(item){
          if(item.Picture.PictureUrl1 == undefined ){
            item.Picture.PictureUrl1 = 'img/taiwannight.png';
          }else if (item.Picture.PictureDescription1 == undefined){
            item.Picture.PictureDescription1 = '餐廳示意圖';
          }
           str+=`<li>
           <div class="attractionList-item">
             <img class="attractionList-img" src="${item.Picture.PictureUrl1}" alt="${item.Picture.PictureDescription1}">
             <div class="attractionList-label">
               <h3>${item.City}</h3>
             </div>
             <h4>${item.RestaurantName}</h4>
           </div>
         </li>`
         })
         document.querySelector(".attractionList").innerHTML = str;
        })
        .catch(function (error) {
         console.log(error);
        });       

       }
})


//依據選取類別顯示資料(觀光旅宿)
selectGroup.addEventListener('click',function(e){
  if(e.target.getAttribute("data-type") != 'hotelAttraction'){
         return;
       }else{
        
        let city = selectCity.value;
        if (city == "選取地區"){
          return;
        }
        axios.get(
         
          `https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel/${city}?%24format=JSON`,
          {
             headers: getAuthorizationHeader()
          }
        )
        .then(function (response) {
         let hotelAttractionData = response.data;
         let str ="";
         hotelAttractionData.forEach(function(item){
          if(item.Picture.PictureUrl1 == undefined)
          {  
            item.Picture.PictureUrl1 = 'img/hotelimg.png';
            
          }else if(item.Picture.PictureDescription1 == undefined){
            item.Picture.PictureDescription1 = '旅館示意圖';
          }
           str+=`<li>
           <div class="attractionList-item">
           <a href="page.html?=${item.HotelID}">
             <img class="attractionList-img" src="${item.Picture.PictureUrl1}" alt="${item.Picture.PictureDescription1}"></a>
             <div class="attractionList-label">
               <h3>${item.City}</h3>
             </div>
             <h4>${item.HotelName}</h4>
           </div>
         </li>`
         })
         document.querySelector(".attractionList").innerHTML = str;
        })
        .catch(function (error) {
         console.log(error);
        });       

       }
})



selectGroupMobile.addEventListener('click',function(e){
  if(e.target.getAttribute("data-type") != 'hotelAttraction'){
         return;
       }else{
        
        let city = selectCity.value;
        if (city == "選取地區"){
          return;
        }
        axios.get(
         
          `https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel/${city}?%24format=JSON`,
          {
             headers: getAuthorizationHeader()
          }
        )
        .then(function (response) {
         let hotelAttractionData = response.data;
         let str ="";
         hotelAttractionData.forEach(function(item){
          if(item.Picture.PictureUrl1 == undefined)
          {  
            item.Picture.PictureUrl1 = 'img/hotelimg.png';
            
          }else if(item.Picture.PictureDescription1 == undefined){
            item.Picture.PictureDescription1 = '旅館示意圖';
          }
           str+=`<li>
           <div class="attractionList-item">
           <a href="page.html?=${item.HotelID}">
             <img class="attractionList-img" src="${item.Picture.PictureUrl1}" alt="${item.Picture.PictureDescription1}"></a>
             <div class="attractionList-label">
               <h3>${item.City}</h3>
             </div>
             <h4>${item.HotelName}</h4>
           </div>
         </li>`
         })
         document.querySelector(".attractionList").innerHTML = str;
        })
        .catch(function (error) {
         console.log(error);
        });       

       }
})


//依據選取類別顯示資料(觀光活動)
selectGroup.addEventListener('click',function(e){
  if(e.target.getAttribute("data-type") != 'travelActivity'){
         return;
       }else{
        
        let city = selectCity.value;
        if (city == "選取地區"){
          return;
        }
        axios.get(
          `https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity/${city}?%24format=JSON`,
          {
             headers: getAuthorizationHeader()
          }
        )
        .then(function (response) {
         let travelActivityData = response.data;
         let str ="";
         travelActivityData.forEach(function(item){
          if(item.Picture.PictureUrl1 == undefined || item.Picture.PictureUrl2 == undefined || item.Picture.PictureUrl3 == undefined){
            return;
          }
         
           str+=`<li>
           <div class="attractionList-item">
           <a href="page.html?=${item.ActivityID}">
             <img class="attractionList-img" src="${item.Picture.PictureUrl1}" alt="${item.Picture.PictureDescription1}"></a>
             <div class="attractionList-label">
               <h3>${item.City}</h3>
             </div>
             <h4>${item.ActivityName}</h4>
           </div>
         </li>`
         })
         document.querySelector(".attractionList").innerHTML = str;
        })
        .catch(function (error) {
         console.log(error);
        });       

       }
})

selectGroupMobile.addEventListener('click',function(e){
  if(e.target.getAttribute("data-type") != 'travelActivity'){
         return;
       }else{
        
        let city = selectCity.value;
        if (city == "選取地區"){
          return;
        }
        axios.get(
          `https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity/${city}?%24format=JSON`,
          {
             headers: getAuthorizationHeader()
          }
        )
        .then(function (response) {
         let travelActivityData = response.data;
         let str ="";
         travelActivityData.forEach(function(item){
          if(item.Picture.PictureUrl1 == undefined || item.Picture.PictureUrl2 == undefined || item.Picture.PictureUrl3 == undefined){
            return;
          }
         
           str+=`<li>
           <div class="attractionList-item">
           <a href="page.html?=${item.ActivityID}">
             <img class="attractionList-img" src="${item.Picture.PictureUrl1}" alt="${item.Picture.PictureDescription1}"></a>
             <div class="attractionList-label">
               <h3>${item.City}</h3>
             </div>
             <h4>${item.ActivityName}</h4>
           </div>
         </li>`
         })
         document.querySelector(".attractionList").innerHTML = str;
        })
        .catch(function (error) {
         console.log(error);
        });       

       }
})








