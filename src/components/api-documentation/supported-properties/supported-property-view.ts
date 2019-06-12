import { computed, customElement, property } from '@polymer/decorators'
import { html, PolymerElement } from '@polymer/polymer'
import { ISupportedProperty } from 'alcaeus/types/Resources'

import '@polymer/iron-icon/iron-icon'
import '../supported-classes/supported-class-link'

@customElement('supported-property-view')
export default class SupportedPropertyView extends PolymerElement {
  @property({ type: Object })
  public supportedProperty: ISupportedProperty

  @computed('supportedProperty')
  public get hasOperations() {
    if (this.supportedProperty) {
      return this.supportedProperty.property.supportedOperations.length > 0
    }

    return false
  }

  private yesNoIcon(val: boolean) {
    if (val === true) {
      return 'icons:check'
    }

    return 'icons:clear'
  }

  public static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        [hidden] {
          display: none;
        }
      </style>

      <p>
        [[supportedProperty.description]]
      </p>
      <p>
        <b>Predicate:</b><br />
        [[supportedProperty.property.id]]
      </p>
      <p>
        <b>Required:</b>
        <iron-icon icon="[[yesNoIcon(supportedProperty.required)]]"></iron-icon>
      </p>
      <p>
        <b>Writable:</b>
        <iron-icon icon="[[yesNoIcon(supportedProperty.writable)]]"></iron-icon>
      </p>
      <p>
        <b>Readable:</b>
        <iron-icon icon="[[yesNoIcon(supportedProperty.readable)]]"></iron-icon>
      </p>
      <p>
        <b>Domain:</b>
        <supported-class-link
          hidden$="[[!hasReturns]]"
          supported-class="[[supportedProperty.property.domain]]"
        ></supported-class-link>
      </p>
      <p>
        <b>Range:</b>
        <supported-class-link
          hidden$="[[!hasReturns]]"
          supported-class="[[supportedProperty.property.range]]"
        ></supported-class-link>
      </p>

      <supported-operations-viewer
        hidden$="[[!hasOperations]]"
        supported-operations="[[supportedProperty.property.supportedOperations]]"
      ></supported-operations-viewer>
    `
  }
}
