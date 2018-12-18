import {LitElement} from '@polymer/lit-element'
import {html} from 'lit-html'

export default class DefaultResourceViewer extends LitElement {
  static get properties() {
    return {
      resource: Object,
    }
  }

  public _render({resource}) {
    return html`${resource.id}` as any
  }
}

customElements.define('default-resource-viewer', DefaultResourceViewer)
