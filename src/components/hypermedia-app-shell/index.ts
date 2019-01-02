import {HydrofoilPaperShell} from '@hydrofoil/hydrofoil-paper-shell/hydrofoil-paper-shell'
import {html} from '@polymer/lit-element'

import '@hydrofoil/hydrofoil-paper-shell/hydrofoil-resource-accordion'

export default class HypermediaAppShell extends HydrofoilPaperShell {
  protected renderMain() {
    return html`<hydrofoil-resource-accordion .root="${this.model}"></hydrofoil-resource-accordion>`
  }
}
