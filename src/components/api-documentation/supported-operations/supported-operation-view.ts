import { customElement, observe, property } from '@polymer/decorators'
import { html, PolymerElement } from '@polymer/polymer'
import { Class, IOperation } from 'alcaeus/types/Resources'

import '../supported-classes/supported-class-link'

const nothing = 'http://www.w3.org/2002/07/owl#Nothing'

function setTitle(clas: Class, setter: () => {}) {
  let title: string
  if (!clas) {
    title = '?'
  } else {
    title = clas.id === nothing ? 'Nothing' : clas.title
  }

  setter.call(this, title)
}

@customElement('supported-operation-view')
export default class SupportedOperationView extends PolymerElement {
  @property({ type: Object })
  public supportedOperation: IOperation

  @property({ type: String, readOnly: true })
  public readonly expectsTitle: string

  @property({ type: String, readOnly: true })
  public readonly returnsTitle: string

  @property({ type: String, readOnly: true })
  public readonly hasExpects: string

  @property({ type: String, readOnly: true })
  public readonly hasReturns: string

  @observe('supportedOperation.expects')
  private expectsObserver(this: any, expects: Class) {
    this._setHasExpects(!!expects && expects.id !== nothing)
    setTitle.call(this, expects, this._setExpectsTitle)
  }

  @observe('supportedOperation.returns')
  private returnsObserver(this: any, returns: Class) {
    this._setHasReturns(!!returns && returns.id !== nothing)
    setTitle.call(this, returns, this._setReturnsTitle)
  }

  public static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        [hidden] {
          display: none;
        }
      </style>

      <p>
        [[supportedOperation.title]]
      </p>

      <p>
        [[supportedOperation.description]]
      </p>

      <p>
        <b>Expects</b>:
        <supported-class-link
          hidden$="[[!hasExpects]]"
          supported-class="[[supportedOperation.expects]]"
        ></supported-class-link>
        <span hidden$="[[hasExpects]]">[[expectsTitle]]</span>
      </p>

      <p>
        <b>Returns</b>:
        <supported-class-link
          hidden$="[[!hasReturns]]"
          supported-class="[[supportedOperation.returns]]"
        ></supported-class-link>
        <span hidden$="[[hasReturns]]">[[returnsTitle]]</span>
      </p>

      <div hidden$="[[!supportedOperation.statusCodes]]">
        <dom-repeat items="[[supportedOperation.statusCodes]]" as="status">
          <template>
            <p><b>[[status.code]]</b>: [[status.description]]</p>
          </template>
        </dom-repeat>
      </div>
    `
  }
}
