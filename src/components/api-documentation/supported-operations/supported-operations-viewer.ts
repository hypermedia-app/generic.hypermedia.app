import { computed, customElement, observe, property } from '@polymer/decorators'
import { html, PolymerElement } from '@polymer/polymer'
import { IOperation } from 'alcaeus/types/Resources'

import './supported-operation-view'

@customElement('supported-operations-viewer')
export default class SupportedOperationsViewer extends PolymerElement {
  @property({ type: Array })
  public supportedOperations: IOperation[]

  @property({ type: Object })
  public selectedOperation: IOperation = null

  @computed('selectedOperation')
  public get operationIsSelected() {
    return this.selectedOperation !== null
  }

  @observe('supportedOperations')
  private clearSelection() {
    this.$.selectedOperation = null
    this.$.supportedOperations.value = ''
  }

  private operationClicked(e) {
    this.selectedOperation = e.model.item
  }

  public static get template() {
    return html`
      <style>
        [hidden] {
          display: none;
        }

        paper-dropdown-menu {
          width: 100%;
        }
      </style>

      <paper-dropdown-menu id="supportedOperations" no-animations label="Supported Operation">
        <paper-listbox slot="dropdown-content">
          <dom-repeat items="[[supportedOperations]]">
            <template>
              <paper-item on-click="operationClicked">[[item.title]]</paper-item>
            </template>
          </dom-repeat>
        </paper-listbox>
      </paper-dropdown-menu>

      <supported-operation-view
        supported-operation="[[selectedOperation]]"
        hidden$="[[!operationIsSelected]]"
      ></supported-operation-view>
    `
  }
}
