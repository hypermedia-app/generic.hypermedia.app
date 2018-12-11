import { HydraResource } from 'alcaeus/types/Resources'

// import 'bower:mat-elements/mat-list.html'

import { computed, customElement } from '@polymer/decorators/lib/decorators'
import { html, PolymerElement } from '@polymer/polymer'
import '@polymer/polymer/lib/elements/dom-repeat'
import { Helpers } from 'LdNavigation/ld-navigation'

@customElement('entrypoint-menu')
class EntrypointMenu extends PolymerElement {
  public entrypoint: HydraResource

  @computed('entrypoint')
  get links() {
    return this.entrypoint.apiDocumentation
      .getProperties(this.entrypoint.types[0])
      .filter((sp) => {
        return sp.property.types.indexOf('http://www.w3.org/ns/hydra/core#Link') !== -1
      })
  }

  public load(e: CustomEvent) {
    Helpers.fireNavigation(this, this.entrypoint[e.model.link.property.id].id)
  }

  static get template() {
    return html`<mat-list>
    <dom-repeat items="[[links]]" as="link">
    <template>
    <mat-item label="[[link.title]]" on-xp-activate="load">[[link.title]]</mat-item>
    </template>
</dom-repeat>
</mat-list>`
  }
}
