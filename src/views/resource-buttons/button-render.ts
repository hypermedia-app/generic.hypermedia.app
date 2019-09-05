import { html } from 'lit-html'
import { ResourceButtonModel } from './index'

export default function (icon: string, handler: (v: ResourceButtonModel) => (e: Event) => void) {
  return function (v: ResourceButtonModel) {
    import('@polymer/paper-icon-button/paper-icon-button')

    return html`
      <paper-icon-button icon="${icon}" @click="${handler(v)}" title="${v.resource.title || ''}"></paper-icon-button>
    `
  }
}
