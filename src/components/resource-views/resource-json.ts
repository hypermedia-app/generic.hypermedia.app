import { computed, customElement, property } from '@polymer/decorators'
import '@polymer/paper-dialog/paper-dialog'
import { html, PolymerElement } from '@polymer/polymer'
import { IHydraResource } from 'alcaeus/types/Resources'
// import 'bower:show-json/show-json.html'
import { decycle } from '../../lib/decycle'

@customElement('resource-json')
class ResourceJson extends PolymerElement {
  @property({ type: Object })
  public resource: IHydraResource

  @computed('resource')
  public get _decycledResource(): object {
    return decycle(this.resource)
  }

  public show() {
    this.$.dialog.open()
  }

  static get template() {
    return html`
      <style>
        paper-dialog {
          max-width: 90%;
          overflow: scroll;
      </style>

      <paper-dialog id="dialog" with-backdrop>
        <show-json json="[[_decycledResource]]" hide-copy-button></show-json>
      </paper-dialog>
    `
  }
}
