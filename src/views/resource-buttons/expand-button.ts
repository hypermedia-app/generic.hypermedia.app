import { ViewTemplates } from '@lit-any/views'
import { Operation } from 'alcaeus/lib/es/Resources/Operation'
import iconButton from './button-render'
import { ResourceButtonModel } from './index'
import { Scope } from './scope'

export function expand({ resource, subject }: ResourceButtonModel) {
  return function () {
    this.dispatchEvent(
      new CustomEvent('hydrofoil-append-resource', {
        bubbles: true,
        composed: true,
        detail: {
          parent: subject,
          resource,
        },
      }),
    )
  }
}

ViewTemplates.default.when
  .scopeMatches(`${Scope}-expand`)
  .valueMatches((v: ResourceButtonModel) => v.resource instanceof Operation)
  .renders(iconButton('image:flash-on', expand))

ViewTemplates.default.when
  .scopeMatches(`${Scope}-expand`)
  .valueMatches((v: ResourceButtonModel) => !!v.resource && !!v.resource.id)
  .renders(iconButton('zoom-in', expand))

ViewTemplates.default.when.scopeMatches(`${Scope}-expand`).renders(() => '')
