import '@polymer/iron-icons/iron-icons'
// import 'bower:mat-elements/mat-avatar.html'
// import 'bower:mat-elements/mat-divider.html'
// import 'bower:mat-elements/mat-item.html'
// import 'bower:mat-elements/mat-list.html'
// import 'bower:mat-elements/mat-sublist.html'
import '@polymer/paper-icon-button/paper-icon-button'
import {IHydraResource} from 'alcaeus/types/Resources'

import '../api-documentation/property-label'

import { computed, customElement, observe, property } from '@polymer/decorators'
import { html, PolymerElement } from '@polymer/polymer'
import template from './resource-outline.html'

@customElement('resource-outline')
export class ResourceOutline extends PolymerElement {
  @property({ type: Object })
  public rootResource: IHydraResource

  @property({ type: Object, readOnly: true })
  public readonly resource: IHydraResource

  @property({ type: Array, readOnly: true })
  public readonly history: IHydraResource[] = []

  @computed('resource')
  get resourceId(): string {
    return this.resource['@id']
  }

  @property({ type: Boolean })
  public readonly hasHistory = false

  @computed('resource')
  public get currentProperties() {
    const enumerableProperties = Object.entries(this.resource)
      .filter((entry) => entry[1]['@id'] || Array.isArray(entry[1]))
      .map((entry) => {
        const id = Array.isArray(entry[1])
          ? 'Multiple items'
          : entry[1]['@id']

        return {
          id,
          property: entry[0],
        }
      })

    return [ ...enumerableProperties ]
  }

  public _getPath(uri: string) {
    try {

      const url = new URL(uri)
      return url.pathname + url.search
    } catch (e) {
      return uri
    }
  }

  @observe()
  public _rootChanged(rootResource: IHydraResource) {
    this._setProperty('resource', rootResource)
  }

  public _changeResource(e: CustomEvent) {
    const property = e.target.data
    this.history.push(this.resource)
    this._setProperty('resource', this.resource[property])
    this._setProperty('hasHistory', true)
  }

  public _goUp() {
    const previous = this.history.pop()

    if (previous) {
      this._setProperty('resource', previous)
    }

    this._setProperty('hasHistory', this.history.length > 0)
  }

  public _showSource() {
    this.dispatchEvent(new CustomEvent('show-resource-json', {
      bubbles: true,
      composed: true,
      detail: {
        resource: this.resource,
      },
    }))
  }

  static get template() {
    return html([`${template}`] as any)
  }
}
