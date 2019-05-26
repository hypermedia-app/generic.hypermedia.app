import ViewTemplates from '@lit-any/lit-any/views'
import {IResource} from 'alcaeus/types/Resources/Resource'
import {html} from 'lit-html'
import {more} from '../helpers'

ViewTemplates.default.when
  .valueMatches((v: IResource) => v && v.isAnonymous)
  .renders((v: IResource, r, scope, params) => {
    import('@polymer/paper-icon-button/paper-icon-button')

    return html`<paper-icon-button icon="zoom-in" @click="${more(v, params.parent)}"></paper-icon-button>`
  })
