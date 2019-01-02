var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { computed, customElement, property } from '@polymer/decorators';
import { html, PolymerElement } from '@polymer/polymer';
import fireNavigation from 'ld-navigation/fireNavigation';
import { getProperties } from '../../lib/alcaeus-helper';
import '@polymer/app-layout/app-grid/app-grid-style';
import '@polymer/iron-icons/image-icons';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/paper-styles/element-styles/paper-material-styles';
import '@polymer/polymer/lib/elements/dom-repeat';
let AlcaeusResourceViewer = class AlcaeusResourceViewer extends PolymerElement {
    get hasClasses() {
        return this.resource.types.length > 0;
    }
    get classes() {
        return this.resource.types.map((cId) => {
            const clas = this.resource.apiDocumentation.getClass(cId);
            if (!clas) {
                return { title: cId };
            }
            return clas;
        });
    }
    get hasOperations() {
        return this.operations.length > 0;
    }
    get operations() {
        return this.resource.operations;
    }
    get links() {
        return _getLinks(this.allProperties);
    }
    get hasLinks() {
        return this.links.length > 0;
    }
    get allProperties() {
        return getProperties(this.resource);
    }
    get properties() {
        return _getNonLinks(this.allProperties);
    }
    get hasProperties() {
        return this.properties.length > 0;
    }
    hasValues(p) {
        return this.getValues(p).length > 0;
    }
    getValues(p) {
        let values = this.resource[p.property.id];
        if (Array.isArray(values) === false) {
            values = [values];
        }
        return values.filter((i) => typeof i !== 'undefined');
    }
    getPath(urlStr) {
        const url = new URL(urlStr);
        return url.pathname + url.search;
    }
    expandLink(e) {
        this.dispatchEvent(new CustomEvent('hydrofoil-append-resource', {
            bubbles: true,
            composed: true,
            detail: {
                parent: this.resource,
                resource: e.model.value,
            },
        }));
    }
    showOperation(e) {
        this.dispatchEvent(new CustomEvent('hydrofoil-append-resource', {
            bubbles: true,
            composed: true,
            detail: {
                parent: this.resource,
                resource: e.model.op,
            },
        }));
    }
    followLink(e) {
        fireNavigation(this, e.model.value.id);
        e.preventDefault();
        e.stopPropagation();
    }
    static get template() {
        return html `<style include="paper-material-styles"></style>
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
</ul>`;
    }
};
__decorate([
    property({ type: Object })
], AlcaeusResourceViewer.prototype, "resource", void 0);
__decorate([
    computed('resource')
], AlcaeusResourceViewer.prototype, "hasClasses", null);
__decorate([
    computed('resource')
], AlcaeusResourceViewer.prototype, "classes", null);
__decorate([
    computed('operations')
], AlcaeusResourceViewer.prototype, "hasOperations", null);
__decorate([
    computed('resource')
], AlcaeusResourceViewer.prototype, "operations", null);
__decorate([
    computed('allProperties')
], AlcaeusResourceViewer.prototype, "links", null);
__decorate([
    computed('links')
], AlcaeusResourceViewer.prototype, "hasLinks", null);
__decorate([
    computed('resource')
], AlcaeusResourceViewer.prototype, "allProperties", null);
__decorate([
    computed('allProperties')
], AlcaeusResourceViewer.prototype, "properties", null);
__decorate([
    computed('properties')
], AlcaeusResourceViewer.prototype, "hasProperties", null);
AlcaeusResourceViewer = __decorate([
    customElement('alcaeus-resource-viewer')
], AlcaeusResourceViewer);
export default AlcaeusResourceViewer;
function _getLinks(properties) {
    return properties.filter((prop) => {
        return prop.property.types.indexOf('http://www.w3.org/ns/hydra/core#Link') !== -1;
    });
}
function _getNonLinks(properties) {
    return properties.filter((prop) => {
        return prop.property.types.indexOf('http://www.w3.org/ns/hydra/core#Link') === -1;
    });
}
