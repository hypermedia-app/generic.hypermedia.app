import {HydrofoilPaperShell} from '@hydrofoil/hydrofoil-paper-shell/hydrofoil-paper-shell'
import {customElement, observe, property, query} from '@polymer/decorators'
import {html, PolymerElement} from '@polymer/polymer'
import fireNavigation from 'ld-navigation/fireNavigation'

import HydrofoilAddressBar from '@hydrofoil/hydrofoil-paper-shell/hydrofoil-address-bar'
import '@hydrofoil/hydrofoil-paper-shell/hydrofoil-paper-shell'
import {setPassiveTouchGestures} from '@polymer/polymer/lib/utils/settings'

@customElement('hypermedia-app')
export default class HypermediaApp extends PolymerElement {
  constructor() {
    super()
    setPassiveTouchGestures(true)
  }

  @property({ type: String })
  public url: string

  @query('hydrofoil-paper-shell')
  private shell: HydrofoilPaperShell

  @query('hydrofoil-address-bar')
  private address: HydrofoilAddressBar

  public connectedCallback() {
    super.connectedCallback()
    import('@hydrofoil/hydrofoil-paper-shell/hydrofoil-address-bar')
    import('../entrypoint-selector')
    import('../../views')
  }

  private navigate() {
    fireNavigation(this, this.address.url)
  }

  private updateAddressBar(e: CustomEvent) {
    this.address.url = e.detail.value
  }

  static get template() {
    return html`
      <hydrofoil-paper-shell url="{{url}}">
        <app-toolbar slot="toolbar-left">
          <entrypoint-selector main-title on-url-changed="updateAddressBar">
            <span data-url="http://wikibus-test.gear.host/">Bus encyclopedia</span>
            <span data-url="http://www.markus-lanthaler.com/hydra/api-demo/">Hydra demo API</span>
          </entrypoint-selector>
        </app-toolbar>

        <app-toolbar slot="header">
          <hydrofoil-address-bar main-title url="[[url]]" on-resource-confirmed="navigate"></hydrofoil-address-bar>
        </app-toolbar>
      </hydrofoil-paper-shell>`
  }
}
