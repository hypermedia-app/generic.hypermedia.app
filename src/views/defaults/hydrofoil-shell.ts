import {ViewTemplates} from '@lit-any/views'
import {IResource} from 'alcaeus/types/Resources/Resource'
import {html} from 'lit-html'

ViewTemplates.default.when
  .scopeMatches('hydrofoil-shell')
  .valueMatches((v: IResource) => !!v.id)
  .renders((v) => {
    import('@hydrofoil/hydrofoil-paper-shell/hydrofoil-resource-accordion')
    return html`<hydrofoil-resource-accordion .root="${v}"></hydrofoil-resource-accordion>`
  })
