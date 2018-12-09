import {computed, customElement, observe, property } from '@polymer/decorators'
import '@polymer/paper-toast/paper-toast'
import {html, PolymerElement} from '@polymer/polymer'
import '@vaadin/vaadin-combo-box/vaadin-combo-box'
import {Class, IApiDocumentation} from 'alcaeus/types/Resources'
import '../supported-classes/supported-class-view'

import style from './viewer.pcss'
import template from './viewer.html'

@customElement('api-documentation-viewer')
class ApiDocumentationViewer extends PolymerElement {

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

  public selectClass(classId: string) {
    if (!this.apiDocs || !this.apiDocs.classes) {
      return
    }

    const clazz = this.apiDocs.classes.find((c: Class) => {
      return c.id === classId
    })

    selectClass.call(this, clazz)
  }

  @observe('apiDocs', 'modelTypes')
  public selectCurrentClass(apiDocs: IApiDocumentation, types: string[]) {
    if (!apiDocs || !apiDocs.classes) {
      return
    }

    const clazz = apiDocs.classes.find((c: Class) => {
      return types.some((t) => c.id === t)
    })

    selectClass.call(this, clazz)
  }

  public isCurrent(typeId: string) {
    return this.modelTypes.some((t) => {
      return t === typeId
    })
  }

  private onClassSelected(e: CustomEvent) {
    this.selectClass(e.detail.classId)
    e.preventDefault()
  }

  private closeToast() {
    this.$.toast.close()
  }

  static get template() {
    return html([`<style>${style}</style> ${template}`])
  }
}

function selectClass(clas: Class) {
  this.selectedClass = clas

  if (!clas) {
    this.$.toast.open()
    this.$.classSelect.value = null
  } else {
    this.$.toast.close()
    this.$.classSelect.value = clas.id
  }
}
