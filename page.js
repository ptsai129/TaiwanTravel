const id = location.href.split("=")[1];
const attractionContent = document.querySelector('.pageContent');

//判斷取得id是屬於什麼類別
const allType = "C1";
const RestaurantType ="C3";
const HotelType = "C4";
const activityType ="C2"
function initPage(){
if (id.includes(allType) === true){
    getAttractionContent();
}else if(id.includes(RestaurantType) === true){
    getFoodAttractionContent();
}else if(id.includes(HotelType) === true){
    getHotelAttractionContent();
}else if (id.includes(activityType) === true){
    getActivityContent();
}
}

initPage();



//全部景點分頁
function getAttractionContent(){
    axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?%24top=30&%24format=JSON&$filter=contains(ScenicSpotID,'${id}')`,
    {
        headers: getAuthorizationHeader()
      })
    .then(
        function(response){
            let contentData = response.data[0];
            if(contentData.Picture.PictureUrl1 == undefined){
                contentData.Picture.PictureUrl1 = 'img/taiwantravelimg.png';
            }else if (contentData.Picture.PictureDescription1 == undefined){
                contentData.Picture.PictureDescription1 = '景點示意圖';
            }
            document.querySelector(".js-breadcrumbs").textContent = contentData.ScenicSpotName;
            document.querySelector(".js-title").textContent = contentData.ScenicSpotName;
            document.querySelector(".js-img").setAttribute("src", contentData.Picture.PictureUrl1);
            document.querySelector(".js-img").setAttribute("alt", contentData.Picture.PictureDescription1);
            document.querySelector(".js-description").textContent = contentData.DescriptionDetail;
            document.querySelector(".js-address").innerHTML = `<p class="js-address pageContent-txt">地址:${contentData.Address}</p>`;

        })
}


//品味美食分頁
function getFoodAttractionContent(){
    axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?%24format=JSON&$filter=contains(RestaurantID,'${id}')`,
    {
        headers: getAuthorizationHeader()
      })
    .then(
        function(response){
            let foodData = response.data[0];
            if(foodData.Picture.PictureUrl1 == undefined){
                foodData.Picture.PictureUrl1 = 'img/taiwannight.png';
            }else if (foodData.Picture.PictureDescription1 == undefined){
                foodData.Picture.PictureDescription1 = '餐廳示意圖';
            }
            document.querySelector(".js-breadcrumbs").textContent = foodData.RestaurantName;
            document.querySelector(".js-title").textContent = foodData.RestaurantName;
            document.querySelector(".js-img").setAttribute("src", foodData.Picture.PictureUrl1);
            document.querySelector(".js-img").setAttribute("alt", foodData.Picture.PictureDescription1);
            document.querySelector(".js-description").textContent = foodData.Description;
            document.querySelector(".js-address").innerHTML = `<p class="js-address pageContent-txt">地址:${foodData.Address}</p>`;
        })

}



//質感住宿分頁
function getHotelAttractionContent(){
    axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel?%24format=JSON&$filter=contains(HotelID,'${id}')`,
    {
        headers: getAuthorizationHeader()
      })
    .then(
        function(response){
            let hotelData = response.data[0];
            if(hotelData.Picture.PictureUrl1 == undefined){
                hotelData.Picture.PictureUrl1 = 'img/hotelimg.png';
            }else if (hotelData.Picture.PictureDescription1 == undefined){
                hotelData.Picture.PictureDescription1 = '旅館示意圖';
            }
            document.querySelector(".js-breadcrumbs").textContent = hotelData.HotelName;
            document.querySelector(".js-title").textContent = hotelData.HotelName;
            document.querySelector(".js-img").setAttribute("src", hotelData.Picture.PictureUrl1);
            document.querySelector(".js-img").setAttribute("alt", hotelData.Picture.PictureDescription1);
            document.querySelector(".js-description").textContent = hotelData.Description;
            document.querySelector(".js-address").innerHTML = `<p class="js-address pageContent-txt">地址:${hotelData.Address}</p>`;
        })

}



//觀光活動分頁
function getActivityContent(){
    axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?%24format=JSON&$filter=contains(ActivityID,'${id}')`,
    {
        headers: getAuthorizationHeader()
      })
    .then(
        function(response){
            let activityData = response.data[0];
          
            document.querySelector(".js-breadcrumbs").textContent = activityData.ActivityName;
            document.querySelector(".js-title").textContent = activityData.ActivityName;
            document.querySelector(".js-img").setAttribute("src", activityData.Picture.PictureUrl1);
            document.querySelector(".js-img").setAttribute("alt",  activityData.Picture.PictureDescription1);
            document.querySelector(".js-description").textContent =  activityData.Description;
            document.querySelector(".js-address").innerHTML = `<p class="js-address pageContent-txt">地址:${ activityData.Address}</p>`;
        })

}


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
  