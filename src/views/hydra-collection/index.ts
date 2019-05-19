import ViewTemplates from '@lit-any/lit-any/views'
import {rdf} from 'alcaeus/lib/es/Vocabs'
import {Collection, HydraResource} from 'alcaeus/types/Resources'
import fireNavigation from 'ld-navigation/fireNavigation'
import 'ld-navigation/ld-link'
import {html} from 'lit-html'
import {repeat} from 'lit-html/directives/repeat'
import '../../components/api-documentation/property-label'
import {typedResource} from '../matchers'

function search(e) {
  fireNavigation(e.detail.url)
}

function getCollectionProperties(collection: Collection) {
  const typeManagesBlock = collection.manages.find((managesBlock) => managesBlock.predicate.id === rdf.type)

  if (typeManagesBlock) {
    return typeManagesBlock.object.supportedProperties
  }

  if (collection.members.length > 0) {
    return collection.members[0].getProperties().map((t) => t.supportedProperty)
  }

  return []
}

ViewTemplates.default.when
  .valueMatches(typedResource('http://www.w3.org/ns/hydra/core#Collection'))
  .scopeMatches('collection-members')
  .renders((collection: Collection & any, render) => {
    const properties = getCollectionProperties(collection)
    const searchTemplate = collection['http://www.w3.org/ns/hydra/core#search']

    if (searchTemplate) {
      import('../../components/url-template-form')
    }

    function more(model) {
      return (e) => {
        e.target.dispatchEvent(new CustomEvent('hydrofoil-append-resource', {
          bubbles: true,
          composed: true,
          detail: {
            parent: collection,
            resource: model,
          },
        }))
      }
    }

    return html`<link href="//cdn.muicss.com/mui-0.9.41/css/mui.min.css" rel="stylesheet" type="text/css" />

<url-template-form .template="${searchTemplate}"
                   @submit="${search}"
                   .filters="${collection.currentFilter}"></url-template-form>

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
              <span>${render(member[property.property.id] || '', 'collection-member')}</span>
          </td>`)}
          <td>
              <ld-link resource-url="${member.id}">
                  <paper-icon-button icon="chevron-right"></paper-icon-button>
              </ld-link>

              <paper-icon-button icon="link" @click="${more(member)}"></paper-icon-button>
          </td>
      </tr>`)}
  </tbody>
</table>`
  })

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

ViewTemplates.default.when
  .valueMatches(typedResource('http://www.w3.org/ns/hydra/core#PartialCollectionView'))
  .renders((view) => {
    import('@polymer/paper-button/paper-button')
    import('@polymer/paper-card/paper-card')

    const disableFirst = !view.first || view.first.id === view.id
    const disablePrevious = !view.previous
    const disableNext = !view.next
    const disableLast = !view.last || view.last.id === view.id

    function go(page) {
      fireNavigation(page.id)
    }

    const style = html`
    paper-card {
      position: fixed;
      bottom:0;
      width: 100%
    }

    @supports(position:sticky) {
      paper-card { position: sticky }
    }`

    return html`<style>${style}</style><paper-card elevation="1" style="">
      <div class="card-actions">
          <paper-button @click="${go.bind(null, view.first)}" ?disabled="${disableFirst}">First</paper-button>
          <paper-button @click="${go.bind(null, view.previous)}" ?disabled="${disablePrevious}">Previous</paper-button>
          <paper-button @click="${go.bind(null, view.next)}" ?disabled="${disableNext}">Next</paper-button>
          <paper-button @click="${go.bind(null, view.last)}" ?disabled="${disableLast}">Last</paper-button>
      </div>
  </paper-card>`
  })
