import {computed, customElement, property, query} from '@polymer/decorators'
import {html, PolymerElement} from '@polymer/polymer'
import {HydraResource, SupportedProperty} from 'alcaeus/types/Resources'
import fireNavigation from 'ld-navigation/fireNavigation'
import {getProperties} from '../../lib/alcaeus-helper'

import '@polymer/app-layout/app-grid/app-grid-style'
import '@polymer/iron-icons/image-icons'
import '@polymer/iron-icons/iron-icons'
import '@polymer/paper-icon-button/paper-icon-button'
import '@polymer/paper-item/paper-item'
import '@polymer/paper-listbox/paper-listbox'
import '@polymer/paper-styles/element-styles/paper-material-styles'
import '@polymer/polymer/lib/elements/dom-repeat'

@customElement('alcaeus-resource-viewer')
export default class AlcaeusResourceViewer extends PolymerElement {
  @property({ type: Object })
  public resource: HydraResource

  @computed('resource')
  private get hasClasses() {
    return this.resource.types.length > 0
  }

  @computed('resource')
  private get classes() {
    return this.resource.types.map((cId: string) => {
      const clas = this.resource.apiDocumentation.getClass(cId)

      if (!clas) {
        return { title: cId }
      }

      return clas
    })
  }

  @computed('operations')
  private get hasOperations() {
    return this.operations.length > 0
  }

  @computed('resource')
  private get operations() {
    return this.resource.operations
  }

  @computed('allProperties')
  private get links() {
    return _getLinks(this.allProperties)
  }

  @computed('links')
  private get hasLinks() {
    return this.links.length > 0
  }

  @computed('resource')
  private get allProperties() {
    return getProperties(this.resource)
  }

  @computed('allProperties')
  private get properties() {
    return _getNonLinks(this.allProperties)
  }

  @computed('properties')
  private get hasProperties() {
    return this.properties.length > 0
  }

  private hasValues(p: SupportedProperty) {
    return this.getValues(p).length > 0
  }

  private getValues(p: SupportedProperty) {
    let values = this.resource[p.property.id]
    if (Array.isArray(values) === false) {
      values = [ values ]
    }

    return values.filter((i: any) => typeof i !== 'undefined')
  }

  private getPath(urlStr: string) {
    const url = new URL(urlStr)
    return url.pathname + url.search
  }

  private expandLink(e: any) {
    this.dispatchEvent(new CustomEvent('hydrofoil-append-resource', {
      bubbles: true,
      composed: true,
      detail: {
        parent: this.resource,
        resource: e.model.value,
      },
    }))
  }

  private showOperation(e: any) {
    this.dispatchEvent(new CustomEvent('hydrofoil-append-resource', {
      bubbles: true,
      composed: true,
      detail: {
        parent: this.resource,
        resource: e.model.op,
      },
    }))
  }

  private showClassDocumentation(e: any) {
    this.dispatchEvent(new CustomEvent('console-open-documentation', {
      bubbles: true,
      composed: true,
      detail: {
        class: e.model.type.id,
      },
    }))
  }

  private followLink(e: any) {
    fireNavigation(this, e.model.value.id)
    e.preventDefault()
    e.stopPropagation()
  }

  static get template() {
    return html`<style include="paper-material-styles"></style>
<style include="app-grid-style">
  :host {
    display: block;

    --app-grid-columns: 2;
    --app-grid-gutter: 10px;
    --app-grid-expandible-item-columns: 2;

    --default-resource-view-narrow: {
      --app-grid-columns: 1;
      --app-grid-gutter: 5px;
      --app-grid-expandible-item-columns: 1;
    } --paper-item-selected-weight: normal
  }

  ul {
    padding: 0;
    list-style: none;
  }

  li.item {
    list-style: none;
    background-color: white;
  }

  li.links paper-item {
    cursor: pointer;
  }

  @media (max-width: 799px) {
    :host {
      @apply --default-resource-view-narrow;
    }
  }

  :host([narrow]) {
    @apply --default-resource-view-narrow;
    max-width: 300px;
  }

  .item#basic, .item#operations {
    @apply --app-grid-expandible-item;
  }

  .item.property {
    --app-grid-item-height: 15vh;
  }

  h2 {
    @apply --paper-font-common-base;
  }

  #close {
    position: absolute;
    right: 10px
  }
</style>

<ul class="app-grid">
  <li id="basic" class="item" hidden$="[[!hasClasses]]">
    <h2>Type</h2>
    <div class="paper-material" elevation="1">
      <paper-listbox>
        <dom-repeat items="[[classes]]" as="type">
          <template>
            <paper-item>
              <paper-item-body two-line>
                <span>[[type.title]]</span>
                <span secondary>[[type.id]]</span>
              </paper-item-body>
              <paper-icon-button icon="help-outline" on-click="showClassDocumentation"></paper-icon-button>
            </paper-item>
          </template>
        </dom-repeat>
      </paper-listbox>
    </div>
  </li>
  <li id="operations" class="item" hidden$="[[!hasOperations]]">
    <h2>Operations</h2>
    <div class="paper-material" elevation="1">
      <paper-listbox id="operations">
        <dom-repeat as="op" items="[[operations]]">
          <template>
            <paper-item label="[[op.title]]">
              <paper-item-body two-line>
                <span>[[op.title]]</span>
                <span secondary>[[op.description]]</span>
                <span secondary>(/[[op.method]])</span>
              </paper-item-body>
              <paper-icon-button icon="image:flash-on" on-click="showOperation"></paper-icon-button>
            </paper-item>
          </template>
        </dom-repeat>
      </paper-listbox>
    </div>
  </li>
  <li class="item" hidden$="[[!hasProperties]]">
    <h2>Properties</h2>
    <div class="paper-material" elevation="1">
      <paper-listbox>
        <dom-repeat as="property" items="[[properties]]">
          <template>
            <paper-item hidden$="[[!hasValues(property, resource)]]">
              <paper-item-body two-line>
                <span>[[property.title]]</span>
                <div secondary>
                  <dom-repeat as="value" items="[[getValues(property, resource)]]">
                    <template>
                      <lit-view class="item" value="[[value]]" template-scope="default-resource-view"></lit-view>
                    </template>
                  </dom-repeat>
                </div>
              </paper-item-body>
            </paper-item>
          </template>
        </dom-repeat>
      </paper-listbox>
    </div>
  </li>
  <li class="item links" hidden$="[[!hasLinks]]">
    <h2>Links</h2>
    <div class="paper-material" elevation="1">
      <paper-listbox>
        <dom-repeat as="property" items="[[links]]">
          <template>
            <dom-repeat as="value" items="[[getValues(property, resource)]]">
              <template>
                <paper-item on-click="expandLink">
                  <paper-item-body two-line>
                    <span>[[property.title]]</span>
                    <span secondary>[[getPath(value.id)]]</span>
                  </paper-item-body>
                  <paper-icon-button icon="link" on-click="followLink"></paper-icon-button>
                </paper-item>
              </template>
            </dom-repeat>
            </paper-item-body>
            </paper-item>
          </template>
        </dom-repeat>
      </paper-listbox>
    </div>
  </li>
</ul>`
  }
}

function _getLinks(properties: SupportedProperty[]) {
  return properties.filter((prop: SupportedProperty) => {
    return prop.property.types.indexOf('http://www.w3.org/ns/hydra/core#Link') !== -1
  })
}

function _getNonLinks(properties: SupportedProperty[]) {
  return properties.filter((prop: SupportedProperty) => {
    return prop.property.types.indexOf('http://www.w3.org/ns/hydra/core#Link') === -1
  })
}
