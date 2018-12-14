import {IHydraResource} from 'alcaeus/types/Resources'
// import 'bower:mat-elements/mat-list.html'
// import 'bower:mat-elements/mat-sublist.html'
import './entrypoint-menu'
import './resource-outline'

import { customElement, observe, property } from '@polymer/decorators'
import { html, PolymerElement } from '@polymer/polymer'

@customElement('side-menu')
export default class SideMenu extends PolymerElement {
  @property({ type: Object })
  public resource: IHydraResource

  @property({ type: Object, readOnly: true })
  public readonly entrypoint: IHydraResource

  @observe('resource')
  public _getEntrypoint(resource: IHydraResource) {
    resource.apiDocumentation.loadEntrypoint()
      .then((entrypoint) => {
        this._setProperty('entrypoint', entrypoint.root)
      })
      .catch(() => {
        this._setProperty('entrypoint', {})
      })
  }

  static get template() {
    return html` <style>:host { display: block }</style>
<mat-list>
    <mat-sublist label="Main menu" collapsible>
        <entrypoint-menu entrypoint="[[entrypoint]]"></entrypoint-menu>
    </mat-sublist>
    <mat-sublist label="Resource outline" collapsible collapsed>
        <resource-outline root-resource="[[resource]]"></resource-outline>
    </mat-sublist>
</mat-list>`
  }
}
