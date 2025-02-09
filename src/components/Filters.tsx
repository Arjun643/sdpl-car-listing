import { useState } from 'react';

interface FiltersProps {
  onFilterChange: (filters: any) => void;
  onSortChange: (sort: { field: 'price' | 'year'; order: 'asc' | 'desc' }) => void;
}

export default function Filters({ onFilterChange, onSortChange }: FiltersProps) {
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    year: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue: string | number = value;

    // Convert year to number if it's a valid number
    if (name === 'year' && value) {
      newValue = parseInt(value);
      if (isNaN(newValue)) return; // Don't update if not a valid number
    }

    const newFilters = { ...filters, [name]: newValue };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md sticky top-4">
      <h2 className="text-xl font-semibold mb-6">Filters</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Make
          </label>
          <input
            type="text"
            name="make"
            placeholder="e.g. Toyota"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filters.make}
            onChange={handleFilterChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Model
          </label>
          <input
            type="text"
            name="model"
            placeholder="e.g. Camry"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filters.model}
            onChange={handleFilterChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Year
          </label>
          <input
            type="number"
            name="year"
            placeholder="e.g. 2022"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filters.year || ''}
            onChange={handleFilterChange}
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              name="minPrice"
              placeholder="Min"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.minPrice}
              onChange={handleFilterChange}
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <div className="relative">
            <select
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                onSortChange({ 
                  field: field as 'price' | 'year', 
                  order: order as 'asc' | 'desc' 
                });
              }}
              className="w-full p-3 border rounded-lg appearance-none bg-white pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select sorting option...</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="year-desc">Year: Newest First</option>
              <option value="year-asc">Year: Oldest First</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setFilters({
              make: '',
              model: '',
              year: '',
              minPrice: '',
              maxPrice: '',
            });
            onFilterChange({});
          }}
          className="w-full mt-4 p-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
} 