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
  .valueMatches((v: ResourceButtonModel) => v.resource instanceof Operation)
  .renders((v, next) => next(v, `${Scope}-expand`))

ViewTemplates.default.when
  .scopeMatches(Scope)
  .valueMatches((v: ResourceButtonModel) => typeof v.resource === 'object')
  .renders((v: ResourceButtonModel, next, scope) => html`
      ${next(v, `${scope}-expand`)} ${next(v, `${scope}-link`)}
      ${v.resource.operations
        .filter(op => op.method !== 'GET' || op.requiresInput)
        .map(op => next({ resource: op, subject: v.subject }, `${scope}-expand`))}
    `)

ViewTemplates.default.when.scopeMatches(Scope).renders(() => '')

export interface ResourceButtonModel {
  resource?: HydraResource;
  subject?: HydraResource;
  predicate?: RdfProperty;
}

class ResourceButtons extends LitView {
  public static get properties() {
    return {
      predicate: { type: Object },
    }
  }

  public value: ResourceButtonModel

  public constructor() {
    super()
    this.templateScope = Scope
    this.value = {}
  }

  public get resource() {
    return this.value.resource
  }

  public set resource(resource) {
    this.value = {
      ...this.value,
      resource,
    }
  }

  public get subject() {
    return this.value.subject
  }

  public set subject(subject) {
    this.value = {
      ...this.value,
      subject,
    }
  }

  public get predicate() {
    return this.value.predicate
  }

  public set predicate(predicate) {
    this.value = {
      ...this.value,
      predicate,
    }
  }
}

customElements.define(Scope, ResourceButtons)
