import ViewTemplates from '@lit-any/lit-any/views'
import {html} from 'lit-html'

ViewTemplates.default.when
  .scopeMatches((s) => !s)
  .valueMatches((v) => typeof(v) === 'object' && v !== null)
  .renders((r, v, property) => {
    import('../components/resource-views/alcaeus-resource-viewer')
    return html`<alcaeus-resource-viewer .resource="${v}"></alcaeus-resource-viewer>`
  })

ViewTemplates.default.when
  .valueMatches((v) => !!v['@id'] && !v['@id'].match(/^_/)) // TODO: simpler way to tell a blank node
  .renders((r, v, ...rest) => {
    import('@polymer/iron-icon/iron-icon')

    return html`<ld-link resource-url="${v['@id']}">
<a><iron-icon icon=link></iron-icon></a>
</ld-link>
`
  })

ViewTemplates.default.when
  .valueMatches(() => true)
  .renders((r, v) => v)
