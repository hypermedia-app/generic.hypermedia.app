import { computed, customElement, query, observe, property } from '@polymer/decorators'
import { PaperDropdownMenuElement } from '@polymer/paper-dropdown-menu/paper-dropdown-menu'
import { PaperToastElement } from '@polymer/paper-toast/paper-toast'
import { html, PolymerElement } from '@polymer/polymer'
import { Class, IApiDocumentation } from 'alcaeus/types/Resources'
import { shrink } from '../../../lib/shrink'

import '@polymer/paper-dropdown-menu/paper-dropdown-menu'
import '@polymer/paper-item/paper-item'
import '@polymer/paper-listbox/paper-listbox'
import '@polymer/paper-toast/paper-toast'
import '@polymer/polymer/lib/elements/dom-repeat'
import '../supported-classes/supported-class-view'

import template from './viewer.html'
import style from './viewer.pcss'

@customElement('api-documentation-viewer')
export default class ApiDocumentationViewer extends PolymerElement {
  @computed('selectedClass')
  public get classFound(): boolean {
    return !!this.selectedClass
  }

  @property({ type: Object })
  public apiDocs: IApiDocumentation

  @property({ type: Array })
  public modelTypes: string[] = []

  @property({ type: Object })
  public selectedClass: Class

  @computed('selectedClass')
  public get prefixedSelectedClassId() {
    if (!this.selectedClass) {
      return ''
    }

    return shrink(this.selectedClass.id)
  }

  @query('paper-toast')
  private toast: PaperToastElement

  @query('#classSelect')
  private classSelect: PaperDropdownMenuElement

  public classClicked(e) {
    this.selectClassById(e.model.item.id)
  }

  public connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback()
    }
    this.toast.fitInto = this
  }

  public selectClassById(classId: string) {
    if (!this.apiDocs || !this.apiDocs.classes) {
      return
    }

    const clazz = this.apiDocs.classes.find((c: Class) => c.id === classId)

    this.selectClass(clazz)
  }

  @observe('apiDocs', 'modelTypes')
  public selectCurrentClass(apiDocs: IApiDocumentation, types: string[]) {
    if (!apiDocs || !apiDocs.classes) {
      return
    }

    const clazz = apiDocs.classes.find((c: Class) => types.some(t => c.id === t))

    this.selectClass(clazz)
  }

  public isCurrent(typeId: string) {
    return this.modelTypes.some(t => t === typeId)
  }

  private onClassSelected(e: CustomEvent) {
    this.selectClass(e.detail.classId)
    e.preventDefault()
  }

  private closeToast() {
    this.toast.close()
  }

  private selectClass(clas: any) {
    if (typeof clas === 'string') {
      this.selectClassById(clas)
    }

    this.selectedClass = clas

    if (!clas) {
      this.toast.open()
      this.classSelect.value = null
    } else {
      this.toast.close()
      this.classSelect.value = clas.title
    }
  }

  public static get template() {
    return html([`<style>${style}</style> ${template}`] as any)
  }
}
