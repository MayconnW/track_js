
var cookieName = "tracking";
var daysExpirationCookie = 365;
var webServer = "https://projectrd.herokuapp.com";

function sendContact(email){
  let uid = getUuidCookie();
  $.post(
    webServer+"/api/contacts",
    {
      email: email,
      cookie: uid
    }
  );
}

function generateUuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function setCookie(cname, cvalue, exdays) {
  let d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
    
function getUuidCookie(){
  let uid = getCookie(cookieName);
  if(!uid){
      uid = generateUuidv4();
      setCookie(cookieName,uid,daysExpirationCookie);
  }  
  return uid;
}

(function (window, document) {
    "use strict";
    
    let uid = getUuidCookie();

    $.post(
      webServer+"/api/track",
      {
        cookie: uid,
        url: window.location.pathname
      }
    );

}(window, document));