import { TimeFramePickerComponent } from './time-frame-picker.component';
import { render, screen, waitFor } from '@testing-library/angular';
import user from '@testing-library/user-event';
import * as sinon from 'sinon';
import { expect } from '../../../test/test-utils';

describe('TimeFramePickerComponent', () => {

  const sandbox = sinon.createSandbox();

  let clock : sinon.SinonFakeTimers;
  let onChange : sinon.SinonSpy;

  beforeEach(() => {
    // today is October 15, 2021
    clock = sandbox.useFakeTimers(new Date(2021, 9, 15));
    onChange = sandbox.fake();
  });

  afterEach(() => {
    sandbox.restore();
  });

  const doRender = () => {
    return render(TimeFramePickerComponent, {
      componentProperties: {
        duration: 'week',
        onChange: {
          emit: onChange
        } as any
      }
    });
  };

  it('should render timeframe description', async () => {

    const { change } = await doRender();

    expect(screen.getByText('This Week')).to.exist;
    expect(onChange.getCall(0).args[0]).to.equal('2021-10-10');

    change({ duration: 'month' });
    expect(screen.getByText('This Month')).to.exist;
    expect(onChange.getCall(1).args[0]).to.equal('2021-10-01');
    
    change({ duration: 'year' });
    expect(screen.getByText('This Year')).to.exist;
    expect(onChange.getCall(2).args[0]).to.equal('2021-01-01');
  });

  describe('Clicking arrows', () => {
    it('should change weeks when clicking the arrows', async () => {

      await doRender();
      expect(onChange.getCall(0).args[0]).to.equal('2021-10-10');

      user.click(screen.getByTestId('time-frame-prev'));
      expect(screen.getByText('Last Week')).to.exist;
      expect(onChange.getCall(1).args[0]).to.equal('2021-10-03');

      user.click(screen.getByTestId('time-frame-prev'));
      expect(screen.getByText('2 Weeks Ago')).to.exist;
      expect(onChange.getCall(2).args[0]).to.equal('2021-09-26');

      user.click(screen.getByTestId('time-frame-prev'));
      expect(screen.getByText('3 Weeks Ago')).to.exist;
      expect(onChange.getCall(3).args[0]).to.equal('2021-09-19');

      user.click(screen.getByTestId('time-frame-next'));
      expect(screen.getByText('2 Weeks Ago')).to.exist;
      expect(onChange.getCall(2).args[0]).to.equal('2021-09-26');

    });

    it('should change months when clicking the arrows', async () => {
      const { change } = await doRender();
      expect(onChange.getCall(0).args[0]).to.equal('2021-10-10');

      change({ duration: 'month' });
      expect(screen.getByText('This Month')).to.exist;
      expect(onChange.getCall(1).args[0]).to.equal('2021-10-01');

      user.click(screen.getByTestId('time-frame-prev'));
      expect(screen.getByText('Last Month')).to.exist;
      expect(onChange.getCall(2).args[0]).to.equal('2021-09-01');

      user.click(screen.getByTestId('time-frame-prev'));
      expect(screen.getByText('2 Months Ago')).to.exist;
      expect(onChange.getCall(3).args[0]).to.equal('2021-08-01');

      user.click(screen.getByTestId('time-frame-prev'));
      expect(screen.getByText('3 Months Ago')).to.exist;
      expect(onChange.getCall(4).args[0]).to.equal('2021-07-01');

      user.click(screen.getByTestId('time-frame-next'));
      expect(screen.getByText('2 Months Ago')).to.exist;
      expect(onChange.getCall(5).args[0]).to.equal('2021-08-01');

    });

    it('should change years when clicking the arrows', async () => {
      const { change } = await doRender();
      expect(onChange.getCall(0).args[0]).to.equal('2021-10-10');

      change({ duration: 'year' });
      expect(screen.getByText('This Year')).to.exist;
      expect(onChange.getCall(1).args[0]).to.equal('2021-01-01');

      user.click(screen.getByTestId('time-frame-prev'));
      expect(screen.getByText('Last Year')).to.exist;
      expect(onChange.getCall(2).args[0]).to.equal('2020-01-01');

      user.click(screen.getByTestId('time-frame-prev'));
      expect(screen.getByText('2 Years Ago')).to.exist;
      expect(onChange.getCall(3).args[0]).to.equal('2019-01-01');

      user.click(screen.getByTestId('time-frame-prev'));
      expect(screen.getByText('3 Years Ago')).to.exist;
      expect(onChange.getCall(4).args[0]).to.equal('2018-01-01');

      user.click(screen.getByTestId('time-frame-next'));
      expect(screen.getByText('2 Years Ago')).to.exist;
      expect(onChange.getCall(5).args[0]).to.equal('2019-01-01');

    });

    it('should not allow going past the current time frame', async () => {
      await doRender();
      expect(onChange.callCount).to.equal(1);

      expect(screen.getByTestId('time-frame-next')).to.have.attribute('disabled');
      user.click(screen.getByTestId('time-frame-next'));
      // doesn't click
      expect(onChange.callCount).to.equal(1);
    });
  });
});
