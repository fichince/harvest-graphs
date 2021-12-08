import { render, screen, waitFor } from '@testing-library/angular';
import user from '@testing-library/user-event';

import { GraphConfigMenuComponent } from './graph-config-menu.component';
import { GraphConfigService } from '../../services/graph-config.service';
import { ButtonGroupComponent } from '../button-group/button-group.component';
import { TimeFramePickerComponent } from '../time-frame-picker/time-frame-picker.component';

import * as sinon from 'sinon';
import { expect } from '../../../test/test-utils';

describe('GraphConfigMenuComponent', () => {

  const sandbox = sinon.createSandbox();
  let onChange : sinon.SinonSpy;

  let graphConfigService : GraphConfigService;

  beforeEach(() => {
    graphConfigService = new GraphConfigService();

    // today is October 15, 2021
    sandbox.useFakeTimers(new Date(2021, 9, 15));
    onChange = sandbox.fake();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should update config service when it changes', async () => {
    await render(GraphConfigMenuComponent, {
      declarations: [
        ButtonGroupComponent, TimeFramePickerComponent
      ],
      providers: [
        {
          provide: GraphConfigService,
          useValue: graphConfigService,
        }
      ],
      componentProperties: {
        onChange: {
          emit: onChange
        } as any
      }
    });

    user.click(screen.getByText('Month'));
    user.click(screen.getByTestId('time-frame-prev'));

    await waitFor(() => expect(onChange).to.have.been.called);

    const config = graphConfigService.getConfig();
    expect(config).to.deep.equal({
      start: '2021-09-01',
      duration: 'month',
    });
  });
});
