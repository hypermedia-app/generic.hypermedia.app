import ViewTemplates from '@lit-any/lit-any/views'
import {html} from 'lit-html'

ViewTemplates.default.when
  .scopeMatches('hydrofoil-shell')
  .valueMatches((v) => v.id)
  .renders((v) => {
    import('@hydrofoil/hydrofoil-paper-shell/hydrofoil-resource-accordion')
    return html`<hydrofoil-resource-accordion .root="${v}"></hydrofoil-resource-accordion>`
  })
