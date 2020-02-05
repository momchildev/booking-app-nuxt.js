import Vue from 'vue'

import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
// import falight from '@fortawesome/fontawesome-pro-light';
//import fasolid from '@fortawesome/fontawesome-pro-solid';
import brands from '@fortawesome/fontawesome-free-brands'
import regular from "@fortawesome/fontawesome-free-regular";
import solid from '@fortawesome/fontawesome-free-solid'

// falight, fasolid, 
fontawesome.library.add(brands, regular, solid);

fontawesome.config = {
  autoAddCss: false,
};

fontawesome.dom.i2svg()

const css = fontawesome.dom.css()
fontawesome.dom.insertCss(css)

Vue.component(FontAwesomeIcon.name, FontAwesomeIcon);