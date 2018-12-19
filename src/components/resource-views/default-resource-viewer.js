import { LitElement } from '@polymer/lit-element';
import { html } from 'lit-html';
export default class DefaultResourceViewer extends LitElement {
    static get properties() {
        return {
            resource: Object,
        };
    }
    _render({ resource }) {
        return html `${resource.id}`;
    }
}
customElements.define('default-resource-viewer', DefaultResourceViewer);
