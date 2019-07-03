import { html, LitElement, property } from 'lit-element'
import { SupportedProperty } from 'alcaeus/types/Resources'

import '@polymer/iron-icon/iron-icon'
import '../supported-classes/supported-class-link'
import {shrink} from '@zazuko/rdf-vocabularies/lib/es'

export default class SupportedPropertyView extends LitElement {
  @property({ type: Object })
  public supportedProperty: SupportedProperty

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

  public render() {
    if (!this.supportedProperty) {
      return html``
    }

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
        ${this.supportedProperty.description}
      </p>
      <p>
        <b>Predicate:</b><br />
        ${shrink(this.supportedProperty.property.id)}
      </p>
      <p>
        <b>Required:</b>
        <iron-icon icon="${this.yesNoIcon(this.supportedProperty.required)}"></iron-icon>
      </p>
      <p>
        <b>Writable:</b>
        <iron-icon icon="${this.yesNoIcon(this.supportedProperty.writable)}"></iron-icon>
      </p>
      <p>
        <b>Readable:</b>
        <iron-icon icon="${this.yesNoIcon(this.supportedProperty.readable)}"></iron-icon>
      </p>
      <p>
        <b>Domain:</b>
        <supported-class-link
          ?hidden="${!this.supportedProperty.property.domain}"
          .supportedClass="${this.supportedProperty.property.domain}"
        ></supported-class-link>
      </p>
      <p>
        <b>Range:</b>
        <supported-class-link
          ?hidden="${!this.supportedProperty.property.range}"
          .supportedClass="${this.supportedProperty.property.range}"
        ></supported-class-link>
      </p>

      <supported-operations-viewer
        ?hidden="${!this.hasOperations}"
        .supportedOperations="${this.supportedProperty.property.supportedOperations}"
      ></supported-operations-viewer>
    `
  }
}

customElements.define('supported-property-view', SupportedPropertyView)
