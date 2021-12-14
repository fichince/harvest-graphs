import { render, waitFor } from '@testing-library/angular';
import * as sinon from 'sinon';
import { expect } from '../test/test-utils';

import { AppComponent } from './app.component';
import { GraphConfigMenuComponent } from './components/graph-config-menu/graph-config-menu.component';
import { ApiService } from './services/api.service';
import { ButtonGroupComponent } from './components/button-group/button-group.component';
import { TimeFramePickerComponent } from './components/time-frame-picker/time-frame-picker.component';
import { GraphConfigService } from './services/graph-config.service';
import { GraphComponent } from './components/graph/graph.component';

describe('AppComponent', () => {

  const sandbox = sinon.createSandbox();
  let apiServiceStub : sinon.SinonStubbedInstance<ApiService>;
  let graphConfigServiceStub : sinon.SinonStubbedInstance<GraphConfigService>;

  beforeEach(() => {
    apiServiceStub = sandbox.createStubInstance(ApiService);
    apiServiceStub.getTimeEntries.resolves([]);

    graphConfigServiceStub = sandbox.createStubInstance(GraphConfigService);
    graphConfigServiceStub.getConfig.returns({
      duration: 'month',
      start: '2021-10-01',
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should make an API request when config changes', async () => {
    const { fixture } = await render(AppComponent, {
      declarations: [ 
        GraphConfigMenuComponent,
        ButtonGroupComponent,
        TimeFramePickerComponent,
        GraphComponent,
      ],
      providers: [
        {
          provide: ApiService,
          useValue: apiServiceStub,
        },
        {
          provide: GraphConfigService,
          useValue: graphConfigServiceStub,
        }
      ]
    });

    fixture.componentInstance.handleConfigChange();

    await waitFor(() => {
      expect(apiServiceStub.getTimeEntries).to.have.been.calledWith('2021-10-01', '2021-10-31')
    });
  });
});
