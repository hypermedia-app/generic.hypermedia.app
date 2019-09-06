import PaperElements from '@lit-any/components-paper-elements'
import { FieldTemplates } from '@lit-any/forms'
import { IOperation } from 'alcaeus/types/Resources'
import { html } from 'lit-html'

FieldTemplates.default.useComponents(PaperElements)

export interface HydraInvokeOperationEvent {
  detail: {
    operation: IOperation;
    body: object | string;
    headers?: HeadersInit;
  };
}

FieldTemplates.default
  .when
  .fieldMatches(field => field.type === 'file')
  .renders((f, id, v, set) => html`<input id="${id}" required="${f.required}" accept="text/csv,text/tsv" type=file @change="${(e: any) => set(e.target.files[0])}">`)
