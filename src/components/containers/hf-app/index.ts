import {customElement, computed, property, listen} from '@polymer/decorators';
import {DeclarativeEventListeners} from '@polymer/decorators/lib/declarative-event-listeners.js';
import {Debouncer} from '@polymer/polymer/lib/utils/debounce';
import {microTask} from '@polymer/polymer/lib/utils/async';
import {IHydraResource} from 'alcaeus/types/Resources';

import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import css from './style.pcss'
import template from './template.html'

import '@polymer/paper-input/paper-input'
import '@polymer/app-layout'
import '@polymer/iron-pages/iron-pages'
import '@polymer/iron-icons/iron-icons'
import '@polymer/iron-icon/iron-icon'
import '@polymer/iron-icons/av-icons'
import '@polymer/paper-icon-button/paper-icon-button'
import '@polymer/paper-styles/default-theme';
import '@polymer/paper-styles/typography';
import '@polymer/paper-styles/paper-styles';

// import './libs/Templates.js';
// import './libs/Utils.js';
//
// import './helper-elements/loading-overlay';
// import 'bower:ld-navigation/ld-navigation.html';
type ConsoleState = 'ready' | 'loaded' | 'error' | 'operation';

@customElement('hf-app')
export default class HfApp extends DeclarativeEventListeners(PolymerElement) {

  @property({ type: Object })
  model: IHydraResource = null;

  @property({ type: String })
  url: string;

  @property({ type: Object })
  currentModel: IHydraResource;

  @property({ type: Object, readOnly: true })
  readonly lastError: Error;

  @property({ type: String, notify: true })
  state: ConsoleState = 'ready';

  @property({ type: Boolean })
  readonly isLoading: boolean = false;

  _prevState: ConsoleState;

  @computed('model')
  get hasApiDocumentation() {
    return !!this.model && !!this.model.apiDocumentation
  }

  @computed('*')
  get urlInput(): PaperInput {
    return this.$.resource;
  }

  hasPreviousModel(_modelHistory: any) {
    return _modelHistory.base.length > 0;
  }

  connectedCallback() {
    super.connectedCallback();
    // Polymer.importHref('dist/entrypoint-selector.html');
  }

  showDocs() {
    this.$.documentation.open();
  }

  load() {
    this._setIsLoading(true);
    // LdNavigation.Helpers.fireNavigation(this, this.$.resource.value);
  }

  loadResource(value: string) {
    Polymer.importHref('dist/entrypoint-selector.html', async () => {
      try {
        const hr = await Hypermedia.Hydra.loadResource(value);
        const res = hr.root;

        this.model = res;
        this.currentModel = res;
        this.state = 'loaded';
        this._setIsLoading(false);

        this._loadOutlineElement();
      } catch(err) {
        this._setLastError(err);
        this.state = 'error';
        this._setIsLoading(false);
        console.error(err);
      }
    });
  }

  _loadOutlineElement() {
    // Polymer.importHref('dist/menus/side-menu.html');
  }

  urlChanged(e: CustomEvent) {
    Debouncer.debounce(
      null,
      microTask,
      () => {
        if (e.detail.value !== '/') {
          this.$.resource.value = e.detail.value;
          if (!this.$.resource.invalid) {
            this._setIsLoading(true);
            this.loadResource(this.$.resource.value);
          }
        }
      });
  }

  loadOnEnter(e: KeyboardEvent) {
    if (e.keyCode === 13) {
      this.load();
    }
  }

  @computed('currentModel')
  get displayedModel (): IHydraResource {
    return this.currentModel.collection || this.currentModel;
  }

  showModel(ev: CustomEvent) {
    this.push('_modelHistory', this.currentModel);
    this.currentModel = ev.detail;
  }

  _loadDocElements(e: CustomEvent) {
    if(e.detail.value === true) {
      // Polymer.importHref('dist/api-documentation/viewer.html');
    }
  }

  @listen('show-class-documentation', document)
  showDocumentation(e: CustomEvent) {
    Polymer.importHref('dist/api-documentation/viewer.html', () => {
      this.$.apiDocumentation.selectClass(e.detail.classId);
      this.showDocs();
    });

    e.stopPropagation();
  }


  @listen('show-inline-resource', document)
  showResource(e: CustomEvent) {
    this.currentModel = e.detail.resource;
  }

  @listen('show-resource-json', document)
  showResourceJson(e: CustomEvent) {
    Polymer.importHref('dist/resource-views/resource-json.html', () => {
      this.$.source.resource = e.detail.resource;
      this.$.source.show();
    });
  }

  _focusUrlInput() {
    this.$.resource.focus();
  }

  showOperationForm(e: CustomEvent) {
    if (e.detail.operation.requiresInput == false) {
      e.detail.operation.invoke();
    } else {
      this._prevState = this.state;
      this.state = 'operation';
    }
  }

  hideOperationForm() {
    this.state = this._prevState || 'ready';
  }

  executeOperation() {
    alert('op');
  }

  static get template() {
    return html([`<style>${css}</style> ${template}`]);
  }
}
