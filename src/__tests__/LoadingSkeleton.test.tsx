import { render } from '@testing-library/react';
import LoadingSkeleton from '@/components/LoadingSkeleton';

describe('LoadingSkeleton', () => {
  it('renders correct number of skeleton items', () => {
    const { container } = render(<LoadingSkeleton />);
    const skeletonItems = container.getElementsByClassName('animate-pulse');
    expect(skeletonItems.length).toBe(6);
  });

  it('renders skeleton items with correct structure', () => {
    const { container } = render(<LoadingSkeleton />);
    const skeletonCards = container.querySelectorAll('.bg-white');
    
    skeletonCards.forEach(card => {
      expect(card.querySelector('.h-48')).toBeInTheDocument(); // Image placeholder
      expect(card.querySelector('.h-6')).toBeInTheDocument();  // Title placeholder
      expect(card.querySelector('.h-4')).toBeInTheDocument();  // Text placeholder
    });
  });

  it('applies animation class to skeleton items', () => {
    const { container } = render(<LoadingSkeleton />);
    const animatedElements = container.getElementsByClassName('animate-pulse');
    expect(animatedElements.length).toBeGreaterThan(0);
  });
}); 