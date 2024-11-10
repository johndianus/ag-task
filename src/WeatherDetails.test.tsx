import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherDetails from './WeatherDetails';

const mockLocation = {
  name: 'Berlin',
  country: 'Germany',
  latitude: 52.52,
  longitude: 13.405,
};

const mockWeatherData = {
  timezone: 'Europe/Berlin',
  daily_units: {
    temperature_2m_max: '°C',
    temperature_2m_min: '°C',
    windspeed_10m_max: 'km/h',
  },
  daily: {
    time: ['2023-11-01', '2023-11-02', '2023-11-03'],
    weather_code: [0, 1, 3],
    temperature_2m_max: [10, 12, 8],
    temperature_2m_min: [5, 6, 4],
    windspeed_10m_max: [15, 10, 20],
  },
};

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: async () => mockWeatherData,
  } as Response);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('WeatherDetails Component', () => {
  test('fetches and displays weather details', async () => {
    render(<WeatherDetails location={mockLocation} />);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(`latitude=${mockLocation.latitude}&longitude=${mockLocation.longitude}`)
      );
    });

    await waitFor(() => {
      expect(screen.getByText('01-11-2023')).toBeInTheDocument();
      expect(screen.getByText('Clear sky')).toBeInTheDocument();
      expect(screen.getByText('5 °C - 10 °C')).toBeInTheDocument();
      expect(screen.getByText('15 km/h')).toBeInTheDocument();
    });

    expect(screen.getByText('02-11-2023')).toBeInTheDocument();
    expect(screen.getByText('Mainly clear')).toBeInTheDocument();
    expect(screen.getByText('6 °C - 12 °C')).toBeInTheDocument();
    expect(screen.getByText('10 km/h')).toBeInTheDocument();

    expect(screen.getByText('03-11-2023')).toBeInTheDocument();
    expect(screen.getByText('Overcast')).toBeInTheDocument();
    expect(screen.getByText('4 °C - 8 °C')).toBeInTheDocument();
    expect(screen.getByText('20 km/h')).toBeInTheDocument();
  });
});
