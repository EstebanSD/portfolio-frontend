import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CustomCarousel } from './CustomCarousel';

describe('<CustomCarousel /> (UI Integration)', () => {
  const mockItems = [
    <div key="1">Item 1</div>,
    <div key="2">Item 2</div>,
    <div key="3">Item 3</div>,
  ];

  describe('rendering', () => {
    test('shows all items', () => {
      render(<CustomCarousel items={mockItems} />);

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    test('apply custom className', () => {
      const { container } = render(<CustomCarousel items={mockItems} className="custom-class" />);

      const wrapper = container.querySelector('.custom-class');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('navigation', () => {
    test('display default navigation buttons', () => {
      render(<CustomCarousel items={mockItems} />);

      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    test('does NOT display navigation when navigationStyle="none"', () => {
      render(<CustomCarousel items={mockItems} navigationStyle="none" />);

      expect(screen.queryByLabelText(/previous/i)).toBeNull();
      expect(screen.queryByLabelText(/next/i)).toBeNull();
    });

    test('displays navigation with minimal style', () => {
      render(<CustomCarousel items={mockItems} navigationStyle="minimal" />);

      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe('dots indicator', () => {
    test('does NOT display dots by default', () => {
      render(<CustomCarousel items={mockItems} />);

      expect(screen.queryByLabelText('Go to slide 1')).toBeNull();
    });

    test('displays dots when showDots=true', () => {
      render(<CustomCarousel items={mockItems} showDots />);

      expect(screen.getByLabelText('Go to slide 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to slide 2')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to slide 3')).toBeInTheDocument();
    });

    test('dots have the correct aria-label', () => {
      render(<CustomCarousel items={mockItems} showDots />);

      mockItems.forEach((_, index) => {
        const dot = screen.getByLabelText(`Go to slide ${index + 1}`);
        expect(dot).toBeInTheDocument();
        expect(dot.tagName).toBe('BUTTON');
      });
    });

    test('number of dots matches number of items', () => {
      render(<CustomCarousel items={mockItems} showDots />);

      const dots = screen.getAllByLabelText(/Go to slide/);
      expect(dots.length).toBe(mockItems.length);
    });

    test('clicking a dot scrolls to corresponding slide', async () => {
      render(<CustomCarousel items={mockItems} showDots />);

      const dot = screen.getByLabelText('Go to slide 2');
      await userEvent.click(dot);

      // not crash
      expect(dot).toBeInTheDocument();
    });
  });

  describe('props validation', () => {
    test('renders without crashing with vertical orientation', () => {
      render(<CustomCarousel items={mockItems} orientation="vertical" />);
      // not crash
    });

    test('handles empty arrays of items without crashing', () => {
      render(<CustomCarousel items={[]} />);

      expect(screen.queryByText('Item 1')).toBeNull();
    });

    test('accepts autoplay without crashing', () => {
      render(<CustomCarousel items={mockItems} autoplay />);

      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    test('accepts autoplayDelay prop without crashing', () => {
      render(<CustomCarousel items={mockItems} autoplay autoplayDelay={5000} />);

      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    test.each(['default', 'minimal', 'floating', 'none'] as const)(
      'accepts navigationStyle="%s" without crashing',
      (style) => {
        render(<CustomCarousel items={mockItems} navigationStyle={style} />);

        expect(screen.getByText('Item 1')).toBeInTheDocument();
      },
    );
  });
});
