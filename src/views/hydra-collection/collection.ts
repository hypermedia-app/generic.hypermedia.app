import { ViewTemplates } from '@lit-any/views'
import { Vocab } from 'alcaeus'
import { Collection, HydraResource, IView } from 'alcaeus/types/Resources'
import 'ld-navigation/ld-link'
import { html } from 'lit-html'
import '../../components/api-documentation/property-label'
import { typedResource } from '../matchers'

ViewTemplates.default.when
  .valueMatches(typedResource(Vocab('Collection')))
  .scopeMatches('hydrofoil-multi-resource')
  .renders((collection: Collection, render) => {
    const pcv = collection.views
      .filter(v => !!v)
      .filter((v: HydraResource & IView) => v.types.contains(Vocab('PartialCollectionView')))
    const view = pcv[0]

    return html`
      <div>
        ${render(collection, 'collection-members')}
        ${view
          ? html`
              <lit-view .value="${view}" template-scope="collection-pager"></lit-view>
            `
          : ''}
      </div>
    `
  })
