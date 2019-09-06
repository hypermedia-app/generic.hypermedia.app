import { ViewTemplates } from '@lit-any/views'
import '@hydrofoil/alcaeus-forms/alcaeus-form'
import { Operation } from 'alcaeus/lib/es/Resources/Operation'
import { IOperation } from 'alcaeus/types/Resources'
import { html } from 'lit-html'
import { FormContract } from '@lit-any/forms/lib/formContract'

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

function addSource(operation: IOperation) {
  return (e: any) => {
    const { file } = e.target.value

    e.target.dispatchEvent(new CustomEvent('hydra-invoke-operation', {
      detail: {
        operation,
        body: file,
        headers: {
          'Content-Disposition': `attachment; filename="${file.name}"`,
          'Content-Type': file.type,
        },
      },
      bubbles: true,
      composed: true,
    }))
  }
}

ViewTemplates.default.when
  .scopeMatches('hydrofoil-multi-resource')
  .valueMatches((v: IOperation) => v instanceof Operation && v.supportedOperation.id.match(/AddSource$/) !== null)
  .renders((operation: IOperation) => {
    const contract: FormContract = {
      target: operation.target.id,
      method: operation.method,
      title: operation.title,
      description: operation.description,
      fields: [
        {
          type: 'file',
          required: true,
          property: 'file',
          title: 'Source',
          description: '',
        },
      ],
    }

    return html`${operation.description} <lit-form .contract="${contract}"
                       @submit="${addSource(operation)}"
                       no-labels no-legend></lit-form>`
  })

ViewTemplates.default.when
  .scopeMatches('hydrofoil-multi-resource')
  .valueMatches(v => v instanceof Operation)
  .renders((operation: IOperation) =>
    html`${operation.description} <alcaeus-form .operation="${operation}"
                       @submit="${runOperation(operation)}"
                       no-labels no-legend></alcaeus-form>`)
