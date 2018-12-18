import HydrofoilShell from '@hydrofoil/hydrofoil-shell'
import {customElement, observe} from '@polymer/decorators'

@customElement('hf-app')
export default class HfApp extends HydrofoilShell {
  public connectedCallback() {
    super.connectedCallback()
    import('../../entrypoint-selector')
  }

  @observe('isLoading')
  private async onLoaded(isLoading) {
    if (isLoading) {
      await import('../../../views')
    }
  }
}
