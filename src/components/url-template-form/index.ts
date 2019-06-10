import '@lit-any/forms/lit-form'
import {css, customElement, html, LitElement, property, query} from 'lit-element'
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
export default class UrlTemplateForm extends LitElement {
  @property({ type: Object })
  public template: any

  @property({ type: Object })
  public filters: object

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

  private static get fieldStyle() {
    return css`flex: 1; margin: 5px;`
  }

  private static get fieldsetStyle() {
    return css`display: flex; flex-direction: row;`
  }

  @query('lit-form')
  private form: any

  public render() {
    return html`
<lit-form no-labels .contract="${this.contract}"
                          submit-button-label="Filter"
                          .fieldStyles="${UrlTemplateForm.fieldStyle}"
                          .fieldsetStyles="${UrlTemplateForm.fieldsetStyle}"
                          .value="${this.filters}"
                          @submit="${this.submit}"></lit-form>`
  }

  private submit() {
    this.dispatchEvent(new CustomEvent('submit', {
      detail: {
        url: this.template.expand(this.form.value),
      },
    }))
  }
}
