import LitView from '@lit-any/lit-any/lit-view'
import ViewTemplates from '@lit-any/lit-any/views'
import fireNavigation from 'ld-navigation/fireNavigation'
import {html} from 'lit-html'

export const Scope = 'resource-buttons'

function followLink(resource) {
  return function(e: Event) {
    fireNavigation(this, resource.id)
    e.preventDefault()
    e.stopPropagation()
  }
}

function expand(resource, parent) {
  return function() {
    this.dispatchEvent(new CustomEvent('hydrofoil-append-resource', {
      bubbles: true,
      composed: true,
      detail: {
        parent,
        resource,
      },
    }))
  }
}

ViewTemplates.default.when
  .scopeMatches(Scope)
  .renders((resource, next, scope, params) => {
    return html`
      <paper-icon-button icon="zoom-in" @click="${expand(resource, params.resource)}"></paper-icon-button>
      <paper-icon-button icon="link" @click="${followLink(resource)}"></paper-icon-button>`
  })

class ResourceButtons extends LitView {
  constructor() {
    super()
    this.templateScope = Scope
  }

  get resource() {
    return this.value
  }

  set resource(value) {
    this.value = value
  }
}

customElements.define(Scope, ResourceButtons)
