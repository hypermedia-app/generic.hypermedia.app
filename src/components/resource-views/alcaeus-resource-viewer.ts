import { computed, customElement, property } from '@polymer/decorators'
import { html, PolymerElement } from '@polymer/polymer'
import { Vocab } from 'alcaeus'
import { HydraResource, IDocumentedResource } from 'alcaeus/types/Resources'
import { shrink } from '../../lib/shrink'

import '@polymer/app-layout/app-grid/app-grid-style'
import '@polymer/iron-icons/image-icons'
import '@polymer/iron-icons/iron-icons'
import '@polymer/paper-icon-button/paper-icon-button'
import '@polymer/paper-item/paper-item'
import '@polymer/paper-listbox/paper-listbox'
import '@polymer/paper-styles/element-styles/paper-material-styles'
import '@polymer/polymer/lib/elements/dom-repeat'
import { getPath } from '../../views/helpers'

@customElement('alcaeus-resource-viewer')
export default class AlcaeusResourceViewer extends PolymerElement {
  @property({ type: Object })
  public resource: HydraResource

  @computed('resource')
  public get hasClasses() {
    return this.resource.types.length > 0
  }

  @computed('resource')
  public get classes() {
    return this.resource.apiDocumentation
      .map(apiDocumentation => ({ apiDocumentation, getClass: apiDocumentation.getClass }))
      .map(({ apiDocumentation, getClass }) => this.resource.types.map((cId: string) => {
          const clas = getClass.bind(apiDocumentation)(cId)

          if (!clas) {
            return { title: cId }
          }

          return clas
        }))
      .valueOr([])
  }

  @computed('operations')
  public get hasOperations() {
    return this.operations.length > 0
  }

  @computed('resource')
  public get operations() {
    return this.resource.operations
  }

  @computed('resource')
  public get links() {
    return this.resource.getLinks(false)
  }

  @computed('resource')
  public get collections() {
    return this.resource.getCollections()
  }

  @computed('links', 'collections')
  public get hasLinks() {
    return this.links.length > 0 || this.collections.length > 0
  }

  @computed('resource')
  public get properties() {
    return this.resource
      .getProperties()
      .filter(tuple => tuple.supportedProperty.property.isLink === false)
      .filter(tuple => tuple.objects.length > 0)
  }

  @computed('properties')
  public get hasProperties() {
    return this.properties.length > 0
  }

  @computed('resource', 'properties')
  public get remainingValues() {
    const knownProperties = this.resource
      .getProperties()
      .map(prop => prop.supportedProperty.property.id)

    return Object.keys(this.resource)
      .filter(prop => !prop.startsWith('@'))
      .filter(prop => !prop.startsWith(Vocab()))
      .filter(prop => !knownProperties.includes(prop))
      .map(prop => {
        let objects = this.resource[prop]
        if (!Array.isArray(objects)) {
          objects = [objects]
        }

        return {
          objects,
          property: prop,
        }
      })
  }

  @computed('remainingValues')
  public get hasOtherValues() {
    return this.remainingValues.length > 0
  }

  private getCollectionTitle(collection: HydraResource & IDocumentedResource) {
    return collection.title || 'Collection'
  }

  private getPath(urlStr: string) {
    return getPath(urlStr)
  }

  private shrink(iri) {
    return shrink(iri)
  }

  public static get template() {
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
                <span secondary>[[shrink(type.id)]]</span>
              </paper-item-body>
              <resource-buttons resource="[[type]]"
                                predicate='{ "@id": "@type" }'
                                subject="[[resource]]"></resource-buttons>
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
              <resource-buttons resource="[[op]]" subject="[[resource]]"></resource-buttons>
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
        <dom-repeat as="propTuple" items="[[properties]]">
          <template>
            <dom-repeat as="value" items="[[propTuple.objects]]">
              <template>
                <paper-item>
                  <paper-item-body two-line>
                    <span>[[propTuple.supportedProperty.title]]</span>
                    <div secondary>
                      <lit-view class="item" value="[[value]]" template-scope="default-resource-view"></lit-view>
                    </div>
                  </paper-item-body>
                  <resource-buttons resource="[[value]]"
                                    subject="[[resource]]"
                                    predicate="[[propTuple.supportedProperty.property]]"></resource-buttons>
                </paper-item>
              </template>
            </dom-repeat>
          </template>
        </dom-repeat>
      </paper-listbox>
    </div>
  </li>
  <li class="item links" hidden$="[[!hasLinks]]">
    <h2>Links</h2>
    <div class="paper-material" elevation="1">
      <paper-listbox>
        <dom-repeat as="link" items="[[links]]">
          <template>
            <dom-repeat as="value" items="[[link.resources]]">
              <template>
                <paper-item>
                  <paper-item-body two-line>
                    <span>[[link.supportedProperty.title]]</span>
                    <span secondary>[[getPath(value.id)]]</span>
                  </paper-item-body>
                  <resource-buttons resource="[[value]]"
                                    predicate="[[link.supportedProperty.property]]"
                                    subject="[[resource]]"></resource-buttons>
                </paper-item>
              </template>
            </dom-repeat>
            </paper-item-body>
            </paper-item>
          </template>
        </dom-repeat>

        <dom-repeat as="value" items="[[collections]]">
          <template>
            <paper-item>
              <paper-item-body two-line>
                <span>[[getCollectionTitle(value)]]</span>
                <span secondary>[[getPath(value.id)]]</span>
              </paper-item-body>
              <resource-buttons resource="[[value]]" subject="[[resource]]"></resource-buttons>
            </paper-item>
            </paper-item-body>
            </paper-item>
          </template>
        </dom-repeat>
      </paper-listbox>
    </div>
  </li>
  <li class="item" hidden$="[[!hasOtherValues]]">
    <h2>Other values</h2>
    <div class="paper-material" elevation="1">
      <paper-listbox>
        <dom-repeat as="propTuple" items="[[remainingValues]]">
          <template>
            <dom-repeat as="value" items="[[propTuple.objects]]">
              <template>
                <paper-item>
                  <paper-item-body two-line>
                    <span>[[propTuple.property]]</span>
                    <div secondary>
                      <lit-view class="item" value="[[value]]" template-scope="default-resource-view"></lit-view>
                    </div>
                  </paper-item-body>
                  <resource-buttons resource="[[value]]"
                                    predicate="[[propTuple.property]]"
                                    subject="[[resource]]"></resource-buttons>
                </paper-item>
              </template>
            </dom-repeat>
          </template>
        </dom-repeat>
      </paper-listbox>
    </div>
  </li>
</ul>`
  }
}
