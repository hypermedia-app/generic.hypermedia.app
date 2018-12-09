import '@polymer/paper-tooltip/paper-tooltip'

import { computed, customElement, observe, property } from '@polymer/decorators'
import { html, PolymerElement } from '@polymer/polymer'
import {HydraResource, IClass, SupportedProperty} from 'alcaeus/types/Resources'
import {IResource} from 'alcaeus/types/Resources/Resource'

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
      const properties = resource.types.map((t: IClass) => resource.apiDocumentation.getProperties(t))

      const supportedProps = Utils.flatten(properties)
      const [ supportedProp, ...tail ] = supportedProps.filter((prop: SupportedProperty) => prop.property.id === propertyId)

      if (supportedProp) {
        this._setSupportedProperty(supportedProp)
        return
      }
    }

    this._setSupportedProperty(propertyId)
  }
}
