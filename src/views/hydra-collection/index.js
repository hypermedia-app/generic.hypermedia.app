import ViewTemplates from '@lit-any/lit-any/views';
import { html } from 'lit-html';
ViewTemplates.default.when
    .valueMatches((v) => v.types && v.types.contains && v.types.contains('http://www.w3.org/ns/hydra/core#Collection'))
    .renders((r, v) => {
    return html `Collection`;
});
