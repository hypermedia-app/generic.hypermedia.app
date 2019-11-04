import { computed, customElement, observe, property, query } from '@polymer/decorators'
import { PaperDropdownMenuElement } from '@polymer/paper-dropdown-menu/paper-dropdown-menu'
import { PaperTabsElement } from '@polymer/paper-tabs/paper-tabs'
import { html, PolymerElement } from '@polymer/polymer'
import { Class, SupportedProperty } from 'alcaeus/types/Resources'

import '@polymer/iron-pages/iron-pages'
import '@polymer/paper-card/paper-card'
import '@polymer/paper-item/paper-item'
import '@polymer/paper-listbox/paper-listbox'
import '@polymer/paper-tabs/paper-tabs'
import '../supported-operations/supported-operations-viewer'
import '../supported-properties/supported-property-view'

import template from './supported-class-view.html'
import style from './supported-class-view.pcss'

@customElement('supported-class-view')
export class SupportedClassView extends PolymerElement {
  @computed('selectedProperty')
  public get propertyIsSelected(): boolean {
    return this.selectedProperty !== null
  }

  @computed('supportedClass')
  public get hasProperties(): boolean {
    if (this.supportedClass && this.supportedClass.supportedProperties) {
      return this.supportedClass.supportedProperties.length > 0
    }

    return false
  }

  @computed('supportedClass')
  public get hasOperations(): boolean {
    if (this.supportedClass && this.supportedClass.supportedOperations) {
      return this.supportedClass.supportedOperations.length > 0
    }

    return false
  }

  public static get template() {
    return html([`<style>${style}</style> ${template}`] as any)
  }

  @property({ type: Object })
  public supportedClass: Class

  @property({ type: Object })
  public selectedProperty: SupportedProperty = null

  @query('#classTabs')
  private classTabs: PaperTabsElement

  @query('#supportedProperties')
  private supportedProperties: PaperDropdownMenuElement

  public connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback()
    }
    this.classTabs.select(0)
  }

  @observe('supportedClass')
  private getProperties() {
    this.supportedProperties.value = ''
    this.classTabs.selected = 0
    this.selectedProperty = null
  }

  private propertySelected(e) {
    this.selectedProperty = e.model.item
  }
}
