import HydrofoilAddressBar from '@hydrofoil/hydrofoil-paper-shell/hydrofoil-address-bar'
import {HydrofoilPaperShell} from '@hydrofoil/hydrofoil-paper-shell/hydrofoil-paper-shell'
import {customElement, observe, property, query} from '@polymer/decorators'
import {html, PolymerElement} from '@polymer/polymer'
import {setPassiveTouchGestures} from '@polymer/polymer/lib/utils/settings'
import fireNavigation from 'ld-navigation/fireNavigation'

import '@hydrofoil/hydrofoil-paper-shell/hydrofoil-paper-shell'
import ApiDocumentationViewer from '../api-documentation/viewer'

@customElement('hypermedia-app')
export default class HypermediaApp extends PolymerElement {
  @query('hydrofoil-paper-shell')
  private shell: HydrofoilPaperShell

  @query('hydrofoil-address-bar')
  private address: HydrofoilAddressBar

  @query('api-documentation-viewer')
  private apiDocumentation: ApiDocumentationViewer

  constructor() {
    super()
    setPassiveTouchGestures(true)
  }

  @property({ type: String })
  public url: string

  @property({ type: Boolean })
  public hasApiDocumentation = false

  public connectedCallback() {
    super.connectedCallback()
    import('@hydrofoil/hydrofoil-paper-shell/hydrofoil-address-bar')
    import('../entrypoint-selector')
    import('../../views')
    import('@polymer/iron-icon/iron-icon')
  }

  protected showDocs() {
    import('../api-documentation/viewer')
    this.shell.openRightDrawer()
  }

  private navigate() {
    fireNavigation(this, this.address.url)
  }

  private updateAddressBar(e: CustomEvent) {
    this.address.url = e.detail.value
  }

  private enableDoc(e: CustomEvent) {
    if (e.detail.apiDocumentation) {
      this.hasApiDocumentation = true
      this.apiDocumentation.apiDocs = e.detail.apiDocumentation
      this.apiDocumentation.modelTypes = e.detail.types
    } else {
      this.hasApiDocumentation = false
    }
  }

  private showClassDoc(e: CustomEvent) {
    import('../api-documentation/viewer').then(() => {
      this.apiDocumentation.selectClassById(e.detail.class)
      this.showDocs()
    })
  }

  static get template() {
    return html`
      <style>
        div { padding: 20px }
      </style>

      <hydrofoil-paper-shell url="{{url}}" use-hash-urls on-model-changed="enableDoc"
                             on-console-open-documentation="showClassDoc">
        <app-toolbar slot="toolbar-left">
          <entrypoint-selector main-title on-url-changed="updateAddressBar">
            <span data-url="https://wikibus-test.gear.host/">Bus encyclopedia</span>
            <span data-url="http://www.markus-lanthaler.com/hydra/api-demo/">Hydra demo API</span>
          </entrypoint-selector>
        </app-toolbar>

        <app-toolbar slot="header">
          <hydrofoil-address-bar main-title url="[[url]]" on-resource-confirmed="navigate"></hydrofoil-address-bar>
        </app-toolbar>

        <paper-icon-button icon="icons:help-outline" slot="toolbar-main"
                                   hidden$="[[!hasApiDocumentation]]"
                                   on-tap="showDocs"></paper-icon-button>

        <app-toolbar slot="drawer-right">
            <div class="title">Documentation</div>
        </app-toolbar>
        <div id="api-docs-container" slot="drawer-right">
            <api-documentation-viewer id="apiDocumentation" api-docs="[[model.apiDocumentation]]">
            </api-documentation-viewer>
        </div>

        <div slot="shell-ready">
          Hi,

          This is the Hydra Console - a generic client for Hydra-powered Web APIs. The
          user interface consists of four parts:

          <ol>
            <li>the address bar on the top,</li>
            <li>the main resource area, which renders response contents,</li>
            <li>entrypoint links in left sidebar,</li>
            <li>documentation pane in right sidebar (coming soon).</li>
          </ol>

          You may also start by selecting an API from the dropdown from the sidebar header.

          Links are presented as a clickable icon <iron-icon icon="link"></iron-icon>. Clicking them will fetch the
          resource and present it in the resource area.
        </div>

        <paper-spinner slot="loader" active></paper-spinner>
      </hydrofoil-paper-shell>`
  }
}
