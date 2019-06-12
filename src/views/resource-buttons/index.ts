import { ViewTemplates } from '@lit-any/views'
import LitView from '@lit-any/views/lit-view'
import { Operation } from 'alcaeus/lib/es/Resources/Operation'
import { HydraResource, RdfProperty } from 'alcaeus/types/Resources'
import { html } from 'lit-html'
import './docs-button'
import './expand-button'
import './link-button'
import { Scope } from './scope'

ViewTemplates.default.when
  .scopeMatches(Scope)
  .valueMatches((v: IResourceButtonModel) => v.resource instanceof Operation)
  .renders((v, next) => next(v, `${Scope}-expand`))

ViewTemplates.default.when
  .scopeMatches(Scope)
  .valueMatches((v: IResourceButtonModel) => typeof v.resource === 'object')
  .renders((v: IResourceButtonModel, next, scope) => {
    return html`
      ${next(v, `${scope}-expand`)} ${next(v, `${scope}-link`)}
      ${v.resource.operations
        .filter(op => op.method !== 'GET' || op.requiresInput)
        .map(op => next({ resource: op, subject: v.subject }, `${scope}-expand`))}
    `
  })

ViewTemplates.default.when.scopeMatches(Scope).renders(() => '')

export interface IResourceButtonModel {
  resource?: HydraResource
  subject?: HydraResource
  predicate?: RdfProperty
}

class ResourceButtons extends LitView {
  static get properties() {
    return {
      predicate: { type: Object },
    }
  }

  public value: IResourceButtonModel

  constructor() {
    super()
    this.templateScope = Scope
    this.value = {}
  }

  get resource() {
    return this.value.resource
  }

  set resource(resource) {
    this.value = {
      ...this.value,
      resource,
    }
  }

  get subject() {
    return this.value.subject
  }

  set subject(subject) {
    this.value = {
      ...this.value,
      subject,
    }
  }

  get predicate() {
    return this.value.predicate
  }

  set predicate(predicate) {
    this.value = {
      ...this.value,
      predicate,
    }
  }
}

customElements.define(Scope, ResourceButtons)
