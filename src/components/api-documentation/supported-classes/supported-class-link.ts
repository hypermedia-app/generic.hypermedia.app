import { computed, customElement } from '@polymer/decorators'
import { html, PolymerElement } from '@polymer/polymer'
import { Class } from 'alcaeus/types/Resources'

import '@polymer/paper-tooltip/paper-tooltip'

@customElement('supported-class-link')
export default class SupportedClassLink extends PolymerElement {
  public supportedClass: Class

  @computed('supportedClass')
  public get classTitle() {
    if (!this.supportedClass) {
      return ''
    }

    return this.supportedClass.title || this.supportedClass.id
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

  public static get template() {
    return html`
      <style>
        :host {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      </style>

      <a id="link" href$="[[supportedClass.id]]" on-tap="selectClass" target="_blank"
        >[[classTitle]]</a
      >
      <paper-tooltip for="link" position="left">
        [[supportedClass.id]]
        <br /><br />
        [[supportedClass.description]]
      </paper-tooltip>
    `
  }
}
