import {customElement, property, query} from '@polymer/decorators'
import {html, PolymerElement} from '@polymer/polymer/polymer-element'
import {ComboBoxElement} from '@vaadin/vaadin-combo-box/src/vaadin-combo-box'
import '@vaadin/vaadin-combo-box/vaadin-combo-box'

@customElement('entrypoint-selector')
export default class EntrypointSelector extends PolymerElement {

  @property({ type: String, notify: true })
  public url: string

  @property({ type: Array, readOnly: true })
  public readonly apis: string[]

  @query('#selector')
  private selector: ComboBoxElement

  public ready() {
    super.ready()

    const apis = Array.prototype.map.call(this.children, (apiEl: HTMLElement) => {
      return {
        label: apiEl.textContent,
        value: apiEl.getAttribute('data-url'),
      }
    })

    this._setApis(apis)

    if (apis.filter((api: any) => api.value === this.url)) {
      this.selector.value = this.url
    }
  }

  private _entrypointSelected(e: CustomEvent) {
    if (e.detail.value) {
      this.url = e.detail.value
    }
  }

  static get template() {
    return html`<vaadin-combo-box id="selector"
                                  label="Select Hydra API"
                                  items="[[apis]]"
                                  on-value-changed="_entrypointSelected"></vaadin-combo-box>`
  }
}
