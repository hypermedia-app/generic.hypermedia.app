import ViewTemplates from '@lit-any/lit-any/views'
import fireNavigation from 'ld-navigation/fireNavigation'
import {html} from 'lit-html'
import {typedResource} from '../matchers'

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
