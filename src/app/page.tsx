'use client';

import { useState, useEffect, useCallback } from 'react';
import { getCars, Car } from '@/services/api';
import CarCard from '@/components/CarCard';
import Filters from '@/components/Filters';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import Pagination from 'react-js-pagination';

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState<{ field: 'price' | 'year'; order: 'asc' | 'desc' } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const ITEMS_PER_PAGE = 12;


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fetchCars = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getCars(page, ITEMS_PER_PAGE, search, filters, sort || undefined);
      setCars(result.cars);
      setTotal(result.total);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [page, ITEMS_PER_PAGE, search, filters, sort]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Car Listings</h1>
      
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="Search cars by make, model, or year..."
            className="w-full p-5 pl-14 text-lg border-2 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={search}
            onChange={handleSearch}
          />
          <svg
            className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters */}
        <div className="md:col-span-1">
          <Filters
            onFilterChange={setFilters}
            onSortChange={setSort}
          />
        </div>
        
        {/* Car Grid */}
        <div className="md:col-span-3">
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="text-center py-10">
              <div className="text-red-500 text-xl mb-4">
                Failed to load cars
              </div>
              <button
                onClick={fetchCars}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl shadow-md">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map(car => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>

              {/* React JS Pagination */}
              {total > ITEMS_PER_PAGE && (
                <div className="mt-8 flex justify-center">
                  <Pagination
                    activePage={page}
                    itemsCountPerPage={ITEMS_PER_PAGE}
                    totalItemsCount={total}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                    innerClass="flex gap-2"
                    itemClass="px-3 py-2 rounded-lg border hover:bg-gray-50 transition-colors"
                    activeClass="!bg-blue-500 text-white border-blue-500 hover:!bg-blue-600"
                    disabledClass="opacity-50 cursor-not-allowed"
                    linkClass="cursor-pointer"
                    firstPageText="First"
                    lastPageText="Last"
                    prevPageText={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    }
                    nextPageText={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    }
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
