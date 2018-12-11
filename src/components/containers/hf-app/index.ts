import { computed, customElement, listen, property } from '@polymer/decorators'
import { DeclarativeEventListeners } from '@polymer/decorators/lib/declarative-event-listeners.js'
import { microTask } from '@polymer/polymer/lib/utils/async'
import { Debouncer } from '@polymer/polymer/lib/utils/debounce'
import { IHydraResource } from 'alcaeus/types/Resources'

import { html, PolymerElement } from '@polymer/polymer/polymer-element'
import {Hydra} from 'alcaeus'
import css from './style.pcss'
import template from './template.html'

import '@polymer/app-layout'
import '@polymer/iron-icon/iron-icon'
import '@polymer/iron-icons/av-icons'
import '@polymer/iron-icons/iron-icons'
import '@polymer/iron-pages/iron-pages'
import '@polymer/paper-icon-button/paper-icon-button'
import '@polymer/paper-input/paper-input'
import { PaperInputElement } from '@polymer/paper-input/paper-input'
import '@polymer/paper-spinner/paper-spinner'
import '@polymer/paper-styles/default-theme'
import '@polymer/paper-styles/paper-styles'
import '@polymer/paper-styles/typography'

import {Helpers} from 'LdNavigation/ld-navigation'
import '../../helper-elements/loading-overlay'

type ConsoleState = 'ready' | 'loaded' | 'error' | 'operation'

@customElement('hf-app')
export default class HfApp extends DeclarativeEventListeners(PolymerElement) {

  @computed('model')
  get hasApiDocumentation() {
    return !!this.model && !!this.model.apiDocumentation
  }

  @computed('*')
  get urlInput(): PaperInputElement {
    return this.$.resource as PaperInputElement
  }

  @computed('currentModel')
  get displayedModel(): IHydraResource {
    return this.currentModel.collection || this.currentModel
  }

  static get template() {
    return html([`<style>${css}</style> ${template}`] as TemplateStringsArray)
  }

  @property({ type: Object })
  public model: IHydraResource = null

  @property({ type: String })
  public url: string

  @property({ type: Object })
  public currentModel: IHydraResource

  @property({ type: Object, readOnly: true })
  public readonly lastError: Error

  @property({ type: String, notify: true })
  public state: ConsoleState = 'ready'

  @property({ type: Boolean, readOnly: true, notify: true })
  private readonly isLoading: boolean = false

  private prevState: ConsoleState

  public hasPreviousModel(modelHistory: any) {
    return modelHistory.base.length > 0
  }

  public connectedCallback() {
    super.connectedCallback()
    import('../../entrypoint-selector')
  }

  public showDocs() {
    this.$.documentation.open()
  }

  public load() {
    this._setIsLoading(true)
    Helpers.fireNavigation(this, this.$.resource.value)
  }

  public showModel(ev: CustomEvent) {
    this.push('_modelHistory', this.currentModel)
    this.currentModel = ev.detail
  }

  @listen('show-class-documentation', document)
  public async showDocumentation(e: CustomEvent) {
    await import('../../api-documentation/viewer/viewer')

    this.$.apiDocumentation.selectClass(e.detail.classId)
    this.showDocs()

    e.stopPropagation()
  }

  @listen('show-inline-resource', document)
  public showResource(e: CustomEvent) {
    this.currentModel = e.detail.resource
  }

  @listen('show-resource-json', document)
  public async showResourceJson(e: CustomEvent) {
    await import('../../resource-views/resource-json')

    this.$.source.resource = e.detail.resource
    this.$.source.show()
  }

  public hideOperationForm() {
    this.state = this.prevState || 'ready'
  }

  private async loadResource(value: string) {
    await import('../../entrypoint-selector')

    try {
      const hr = await Hydra.loadResource(value)
      const res = hr.root

      this.model = res
      this.currentModel = res
      this.state = 'loaded'
      this._setIsLoading(false)

      this._loadOutlineElement()
    } catch (err) {
      this._setLastError(err)
      this.state = 'error'
      this._setIsLoading(false)
    }
  }

  private _loadOutlineElement() {
    import('../../side-menu/side-menu')
  }

  private urlChanged(e: CustomEvent) {
    Debouncer.debounce(
      null,
      microTask,
      () => {
        if (e.detail.value !== '/') {
          this.$.resource.value = e.detail.value
          if (!this.$.resource.invalid) {
            this._setIsLoading(true)
            this.loadResource(this.$.resource.value)
          }
        }
      })
  }

  private loadOnEnter(e: KeyboardEvent) {
    if (e.keyCode === 13) {
      this.load()
    }
  }

  private _loadDocElements(e: CustomEvent) {
    if (e.detail.value === true) {
      import('../../api-documentation/viewer/viewer')
    }
  }

  private _focusUrlInput() {
    this.$.resource.focus()
  }

  private howOperationForm(e: CustomEvent) {
    if (e.detail.operation.requiresInput === false) {
      e.detail.operation.invoke()
    } else {
      this.prevState = this.state
      this.state = 'operation'
    }
  }

  private executeOperation() {
    alert('op')
  }
}
