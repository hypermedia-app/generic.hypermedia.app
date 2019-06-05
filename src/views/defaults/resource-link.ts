import {ViewTemplates} from '@lit-any/views'
import {IResource} from 'alcaeus/types/Resources/Resource'
import {html} from 'lit-html'
import {getPath} from '../helpers'

ViewTemplates.default.when
  .valueMatches((v: IResource) => v && v.id && !v.isAnonymous)
  .renders((v: IResource, r, scope, params) => {
    import('@polymer/iron-icon/iron-icon')

    if (params.isLink) {
      return html`<ld-link resource-url="${v.id}">
<a><iron-icon icon=link></iron-icon></a>
</ld-link>`
    }

    return getPath(v.id)
  })
