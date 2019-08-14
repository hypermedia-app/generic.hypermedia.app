import { ViewTemplates } from '@lit-any/views'
import '@hydrofoil/alcaeus-forms/alcaeus-form'
import { Operation } from 'alcaeus/lib/es/Resources/Operation'
import { IOperation } from 'alcaeus/types/Resources'
import { html } from 'lit-html'

function runOperation(operation: IOperation) {
  return (e: any) => {
    e.target.dispatchEvent(new CustomEvent('hydra-invoke-operation', {
      detail: {
        operation,
        body: e.target.value,
      },
      bubbles: true,
      composed: true,
    }))
  }
}

ViewTemplates.default.when
  .scopeMatches('hydrofoil-multi-resource')
  .valueMatches(v => v instanceof Operation)
  .renders((operation: IOperation) =>
    html`<alcaeus-form .operation="${operation}"
                       @submit="${runOperation(operation)}"
                       no-labels no-legend></alcaeus-form>`)
