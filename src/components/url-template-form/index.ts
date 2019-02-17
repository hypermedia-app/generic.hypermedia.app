import {computed, customElement, property, query} from '@polymer/decorators'
import {html, PolymerElement} from '@polymer/polymer'

import '@lit-any/lit-any/lit-form'
import '../../forms'

const decorator = {
  unwrap: (v) => {
    if (typeof v === 'object' && v !== null) {
      v = v['@value']
    }

    return v || ''
  },
  wrap: (formValue) => {
    return {
      '@value': formValue,
    }
  },
}

@customElement('url-template-form')
export default class extends PolymerElement {
  @property({ type: Object })
  public template: any

  @property({ type: Object, notify: true })
  public filters: object

  @computed('template')
  public get contract() {
    return {
      fields: this.template.mappings.map((f) => ({
        property: f.property.id,
        title: f.property.title || f.variable,
        type: f.property.range,
        valueDecorator: decorator,
      })),
    }
  }

  @query('lit-form')
  private form: any

  private submit() {
    this.dispatchEvent(new CustomEvent('submit', {
      detail: {
        url: this.template.expand(this.form.value),
      },
    }))
  }

  static get template() {
    return html`
<style>
  :host {
    --lit-form-field: {
      flex: 1;
      margin: 5px;
    }

    --lit-form-fieldset: {
      display: flex;
      flex-direction: row;
    }
  }
</style>

<lit-form no-labels contract="[[contract]]"
                          submit-button-label="Filter"
                          value="[[filters]]"
                          on-submit="submit"></lit-form>`
  }
}
