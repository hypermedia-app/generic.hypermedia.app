import HydrofoilShell from '@hydrofoil/hydrofoil-shell'
import {customElement, observe} from '@polymer/decorators'

@customElement('hypermedia-app')
export default class HypermediaApp extends HydrofoilShell {
  public connectedCallback() {
    super.connectedCallback()
    import('../entrypoint-selector')
  }

  @observe('isLoading')
  private async onLoaded(isLoading) {
    if (isLoading) {
      await import('../../views')
    }
  }
}
