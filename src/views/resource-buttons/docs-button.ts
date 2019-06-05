import {ViewTemplates} from '@lit-any/views'
import iconButton from './button-render'
import {IResourceButtonModel} from './index'
import {Scope} from './scope'

function showClassDocumentation({ resource }: IResourceButtonModel) {
  return function() {
    this.dispatchEvent(new CustomEvent('console-open-documentation', {
      bubbles: true,
      composed: true,
      detail: {
        class: resource.id,
      },
    }))
  }
}

ViewTemplates.default.when
  .scopeMatches(Scope)
  .valueMatches((v: IResourceButtonModel) => v.predicate && v.predicate['@id'] === '@type')
  .renders(iconButton('help-outline', showClassDocumentation))
