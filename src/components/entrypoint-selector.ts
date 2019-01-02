import {customElement, property, query} from '@polymer/decorators'
import {PaperDropdownMenuElement} from '@polymer/paper-dropdown-menu/paper-dropdown-menu'
import {html, PolymerElement} from '@polymer/polymer'

import '@polymer/paper-dropdown-menu/paper-dropdown-menu'
import '@polymer/paper-item/paper-item'
import '@polymer/paper-listbox/paper-listbox'
import '@polymer/polymer/lib/elements/dom-repeat'

@customElement('entrypoint-selector')
export default class EntrypointSelector extends PolymerElement {
  @property({ type: String, notify: true })
  public url: string

  @property({ type: Array, readOnly: true })
  public readonly apis: string[]

  @query('#selector')
  private selector: PaperDropdownMenuElement

  public connectedCallback() {
    super.connectedCallback()

    const apis = Array.prototype.map.call(this.querySelectorAll('span'), (apiEl: HTMLElement) => {
      return {
        label: apiEl.textContent,
        value: apiEl.getAttribute('data-url'),
      }
    })

    this._setProperty('apis', apis)

    if (apis.filter((api: any) => api.value === this.url)) {
      this.selector.value = this.url
    }
  }

  private _entrypointSelected(e: CustomEvent) {
    if (e.detail.value) {
      this.url = e.detail.value.dataUrl
    }
  }

  static get template() {
    return html`
<style>
  :host {
    display: flex;
    pointer-events: all !important;

    --paper-dropdown-menu: {
      flex-grow: 1;
      top: -10px;
    };

    --paper-input-container-color: white;
    --paper-input-container-input-color: white;
    --paper-dropdown-menu-icon: {
      color: white;
    };
  }

  ::slotted(paper-item) {
    display: auto;
  }
  </style>
<paper-dropdown-menu id="selector" label="Select Hydra API" no-animations>
  <paper-listbox slot="dropdown-content" on-selected-item-changed="_entrypointSelected">
    <dom-repeat items="[[apis]]" as="api">
      <template>
        <paper-item data-url="[[api.value]]">[[api.label]]</paper-item>
      </template>
    </dom-repeat>
  </paper-listbox>
</paper-dropdown-menu>`
  }
}
