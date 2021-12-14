import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render, act } from '@testing-library/react';
import { shallow } from 'enzyme';
import Timer from '../src/app/components/Timer';

afterEach(cleanup);

test('Content rendered', () => {
    const component = renderer.create(
        <Timer />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


it('Timer start the text after click START button', () => {
    const { getByRole, getByLabelText, getByTestId } = render(
        <Timer />,
    );
    fireEvent.change(getByLabelText(/minute-input/i), { target: { value: '1' } });
    fireEvent.change(getByLabelText(/second-input/i), { target: { value: '5' } });
    fireEvent.click(getByRole('button', { name: /START/i }));
    expect(getByTestId(/running-clock/i).textContent).toEqual('01:05');
});

it('Timer reset the text after click RESET button', () => {
    const { getByRole, getByLabelText, getByTestId } = render(
        <Timer />,
    );
    fireEvent.change(getByLabelText(/minute-input/i), { target: { value: '1' } });
    fireEvent.change(getByLabelText(/second-input/i), { target: { value: '5' } });
    fireEvent.click(getByRole('button', { name: /START/i }));
    expect(getByTestId(/running-clock/i).textContent).toEqual('01:05');
    // reset
    fireEvent.click(getByRole('button', { name: /RESET/i }));
    expect(getByTestId(/running-clock/i).textContent).toEqual('00:00');
});

it('Timer pause/resume the text after click PAUSE/RESUME button', async () => {
    jest.useFakeTimers();
    const { getByRole, getByLabelText, getByTestId } = render(
        <Timer />,
    );
    fireEvent.change(getByLabelText(/minute-input/i), { target: { value: '1' } });
    fireEvent.change(getByLabelText(/second-input/i), { target: { value: '5' } });
    fireEvent.click(getByRole('button', { name: /START/i }));
    expect(getByTestId(/running-clock/i).textContent).toEqual('01:05');
    // Pause
    act(() => {
        jest.advanceTimersByTime(2000);
    });
    fireEvent.click(getByRole('button', { name: /PAUSE \/ RESUME/i }));
    expect(getByTestId(/running-clock/i).textContent).toEqual('01:03');

    // Resume
    fireEvent.click(getByRole('button', { name: /PAUSE \/ RESUME/i }));
    act(() => {
        jest.advanceTimersByTime(2000);
    });
    expect(getByTestId(/running-clock/i).textContent).toEqual('01:01');
});