import {computed, customElement, observe, property} from '@polymer/decorators'
import '@polymer/iron-pages/iron-pages'
import '@polymer/paper-card/paper-card'
import '@polymer/paper-tabs/paper-tabs'
import {html, PolymerElement} from '@polymer/polymer'
import {Class, SupportedProperty} from 'alcaeus/types/Resources'
// import '../supported-operations/supported-operations-viewer'
// import '../supported-properties/supported-property-view'

import template from './supported-class-view.html'
import style from './supported-class-view.pcss'

@customElement('supported-class-view')
export class SupportedClassView extends PolymerElement {

  @computed('selectedProperty')
  public get propertyIsSelected(): boolean {
    return typeof this.selectedProperty !== 'undefined' && this.selectedProperty !== null
  }

  @computed('supportedClass')
  get hasProperties(): boolean {
    if (!this.supportedClass) {
      return false
    }

    return this.supportedClass.supportedProperties.length > 0
  }

  @computed('supportedClass')
  get hasOperations(): boolean {
    if (!this.supportedClass) {
      return false
    }

    return this.supportedClass.supportedOperations.length > 0
  }

  static get template() {
    return html([`<style>${style}</style> ${template}`])
  }
  @property({type: Object})
  public supportedClass: Class

  @property({type: Object})
  public selectedProperty: SupportedProperty

  public connectedCallback() {
    super.connectedCallback()
    this.$.classTabs.select(0)
  }

  public openProperties() {
    this.$.props.toggle()
  }

  @observe('supportedClass')
  private getProperties(supportedClass: Class) {
    this.$.supportedProperties.value = null
    this.$.classTabs.selected = 0
  }
}
