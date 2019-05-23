import ViewTemplates from '@lit-any/lit-any/views'
import {html} from 'lit-html'
import {getPath} from '../helpers'

ViewTemplates.default.when
  .valueMatches((v) => !!v['@id'] && !v['@id'].match(/^_/)) // TODO: simpler way to tell a blank node
  .renders((v, r, scope, params) => {
    import('@polymer/iron-icon/iron-icon')

    if (params.isLink) {
      return html`<ld-link resource-url="${v['@id']}">
<a><iron-icon icon=link></iron-icon></a>
</ld-link>`
    }

    return getPath(v.id)
  })
