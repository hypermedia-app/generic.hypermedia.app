import ViewTemplates from '@lit-any/lit-any/views'
import {html} from 'lit-html'

ViewTemplates.default.when
  .scopeMatches((s) => !s)
  .valueMatches((v) => typeof(v) === 'object' && v !== null)
  .renders((r, v, property) => {
    import('../components/resource-views/default-resource-viewer')
    return html`<default-resource-viewer property="${property}" resource="${v}"></default-resource-viewer>`
  })
