import ViewTemplates from '@lit-any/lit-any/views'
import {html} from 'lit-html'

ViewTemplates.default.when
  .scopeMatches('hydrofoil-shell')
  .valueMatches((v) => v.id)
  .renders((v, property) => {
    import('@hydrofoil/hydrofoil-paper-shell/hydrofoil-resource-tabs')
    return html`<hydrofoil-resource-tabs .root="${v}"></hydrofoil-resource-tabs>`
  })

ViewTemplates.default.when
  .scopeMatches('hydrofoil-multi-resource')
  .valueMatches((v) => v !== null && v['@id'])
  .renders((v) => {
    import('../components/resource-views/alcaeus-resource-viewer')
    return html`<alcaeus-resource-viewer .resource="${v}"></alcaeus-resource-viewer>`
  })

ViewTemplates.default.when
  .valueMatches((v) => !!v['@id'] && !v['@id'].match(/^_/)) // TODO: simpler way to tell a blank node
  .renders((v) => {
    import('@polymer/iron-icon/iron-icon')

    return html`<ld-link resource-url="${v['@id']}">
<a><iron-icon icon=link></iron-icon></a>
</ld-link>
`
  })

ViewTemplates.default.when
  .valueMatches(() => true)
  .renders((v) => v)
