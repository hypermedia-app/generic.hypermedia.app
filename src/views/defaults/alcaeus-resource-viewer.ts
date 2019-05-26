import ViewTemplates from '@lit-any/lit-any/views'
import {html} from 'lit-html'

ViewTemplates.default.when
  .scopeMatches('hydrofoil-multi-resource')
  .valueMatches((v) => v !== null && v['@id'])
  .renders((v) => {
    import('../../components/resource-views/alcaeus-resource-viewer')
    return html`<alcaeus-resource-viewer .resource="${v}"></alcaeus-resource-viewer>`
  })
