import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from './Search';

const mockSetCity = jest.fn();

global.fetch = jest.fn();

describe('Search Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
    jest.useRealTimers();
  });

  test('fetches and displays city options based on input', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        results: [
          { name: 'Berlin', country: 'Germany', latitude: 52.52, longitude: 13.405 },
          { name: 'Bern', country: 'Switzerland', latitude: 46.948, longitude: 7.4474 },
        ],
      }),
    });

    render(<Search setLocation={mockSetCity} />);

    const input = screen.getByRole('combobox');

    fireEvent.change(input, { target: { value: 'Ber' } });

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(`${process.env.REACT_APP_API_URL}search?name=Ber`)
      );
    });

    expect(screen.getByText('Berlin, Germany')).toBeInTheDocument();
    expect(screen.getByText('Bern, Switzerland')).toBeInTheDocument();
  });
});
