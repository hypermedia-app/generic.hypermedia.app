import AlcaeusLoader from '@hydrofoil/alcaeus-loader'
import { HydrofoilPaperShell } from '@hydrofoil/hydrofoil-paper-shell/hydrofoil-paper-shell'
import '@hydrofoil/hydrofoil-paper-shell/hydrofoil-resource-accordion'
import '@polymer/paper-spinner/paper-spinner'
import { Hydra } from 'alcaeus'
import { ReflectedInHash } from 'ld-navigation'
import { IHydraResponse } from 'alcaeus/types/HydraResponse'
import { HydraInvokeOperationEvent } from '../../forms'

export default class HypermediaAppShell extends ReflectedInHash(AlcaeusLoader(HydrofoilPaperShell)) {
  public constructor() {
    super()
    this.clientBasePath = ''
  }

  public connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('hydra-invoke-operation', this.__invokeOperation.bind(this))
  }

  private async __invokeOperation(e: HydraInvokeOperationEvent) {
    let response: IHydraResponse
    if (e.detail.operation.requiresInput) {
      let { body } = e.detail
      if (typeof body === 'object' && !(body instanceof File)) {
        body = JSON.stringify(body)
      }

      response = await e.detail.operation.invoke(body, e.detail.headers)
    } else {
      response = await e.detail.operation.invoke(null, e.detail.headers)
    }

    if (response.xhr.status === 201 && response.xhr.headers.has('location')) {
      response = await Hydra.loadResource(response.xhr.headers.get('Location'))
    }

    this.model = response.root
    if (this.model) {
      (this as any).resourceUrl = this.model.id
      this.reflectUrlInState(this.model.id)
    }
  }
}

customElements.define('hypermedia-app-shell', HypermediaAppShell)
