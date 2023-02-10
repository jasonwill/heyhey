import { render, screen } from '@testing-library/react';
import { MainNavigation } from '../../components/MainNavigation';

test('renders learn react link', () => {
  const { container } = render(<MainNavigation />);
  const linkElement = screen.getByRole('main-navigation');
  expect(linkElement).toBeInTheDocument();
});
