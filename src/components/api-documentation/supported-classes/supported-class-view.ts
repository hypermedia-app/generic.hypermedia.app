import {computed, customElement, observe, property, query} from '@polymer/decorators'
import '@polymer/iron-pages/iron-pages'
import '@polymer/paper-card/paper-card'
import {PaperTabsElement} from '@polymer/paper-tabs/paper-tabs'
import {html, PolymerElement} from '@polymer/polymer'
import {ComboBoxElement} from '@vaadin/vaadin-combo-box/src/vaadin-combo-box'
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
    return html([`<style>${style}</style> ${template}`] as any)
  }
  @property({type: Object})
  public supportedClass: Class

  @property({type: Object})
  public selectedProperty: SupportedProperty

  @query('#classTabs')
  private classTabs: PaperTabsElement

  @query('#supportedProperties')
  private supportedProperties: ComboBoxElement

  public connectedCallback() {
    super.connectedCallback()
    this.classTabs.select(0)
  }

  public openProperties() {
    this.$.props.toggle()
  }

  @observe('supportedClass')
  private getProperties(supportedClass: Class) {
    this.supportedProperties.value = null
    this.classTabs.selected = 0
  }
}
