import { render, screen, fireEvent } from '@testing-library/react';
import ImageCarousel from '@/components/ImageCarousel';

const mockImages = ['/image1.jpg', '/image2.jpg', '/image3.jpg'];

describe('ImageCarousel', () => {
  it('navigates through images', () => {
    render(<ImageCarousel images={mockImages} alt="Test" />);
    const nextButton = screen.getByLabelText('Next image');
    fireEvent.click(nextButton);
    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', expect.stringContaining('image2.jpg'));
  });

  it('navigates backwards through images', () => {
    render(<ImageCarousel images={mockImages} alt="Test" />);
    const prevButton = screen.getByLabelText('Previous image');
    fireEvent.click(prevButton);
    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', expect.stringContaining('image3.jpg'));
  });

  it('shows correct number of thumbnail images', () => {
    render(<ImageCarousel images={mockImages} alt="Test" />);
    // Get only thumbnail buttons by a specific class or data-testid
    const thumbnails = screen.getAllByRole('button').filter(
      button => !button.getAttribute('aria-label')?.includes('image')
    );
    expect(thumbnails.length).toBe(mockImages.length);
  });
}); 