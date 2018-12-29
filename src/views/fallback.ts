import ViewTemplates from '@lit-any/lit-any/views'
import {html} from 'lit-html'

ViewTemplates.default.when
  .scopeMatches((s) => !s)
  .valueMatches((v) => v !== null && Array.isArray(v))
  .renders((r, v, property) => {
    import('../components/resource-views/alcaeus-resource-viewer')

    if (v.length > 1) {
      return html`<div style="display: flex">
<alcaeus-resource-viewer .resource="${v[v.length - 2]}" narrow></alcaeus-resource-viewer>
<alcaeus-resource-viewer .resource="${v[v.length - 1]}" closeable></alcaeus-resource-viewer>
</div>`
    }

    return html`<alcaeus-resource-viewer .resource="${v[0]}"></alcaeus-resource-viewer>`
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
