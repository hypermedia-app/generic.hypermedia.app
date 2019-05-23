import ViewTemplates from '@lit-any/lit-any/views'
import {HydraResource} from 'alcaeus/types/Resources'
import 'ld-navigation/ld-link'
import {html} from 'lit-html'
import '../../components/api-documentation/property-label'
import {typedResource} from '../matchers'

ViewTemplates.default.when
  .valueMatches(typedResource('http://www.w3.org/ns/hydra/core#Collection'))
  .scopeMatches('hydrofoil-multi-resource')
  .renders((collection, render) => {
    const pcv = collection.views
      .filter((v) => !!v)
      .filter((v: HydraResource) => v.types.contains('http://www.w3.org/ns/hydra/core#PartialCollectionView'))
    const view = pcv[0]

    return html`<div>${render(collection, 'collection-members')}
                ${view ? html`<lit-view .value="${view}" template-scope="collection-pager"></lit-view>` : ''}</div>`
  })
