import { render, screen } from '@testing-library/react';
import CarCard from '@/components/CarCard';

const mockCar = {
  id: "1",
  make: "Toyota",
  model: "Camry",
  year: 2022,
  price: 25000,
  description: "Test description",
  images: ["/test-image.jpg"],
  specifications: {
    engine: "2.5L",
    transmission: "Automatic",
    mileage: "32 MPG",
    fuelType: "Gasoline"
  }
};

describe('CarCard', () => {
  it('renders car information correctly', () => {
    render(<CarCard car={mockCar} />);
    
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
    expect(screen.getByText('$25,000')).toBeInTheDocument();
  });

  it('formats price correctly', () => {
    render(<CarCard car={mockCar} />);
    expect(screen.getByText('$25,000')).toBeInTheDocument();
  });

  it('renders specifications correctly', () => {
    render(<CarCard car={mockCar} />);
    expect(screen.getByText('Automatic')).toBeInTheDocument();
    expect(screen.getByText('Gasoline')).toBeInTheDocument();
  });

  it('links to correct car detail page', () => {
    render(<CarCard car={mockCar} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/car/${mockCar.id}`);
  });
}); 