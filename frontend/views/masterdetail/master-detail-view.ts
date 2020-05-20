import * as Endpoint from "../../generated/PersonEndpoint";
import Entity from "../../generated/org/artur/masterdetail/data/entity/Person";
import { EndpointError } from '@vaadin/flow-frontend/Connect';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-form-layout';
import '@vaadin/vaadin-form-layout/vaadin-form-item';
import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-lumo-styles/badge';
import '@vaadin/vaadin-notification';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-split-layout/vaadin-split-layout';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-number-field';
import '@vaadin/vaadin-text-field/vaadin-password-field';
import { customElement, html, LitElement, query, unsafeCSS } from 'lit-element';
import { until } from 'lit-html/directives/until';
import { CSSModule } from '../../css-utils';
import styles from './master-detail-view.css';

@customElement('master-detail-view')
export class MasterDetailViewElement extends LitElement {
  static get styles() {
    return [CSSModule('lumo-typography'), CSSModule('lumo-badge'), unsafeCSS(styles)];
  }

  @query('#grid')
  private grid: any;

  @query('#notification')
  private notification: any;

  private gridDataProvider = this.getGridData.bind(this);

  // @ts-ignore preview
  private employeeId: number = -1;

  render() {
    return html`
      <vaadin-split-layout class="full-size">
        <div class="grid-wrapper">
          <vaadin-grid
            id="grid"
            class="full-size"
            theme="no-border"
            .size="${until(this.getGridDataSize(), 0)}"
            .dataProvider="${this.gridDataProvider}"
            @active-item-changed="${this.gridItemSelected}"
          >
            <vaadin-grid-column auto-width header=""><template><img class="profilePicture" src="[[item.profilePicture]]" /></template></vaadin-grid-column><vaadin-grid-column
      auto-width
      path="firstName"
      header="First Name"
    ></vaadin-grid-column><vaadin-grid-column
      auto-width
      path="lastName"
      header="Last Name"
    ></vaadin-grid-column><vaadin-grid-column
      auto-width
      path="email"
      header="Email"
    ></vaadin-grid-column><vaadin-grid-column
      auto-width
      path="title"
      header="Title"
    ></vaadin-grid-column>
          </vaadin-grid>
        </div>
        <div id="editor-layout">
          <vaadin-form-layout>
            <vaadin-form-layout><vaadin-form-item><label slot="label">Profile Picture</label><vaadin-text-field class="full-width" id="profilePicture"></vaadin-text-field></vaadin-form-item><vaadin-form-item><label slot="label">First Name</label><vaadin-text-field class="full-width" id="firstName"></vaadin-text-field></vaadin-form-item><vaadin-form-item><label slot="label">Last Name</label><vaadin-text-field class="full-width" id="lastName"></vaadin-text-field></vaadin-form-item><vaadin-form-item><label slot="label">Email</label><vaadin-text-field class="full-width" id="email"></vaadin-text-field></vaadin-form-item><vaadin-form-item><label slot="label">Title</label><vaadin-text-field class="full-width" id="title"></vaadin-text-field></vaadin-form-item></vaadin-form-layout>
          </vaadin-form-layout>
          <vaadin-horizontal-layout id="button-layout" theme="spacing">
            <vaadin-button theme="tertiary" @click="${this.clearForm}">
              Cancel
            </vaadin-button>
            <vaadin-button theme="primary" @click="${this.save}">
              Save
            </vaadin-button>
          </vaadin-horizontal-layout>
        </div>
      </vaadin-split-layout>
      <vaadin-notification duration="5000" id="notification"> </vaadin-notification>
    `;
  }

  async getGridDataSize() {
    return await Endpoint.count();
  }

  async getGridData(params: any, callback: any) {
    const index = params.page * params.pageSize;
    const data = await Endpoint.list(index, params.pageSize);
    callback(data);
  }

  async gridItemSelected(event: CustomEvent) {
    const item = event.detail.value;
    this.grid.selectedItems = item ? [item] : [];

    if (item) {
      this.employeeId = item.id;(this.shadowRoot!.querySelector('#profilePicture') as any).value = item.profilePicture;
(this.shadowRoot!.querySelector('#firstName') as any).value = item.firstName;
(this.shadowRoot!.querySelector('#lastName') as any).value = item.lastName;
(this.shadowRoot!.querySelector('#email') as any).value = item.email;
(this.shadowRoot!.querySelector('#title') as any).value = item.title;;
    } else {
      this.clearForm();
    }
  }

  private async save() {
    const entity: Entity ={ id: this.employeeId, profilePicture: (this.shadowRoot!.querySelector('#profilePicture' as any)).value, firstName: (this.shadowRoot!.querySelector('#firstName' as any)).value, lastName: (this.shadowRoot!.querySelector('#lastName' as any)).value, email: (this.shadowRoot!.querySelector('#email' as any)).value, title: (this.shadowRoot!.querySelector('#title' as any)).value};
    try {
      await Endpoint.update(entity);
      this.clearForm();
      this.grid.clearCache();
      this.showNotification('Person' + ' saved');
    } catch (error) {
      if (error instanceof EndpointError) {
        this.showNotification(`Server error. ${error.message}`);
        this.notification.open();
      } else {
        throw error;
      }
    }
  }

  private clearForm() {
    this.grid.selectedItems = [];
    this.employeeId = -1;(this.shadowRoot!.querySelector('#profilePicture') as any).value = "";
(this.shadowRoot!.querySelector('#firstName') as any).value = "";
(this.shadowRoot!.querySelector('#lastName') as any).value = "";
(this.shadowRoot!.querySelector('#email') as any).value = "";
(this.shadowRoot!.querySelector('#title') as any).value = "";;
  }

  private showNotification(message: string) {
    this.notification.renderer = (root: Element) => {
      root.textContent = message;
    };
    this.notification.open();
  }
}
