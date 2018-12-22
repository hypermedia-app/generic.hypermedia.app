/* eslint-disable no-unused-vars */
import './components/hypermedia-app'
import sw from './sw-loader'

/* Import WebpackApp */

/*let _define = window.customElements.define
window.customElements.define = function () {
  let componentName = arguments[0]
if(componentName === 'ld-navigator') debugger
  try {
    return _define.apply(this, arguments)
  } catch (e) {}
}*/

sw()
