import AlcaeusLoader from '@hydrofoil/alcaeus-loader'
import { HydrofoilPaperShell } from '@hydrofoil/hydrofoil-paper-shell/hydrofoil-paper-shell'
import '@hydrofoil/hydrofoil-paper-shell/hydrofoil-resource-accordion'
import '@polymer/paper-spinner/paper-spinner'

export default class HypermediaAppShell extends AlcaeusLoader(HydrofoilPaperShell) {}

customElements.define('hypermedia-app-shell', HypermediaAppShell)
