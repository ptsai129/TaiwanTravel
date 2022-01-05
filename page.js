const id = location.href.split("=")[1];

const attractionContent = document.querySelector('.pageContent');

function getAttractionContent(){
    const id = location.href.split("=")[1];
    axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?%24top=30&%24format=JSON&$filter=contains(ScenicSpotID,'${id}')`,
    {
        headers: getAuthorizationHeader()
      })
    .then(
        function(response){
            let contentData = response.data[0];
            console.log(contentData);
            document.querySelector(".js-title").textContent = contentData.ScenicSpotName;
            document.querySelector(".js-img").setAttribute("src", contentData.Picture.PictureUrl1);
            document.querySelector(".js-img").setAttribute("alt", contentData.Picture.PictureDescription1);
            document.querySelector(".js-description").textContent = contentData.DescriptionDetail;

        })
}
getAttractionContent();






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
  