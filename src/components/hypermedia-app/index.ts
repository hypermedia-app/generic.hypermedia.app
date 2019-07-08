import HydrofoilAddressBar from '@hydrofoil/hydrofoil-paper-shell/hydrofoil-address-bar'
import { HydrofoilPaperShell } from '@hydrofoil/hydrofoil-paper-shell/hydrofoil-paper-shell'
import { computed, customElement, property, query } from '@polymer/decorators'
import { html, PolymerElement } from '@polymer/polymer'
import '@polymer/polymer/lib/elements/dom-if'
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings'
import { HydraResource, IApiDocumentation } from 'alcaeus/types/Resources'
import { GitHub } from 'feather-icon-literals'
import fireNavigation from 'ld-navigation/fireNavigation'
import ApiDocumentationViewer from '../api-documentation/viewer'
import '../hypermedia-app-shell'

@customElement('hypermedia-app')
export default class HypermediaApp extends PolymerElement {
  @computed('apiDocumentation')
  public get hasApiDocumentation() {
    return !!this.apiDocumentation
  }

  @computed('entrypoint')
  public get entrypointLoaded() {
    return !!this.entrypoint
  }

  public get githubIcon() {
    return GitHub()
  }

  public static get template() {
    return html`
      <style>
        div {
          padding: 20px;
        }

        app-toolbar[slot='drawer-right'] [main-title] {
          text-align: left;
        }

        app-toolbar a {
          color: white;
        }

        a {
          text-decoration: none;
          color: unset;
        }
      </style>

      <hypermedia-app-shell
        url="{{url}}"
        use-hash-urls
        on-model-changed="enableDoc"
        on-console-open-documentation="showClassDoc"
        entrypoint="{{entrypoint}}"
        .title="${'Generic Hydra Application'}"
      >
        <span slot="left-drawer-title">Options</span>

        <app-toolbar slot="drawer-left">
          <entrypoint-selector main-title on-url-changed="updateAddressBar">
            <span data-url="https://hydra-movies.herokuapp.com/">HydraCG movies API</span>
            <span data-url="https://sources.test.wikibus.org/"
              >wikibus.org sources (test server)</span
            >
          </entrypoint-selector>
        </app-toolbar>

        <app-toolbar slot="header">
          <hydrofoil-address-bar
            main-title
            url="[[url]]"
            on-resource-confirmed="navigate"
          ></hydrofoil-address-bar>
        </app-toolbar>

        <paper-icon-button
          icon="icons:help-outline"
          slot="toolbar-main"
          hidden$="[[!hasApiDocumentation]]"
          on-tap="showDocs"
        ></paper-icon-button>

        <app-toolbar slot="drawer-right">
          <div main-title>ApiDocumentation</div>
          <a href$="[[apiDocumentation.id]]" target="_blank"
            ><iron-icon icon="launch"></iron-icon
          ></a>
        </app-toolbar>
        <div id="api-docs-container" slot="drawer-right">
          <api-documentation-viewer api-docs="[[apiDocumentation]]"> </api-documentation-viewer>
        </div>

        <dom-if if="[[entrypointLoaded]]">
          <template>
            <alcaeus-entrypoint-menu
              entrypoint="[[entrypoint]]"
              slot="drawer-left"
            ></alcaeus-entrypoint-menu>
          </template>
        </dom-if>
        <dom-if if="[[!entrypointLoaded]]">
          <template>
            <paper-item slot="drawer-left">
              <paper-item-body>Main menu (loading...)</paper-item-body>
              <iron-icon icon="hourglass-empty"></iron-icon>
            </paper-item>
          </template>
        </dom-if>
        <paper-listbox slot="drawer-left">
          <paper-icon-item>
            <span slot="item-icon" inner-h-t-m-l="[[githubIcon]]"></span>
            <a href="https://github.com/hypermedia-app/generic.hypermedia.app"
              >See project on GitHub</a
            >
          </paper-icon-item>
        </paper-listbox>

        <div>
          <h2>Generic Hypermedia Application</h2>

          This is a generic client for Hydra-powered Web APIs. The user interface consists of four
          parts:

          <ol>
            <li>the address bar on the top,</li>
            <li>the main resource area, which renders response contents,</li>
            <li>entrypoint links in left sidebar,</li>
            <li>documentation pane in right sidebar.</li>
          </ol>

          <p>You may also start by selecting an API from the dropdown from the sidebar header.</p>

          <p>
            Links are presented as a clickable icon <iron-icon icon="link"></iron-icon>. Clicking
            them will fetch the resource and present it in the resource area.
          </p>

          <p>
            You may also see a magnifying glass icon <iron-icon icon="zoom-in"></iron-icon>. It
            opens embedded resources within the current view, without dereferencing them. Especially
            useful for blank nodes.
          </p>
        </div>

        <paper-spinner slot="loader" active></paper-spinner>
      </hypermedia-app-shell>
    `
  }

  @query('hypermedia-app-shell')
  public shell: HydrofoilPaperShell

  @property({ type: Object })
  public apiDocumentation: IApiDocumentation

  @property({ type: String })
  public url: string

  @property({ type: Object })
  public entrypoint: HydraResource = null

  @query('hydrofoil-address-bar')
  private address: HydrofoilAddressBar

  @query('api-documentation-viewer')
  private apiDocumentationViewer: ApiDocumentationViewer

  public constructor() {
    super()
    setPassiveTouchGestures(true)
  }

  public connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback()
    }
    import('@hydrofoil/hydrofoil-paper-shell/hydrofoil-address-bar')
    import('../entrypoint-selector')
    import('../../views')
    import('../../forms')
    import('@polymer/iron-icon/iron-icon')
    import('@polymer/paper-item/paper-icon-item')
    import('@hydrofoil/hydrofoil-paper-shell/alcaeus-entrypoint-menu')
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
    if (e.detail) {
      this.apiDocumentation = e.detail.apiDocumentation.valueOr(null)
      this.apiDocumentationViewer.modelTypes = e.detail.types
    }
  }

  private showClassDoc(e: CustomEvent) {
    import('../api-documentation/viewer').then(() => {
      this.apiDocumentationViewer.selectClassById(e.detail.class)
      this.showDocs()
    })
  }
}
