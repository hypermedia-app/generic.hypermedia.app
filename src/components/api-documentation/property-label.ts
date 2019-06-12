import { customElement, property } from '@polymer/decorators'
import '@polymer/paper-tooltip/paper-tooltip'
import { html, PolymerElement } from '@polymer/polymer'
import { SupportedProperty } from 'alcaeus/types/Resources'

@customElement('property-label')
export default class PropertyLabel extends PolymerElement {
  public supportedProperty: SupportedProperty

  @property({
    computed: '_getPropertyTitle(supportedProperty, propertyId)',
    type: String,
    notify: true,
  })
  public propertyTitle: string

  public _getPropertyTitle(supportedProperty: SupportedProperty): string {
    if (supportedProperty) {
      if (supportedProperty.title) {
        return supportedProperty.title
      }

      return supportedProperty.property.id
    }

    return ''
  }

  public static get template() {
    return html`
      <span id="title">[[propertyTitle]]</span>
      <paper-tooltip for="title" position="right">
        [[supportedProperty.property.id]]
        <br /><br />
        [[supportedProperty.description]]
      </paper-tooltip>
    `
  }
}
