'use strict'

/* Import WebpackApp */


let _define = customElements.define;
customElements.define = function() {
  let componentName = arguments[0];

  try {
    return _define.apply(this, arguments);
  } catch(e) {}
};

/* eslint-disable no-unused-vars */
import './components/containers/hf-app'
import sw from './sw-loader'

sw()
