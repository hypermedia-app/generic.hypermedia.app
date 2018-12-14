import HydrofoilShell from '@hydrofoil/hydrofoil-shell'
import {customElement} from '@polymer/decorators'

@customElement('hf-app')
export default class HfApp extends HydrofoilShell {
  public connectedCallback() {
    super.connectedCallback()
    import('../../entrypoint-selector')
  }
}
