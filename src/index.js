// import {ProductBundles} from "./modules/ProductBundles";
import './styles/main.scss';
import loadSVGs from './modules/svg-replace';
import 'popper.js';
import 'bootstrap';

document.addEventListener('DOMContentLoaded', () => {
  loadSVGs();
});

//Formatted all JS code at 2-space indentation to match original JS above in contrast with ESLint default of 4

// Detect for >0 in Percent-off bubbles and hide them
function hideZeroPercent() {
  let percentOff = Array.from(document.getElementsByClassName('percent-off-number'));

  percentOff.forEach(checkNum);
    function checkNum(item, index) {
      let num = Array.from(item.innerHTML);

      if (num[0] <= 0 ) {
        let el = percentOff[index].parentNode.parentNode;
        el.classList.add("d-none");
      }
  }
}
hideZeroPercent();

//Wistia Video Play on Thumbnail Click
window._wq = window._wq || [];
_wq.push({ id: "zwflowymel", onEmbedded: function(video) {

  video.bind('play', function() {
    console.log("Video playing")
    return video.unbind;
  });
}});

//AJAX API Request for AlgaeCal Guarantee Modal
const algaeAPIurl = 'https://www.algaecal.com/wp-json/acf/v3/options/options';

function ajax_get(url, callback) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          try {
              var data = JSON.parse(xmlhttp.responseText);
          } catch(err) {
              console.log(err.message + " in " + xmlhttp.responseText);
              return;
          }
          callback(data);
      }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

ajax_get(algaeAPIurl, function(data) {
  const acfObj = data.acf;  
  document.getElementById("guarantee-modal-body").innerHTML = acfObj["7yr_full_copy"];
});

//API Fetch Request for Business Hours (to show alternative to AJAX)
const contactCTA = document.querySelector(".speak-to-our-bone-specialists");

fetch('https://www.algaecal.com/wp-json/acf/v3/options/options').then(result => {
    return result.json();
})
.then(data => {

  function openHours() {
    //Get current date IN CURRENT TIMEZONE and UTC offset
    let currentTime = new Date();
    let timezoneOffset = currentTime.getTimezoneOffset() / 60;
    const convTime = currentTime.getHours() + timezoneOffset - 7;

    //Get opening hours from JSON
    const acfObj = data.acf["office_hours"]; 
    let todayObj = acfObj[currentTime.getDay()];
    let startTime = parseInt(todayObj["starting_time"]) / 100;
    let closeTime = parseInt(todayObj["closing_time"]) / 100;

    //Evaluate convTime against start and end times
    if (convTime >= startTime && convTime <= closeTime) {
      contactCTA.setAttribute('style','display:block !important');
    }
  }
  openHours();
})
.catch(error => console.log(error));