import { ModeToggle } from './mode-toggle';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 h-16 w-full bg-black px-4">
      <ModeToggle />
    </nav>
  );
};
