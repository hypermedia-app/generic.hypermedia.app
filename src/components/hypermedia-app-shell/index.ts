import AlcaeusLoader from '@hydrofoil/alcaeus-loader'
import { HydrofoilPaperShell } from '@hydrofoil/hydrofoil-paper-shell/hydrofoil-paper-shell'
import '@hydrofoil/hydrofoil-paper-shell/hydrofoil-resource-accordion'
import '@polymer/paper-spinner/paper-spinner'
import { HydraInvokeOperationEvent } from '../../forms'

export default class HypermediaAppShell extends AlcaeusLoader(HydrofoilPaperShell) {
  public connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('hydra-invoke-operation', this.__invokeOperation.bind(this))
  }

  private async __invokeOperation(e: HydraInvokeOperationEvent) {
    let response
    if (e.detail.operation.requiresInput) {
      response = await e.detail.operation.invoke(e.detail.body)
    } else {
      response = await e.detail.operation.invoke(null)
    }

    this.model = response.root
  }
}

customElements.define('hypermedia-app-shell', HypermediaAppShell)
