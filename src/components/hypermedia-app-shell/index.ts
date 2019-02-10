import AlcaeusLoader from '@hydrofoil/alcaeus-loader'
import {HydrofoilPaperShell} from '@hydrofoil/hydrofoil-paper-shell/hydrofoil-paper-shell'
import '@hydrofoil/hydrofoil-paper-shell/hydrofoil-resource-accordion'
import {customElement} from 'lit-element'

@customElement('hypermedia-app-shell')
export default class HypermediaAppShell extends AlcaeusLoader(HydrofoilPaperShell) {
}
