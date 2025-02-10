export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  description: string;
  images: string[];
  specifications: {
    engine: string;
    transmission: string;
    mileage: string;
    fuelType: string;
  };
}

interface ApiCar {
  id: number;
  car: string;  // make
  car_model: string;
  car_color: string;
  car_model_year: number;
  car_vin: string;
  price: string;
  availability: boolean;
}

const API_URL = 'https://myfakeapi.com/api/cars/';

export const getCars = async (
  page: number = 1,
  limit: number = 10,
  search?: string,
  filters?: {
    make?: string;
    model?: string;
    year?: number;
    minPrice?: number;
    maxPrice?: number;
  },
  sort?: {
    field: 'price' | 'year';
    order: 'asc' | 'desc';
  }
): Promise<{ cars: Car[]; total: number }> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error('Failed to fetch cars');
    }

    const data = await response.json();
    
    // Transform API data
    let cars: Car[] = data.cars.map((apiCar: ApiCar) => ({
      id: apiCar.id.toString(),
      make: apiCar.car,
      model: apiCar.car_model,
      year: apiCar.car_model_year,
      price: parseFloat(apiCar.price.replace('$', '')),
      description: `${apiCar.car_model_year} ${apiCar.car} ${apiCar.car_model} - ${apiCar.car_color}`,
      images: ['/images/car-placeholder.jpg'],
      specifications: {
        engine: '2.0L',
        transmission: 'Automatic',
        mileage: '30 mpg',
        fuelType: 'Gasoline'
      }
    }));

    // Apply search
    if (search) {
      const searchLower = search.toLowerCase();
      cars = cars.filter(car => 
        car.make.toLowerCase().includes(searchLower) ||
        car.model.toLowerCase().includes(searchLower) ||
        car.year.toString().includes(searchLower)
      );
    }

    // Apply filters
    if (filters) {
      if (filters.make) {
        cars = cars.filter(car => 
          car.make.toLowerCase().includes(filters.make!.toLowerCase())
        );
      }
      if (filters.model) {
        cars = cars.filter(car => 
          car.model.toLowerCase().includes(filters.model!.toLowerCase())
        );
      }
      if (filters.year) {
        const filterYear = Number(filters.year);
        cars = cars.filter(car => car.year === filterYear);
      }
      if (filters.minPrice) {
        cars = cars.filter(car => car.price >= filters.minPrice!);
      }
      if (filters.maxPrice) {
        cars = cars.filter(car => car.price <= filters.maxPrice!);
      }
    }

    // Apply sorting
    if (sort) {
      cars.sort((a, b) => {
        const aValue = a[sort.field];
        const bValue = b[sort.field];
        return sort.order === 'asc' ? aValue - bValue : bValue - aValue;
      });
    }

    // Apply pagination
    const start = (page - 1) * limit;
    const paginatedCars = cars.slice(start, start + limit);

    return {
      cars: paginatedCars,
      total: cars.length,
    };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getCarById = async (id: string): Promise<Car | null> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch cars');
    }
    const data = await response.json();
    const apiCar = data.cars.find((car: ApiCar) => car.id.toString() === id);
    
    if (!apiCar) return null;

    return {
      id: apiCar.id.toString(),
      make: apiCar.car,
      model: apiCar.car_model,
      year: apiCar.car_model_year,
      price: parseFloat(apiCar.price.replace('$', '')),
      description: `${apiCar.car_model_year} ${apiCar.car} ${apiCar.car_model} - ${apiCar.car_color}`,
      images: [
        '/images/car-placeholder.jpg',
      ],
      specifications: {
        engine: '2.0L',
        transmission: 'Automatic',
        mileage: '30 mpg',
        fuelType: 'Gasoline'
      }
    };
  } catch (error) {
    console.error('Error fetching car:', error);
    return null;
  }
}; 
