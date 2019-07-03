import { Class } from 'alcaeus/types/Resources'
import { html, LitElement, property } from 'lit-element'
import { shrink } from '../../../lib/shrink'

import '@polymer/paper-tooltip/paper-tooltip'

export default class SupportedClassLink extends LitElement {
  @property({ type: Object })
  public supportedClass: Class

  public get classTitle() {
    if (!this.supportedClass) {
      return ''
    }

    return this.supportedClass.title || shrink(this.supportedClass.id)
  }

  private selectClass(e: Event) {
    this.dispatchEvent(
      new CustomEvent('class-selected', {
        bubbles: true,
        composed: true,
        detail: {
          classId: this.supportedClass.id,
        },
      }),
    )

    e.preventDefault()
  }

  public render() {
    if (!this.supportedClass) {
      return html``
    }

    return html`
      <style>
        :host {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      </style>

      <a id="link" href="${this.supportedClass.id}" on-tap="selectClass" target="_blank"
        >${this.classTitle}</a
      >
      <paper-tooltip for="link" position="left">
        ${shrink(this.supportedClass.id)}
        <br /><br />
        ${this.supportedClass.description}
      </paper-tooltip>
    `
  }
}

customElements.define('supported-class-link', SupportedClassLink)
