import { render, screen, waitFor } from '@testing-library/angular';
import user from '@testing-library/user-event';
import { ButtonGroupComponent } from './button-group.component';
import * as sinon from 'sinon';
import { expect } from '../../../test/test-utils';

describe('ButtonGroupComponent', () => {

  const sandbox = sinon.createSandbox();
  let onClick : sinon.SinonSpy;
  
  beforeEach(() => {
    onClick = sandbox.fake();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should select value on click', async () => {
    await render(ButtonGroupComponent, {
      componentProperties: {
        options: [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
          { value: 'c', label: 'C' },
        ],
        defaultValue: 'b',
        onClick: {
          emit: onClick
        } as any
      }
    });

    const buttons = screen.getAllByRole('button');
    expect(buttons).to.have.lengthOf(3);

    expect(buttons[0]).not.to.have.class('button-selected');
    expect(buttons[1]).to.have.class('button-selected');
    expect(buttons[2]).not.to.have.class('button-selected');

    user.click(screen.getByText('A'));

    await waitFor(() => {
      expect(onClick).to.have.been.calledWith('a');
    });

    expect(buttons[0]).to.have.class('button-selected');
    expect(buttons[1]).not.to.have.class('button-selected');
    expect(buttons[2]).not.to.have.class('button-selected');

    user.click(screen.getByText('C'));

    await waitFor(() => {
      expect(onClick).to.have.been.calledWith('c');
    });

    expect(buttons[0]).not.to.have.class('button-selected');
    expect(buttons[1]).not.to.have.class('button-selected');
    expect(buttons[2]).to.have.class('button-selected');
  });
});
