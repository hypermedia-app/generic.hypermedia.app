import { computed, customElement, observe, property } from '@polymer/decorators'
import '@polymer/paper-tooltip/paper-tooltip'
import { html, PolymerElement } from '@polymer/polymer'
import {HydraResource, SupportedProperty} from 'alcaeus/types/Resources'
import {IResource} from 'alcaeus/types/Resources/Resource'
import * as flatten from 'lodash/flatten'

@customElement('property-label')
class PropertyLabel extends PolymerElement {

  public readonly supportedProperty: SupportedProperty

  public propertyId: string

  public resource: IResource

  @property({ computed: '_getPropertyTitle(supportedProperty, propertyId)', type: String, notify: true })
  public propertyTitle: string

  public _getPropertyTitle(supportedProperty: SupportedProperty, propertyId: string): string {
    if (supportedProperty && supportedProperty.title) {
      return supportedProperty.title
    }

    return propertyId
  }

  @observe('resource', 'propertyId')
  public getTitle(resource: HydraResource, propertyId: string) {
    if (resource && resource.apiDocumentation) {
      const properties = resource.types.map((t) => resource.apiDocumentation.getProperties(t))

      const supportedProps = flatten(properties)
      const [ supportedProp, ...tail ] = supportedProps.filter((prop) => prop.property.id === propertyId)

      if (supportedProp) {
        this._setProperty('supportedProperty', supportedProp)
        return
      }
    }

    this._setProperty('supportedProperty', propertyId)
  }

  static get template() {
    return html`<span id="title">[[propertyTitle]]</span>
<paper-tooltip for="title" position="right">
    [[propertyId]]
    <br><br>
    [[supportedProperty.description]]
</paper-tooltip>`
  }
}
