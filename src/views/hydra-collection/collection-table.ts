import ViewTemplates from '@lit-any/lit-any/views'
import {Vocab} from 'alcaeus'
import {rdf} from 'alcaeus/lib/es/Vocabs'
import {Collection, HydraResource} from 'alcaeus/types/Resources'
import fireNavigation from 'ld-navigation/fireNavigation'
import {html} from 'lit-html'
import {repeat} from 'lit-html/directives/repeat'
import {typedResource} from '../matchers'

function search(e) {
  fireNavigation(e.detail.url)
}

function getCollectionProperties(collection: Collection) {
  const typeManagesBlock = collection.manages.find((managesBlock) => managesBlock.property.id === rdf.type)

  if (typeManagesBlock) {
    return typeManagesBlock.object.supportedProperties
  }

  if (collection.members.length > 0) {
    return collection.members[0].getProperties().map((t) => t.supportedProperty)
  }

  return []
}

ViewTemplates.default.when
  .valueMatches(typedResource(Vocab('Collection')))
  .scopeMatches('collection-members')
  .renders((collection: Collection & any, render) => {
    const properties = getCollectionProperties(collection)
    const searchTemplate = collection[Vocab('search' as any)] // TODO: remove with alcaeus 0.6.3

    if (searchTemplate) {
      import('../../components/url-template-form')
    }

    return html`<link href="//cdn.muicss.com/mui-0.9.41/css/mui.min.css" rel="stylesheet" type="text/css" />

${searchTemplate ? html`<url-template-form .template="${searchTemplate}"
                   @submit="${search}"
                   .filters="${collection.currentFilter}"></url-template-form>` : ''}

<table class="mui-table">
  <thead>
    <tr>
      ${repeat(properties, (property) => html`
        <th>
          <span>
            <property-label .supportedProperty="${property}"></property-label>
          </span>
        </th>`)}
        <th></th>
    </tr>
  </thead>
  <tbody>
    ${repeat(collection.members, (member: HydraResource) => html`
      <tr>
        ${repeat(properties, (property) => html`
          <td>
            <span>${render(
              member[property.property.id] || '',
              'leaf-value',
              {
                isLink: property.property.isLink,
                parent: collection,
              })}</span>
          </td>`)}
        <td>
            <resource-buttons .resource="${member}" .subject="${collection}"></resource-buttons>
        </td>
      </tr>`)}
  </tbody>
</table>`
  })
