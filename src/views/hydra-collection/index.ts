import './collection'
import './collection-table'
import './pager'

import {ViewTemplates} from '@lit-any/views'
import {IResource} from 'alcaeus/types/Resources/Resource'
import {html} from 'lit-html'

ViewTemplates.default.when
  .valueMatches((v: IResource) => v && v.isAnonymous)
  .scopeMatches('leaf-value')
  .renders((v: IResource, r, scope, params) =>
    html`<resource-buttons .resource="${v}" .subject="${params.parent}"></resource-buttons>`)
