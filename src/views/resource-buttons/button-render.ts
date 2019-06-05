import {html} from 'lit-html'
import {IResourceButtonModel} from './index'

export default function(icon: string, handler: (v: IResourceButtonModel) => (e: Event) => void) {
  return function(v: IResourceButtonModel) {
    import('@polymer/paper-icon-button/paper-icon-button')

    return html`<paper-icon-button icon="${icon}" @click="${handler(v)}"></paper-icon-button>`
  }
}
