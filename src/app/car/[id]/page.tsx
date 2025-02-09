'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCarById, Car } from '@/services/api';
import ImageCarousel from '@/components/ImageCarousel';

export default function CarDetails() {
  const params = useParams();
  const router = useRouter();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        const result = await getCarById(params.id as string);
        if (!result) {
          setError('Car not found');
        } else {
          setCar(result);
        }
      } catch (error) {
        console.error(error);
        setError('Failed to load car details');
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">{error}</h2>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        ← Back to Listings
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="w-full">
          <ImageCarousel 
            images={car.images} 
            alt={`${car.make} ${car.model}`} 
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">
            {car.make} {car.model} {car.year}
          </h1>
          <p className="text-2xl text-green-600 font-bold mb-6">
            ${car.price.toLocaleString()}
          </p>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600 leading-relaxed">{car.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Specifications</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-700">Engine</p>
                <p className="text-gray-600">{car.specifications.engine}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-700">Transmission</p>
                <p className="text-gray-600">{car.specifications.transmission}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-700">Mileage</p>
                <p className="text-gray-600">{car.specifications.mileage}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-700">Fuel Type</p>
                <p className="text-gray-600">{car.specifications.fuelType}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 