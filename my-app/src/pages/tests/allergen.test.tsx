import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../Home';

// Mock the supabaseClient to avoid actual API calls during testing
jest.mock('../../config/supabaseClient', () => ({
  __esModule: true,
  default: {
    from: () => ({
      select: jest.fn(() => ({
        data: [
          {
            id: 1,
            title: 'Smoothie 1',
            rating: 4.5,
            allergen: ['gluten'],
            ingredients: ['banana', 'milk'],
          },
          {
            id: 2,
            title: 'Smoothie 2',
            rating: 3.8,
            allergen: ['nuts', 'soy'],
            ingredients: ['strawberry', 'almond milk'],
          },
        ],
        error: null,
      })),
    }),
  },
}));

test('renders allergen data correctly', async () => {
  render(<Home />);

  // Wait for the smoothies to be loaded
  await screen.findByText('Smoothie 1');

  // Assert that the allergen data is correctly rendered for each smoothie
  const glutenLabels = screen.queryAllByText(/No gluten/i);
  const nutsSoyParagraphs = screen.queryAllByText(/nuts, soy/i);

  expect(glutenLabels).toHaveLength(1);
  expect(nutsSoyParagraphs).toHaveLength(1);

  // Select a specific allergen checkbox and check if it's properly handled
  const glutenCheckbox = screen.getByLabelText('No gluten');
  const nutsCheckbox = screen.getByLabelText('No nuts');

  fireEvent.click(glutenCheckbox);
  fireEvent.click(nutsCheckbox);

  expect(glutenCheckbox).not.toBeChecked();
  expect(nutsCheckbox).not.toBeChecked();

  fireEvent.click(glutenCheckbox);
  expect(glutenCheckbox).toBeChecked();
});
