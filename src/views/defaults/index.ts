/* tslint:disable:ordered-imports */
import { ViewTemplates } from '@lit-any/views'
import './hydrofoil-shell'
import './alcaeus-resource-viewer'
import './resource-link'
import './zoom-to-blank-icon'
import './operation-form'
import { html } from 'lit-html'

ViewTemplates.default.when
  .valueMatches(v => typeof v !== 'object')
  .renders((v: any) => v)

ViewTemplates.default.when
  .valueMatches(v => Array.isArray(v))
  .renders(
    (v: unknown[], render) =>
      html`
        ${v.map(
          el =>
            html`
              ${render(el)}
            `,
        )}
      `,
  )
