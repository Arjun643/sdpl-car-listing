import { render, screen, fireEvent } from '@testing-library/react';
import Filters from '@/components/Filters';

describe('Filters', () => {
  it('calls onFilterChange when inputs change', () => {
    const mockOnFilterChange = jest.fn();
    const mockOnSortChange = jest.fn();

    render(
      <Filters 
        onFilterChange={mockOnFilterChange}
        onSortChange={mockOnSortChange}
      />
    );

    const makeInput = screen.getByPlaceholderText(/e.g. Toyota/i);
    fireEvent.change(makeInput, { target: { value: 'Toyota' } });

    expect(mockOnFilterChange).toHaveBeenCalled();
  });

  it('clears all filters when reset button clicked', () => {
    const mockOnFilterChange = jest.fn();
    render(
      <Filters 
        onFilterChange={mockOnFilterChange}
        onSortChange={() => {}}
      />
    );
    
    const clearButton = screen.getByText(/clear all filters/i);
    fireEvent.click(clearButton);
    
    expect(mockOnFilterChange).toHaveBeenCalledWith({});
  });

  it('calls onSortChange with correct values', () => {
    const mockOnSortChange = jest.fn();
    render(
      <Filters 
        onFilterChange={() => {}}
        onSortChange={mockOnSortChange}
      />
    );
    
    const sortSelect = screen.getByRole('combobox');
    fireEvent.change(sortSelect, { target: { value: 'price-asc' } });
    
    expect(mockOnSortChange).toHaveBeenCalledWith({
      field: 'price',
      order: 'asc'
    });
  });
}); 