// import {ProductBundles} from "./modules/ProductBundles";
import './styles/main.scss';
import loadSVGs from './modules/svg-replace';
import 'popper.js';
import 'bootstrap';

document.addEventListener('DOMContentLoaded', () => {
  loadSVGs();
});


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










