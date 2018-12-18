import ViewTemplates from '@lit-any/lit-any/views'
import {HydraResource} from 'alcaeus/types/Resources'
import {html} from 'lit-html'

ViewTemplates.default.when
  .valueMatches((v: HydraResource) =>
    v.types && v.types.contains && v.types.contains('http://www.w3.org/ns/hydra/core#Collection'))
  .renders((r, v) => {
    return html`Collection`
  })
