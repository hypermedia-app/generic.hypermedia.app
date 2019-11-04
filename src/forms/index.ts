import PaperElements from '@lit-any/components-paper-elements'
import { FieldTemplates } from '@lit-any/forms'
import { IOperation } from 'alcaeus/types/Resources'

FieldTemplates.default.useComponents(PaperElements)

export interface HydraInvokeOperationEvent {
  detail: {
    operation: IOperation;
    body: object | string;
    headers?: HeadersInit;
  };
}
