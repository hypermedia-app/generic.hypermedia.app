import '@polymer/paper-tooltip/paper-tooltip'
import { html, LitElement, property } from 'lit-element'
import { SupportedProperty } from 'alcaeus/types/Resources'
import { shrink } from '../../lib/shrink'

export default class PropertyLabel extends LitElement {
  @property({ type: Object })
  public supportedProperty: SupportedProperty

  private get _propertyTitle(): string {
    if (this.supportedProperty) {
      if (this.supportedProperty.title) {
        return this.supportedProperty.title
      }

      return shrink(this.supportedProperty.property.id)
    }

    return ''
  }

  public render() {
    if (!this.supportedProperty) {
      return html``
    }

    return html`
      <span id="title">${this._propertyTitle}</span>
      <paper-tooltip for="title" position="right">
        ${this.supportedProperty.property && shrink(this.supportedProperty.property.id)}
        <br /><br />
        ${this.supportedProperty.description}
      </paper-tooltip>
    `
  }
}

customElements.define('property-label', PropertyLabel)
