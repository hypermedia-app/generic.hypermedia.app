import ViewTemplates from '@lit-any/lit-any/views'
import {html} from 'lit-html'
import {more} from '../helpers'

ViewTemplates.default.when
  .valueMatches((v) => !!v['@id'] && v['@id'].match(/^_/)) // TODO: simpler way to tell a blank node
  .renders((v, r, scope, params) => {
    import('@polymer/paper-icon-button/paper-icon-button')

    return html`<paper-icon-button icon="zoom-in" @click="${more(v, params.parent)}"></paper-icon-button>`
  })
