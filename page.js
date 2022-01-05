







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
  