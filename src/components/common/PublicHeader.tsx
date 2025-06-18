import { LanguageSwitcher } from './LanguageSwitcher';
import { ModeToggle } from './ModeToggle';

export async function PublicHeader() {
  return (
    <header className="fixed top-0 w-full z-50 bg-gray-50 border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-50">Tu Nombre</h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a
              href="#about"
              className="text-gray-700 dark:text-gray-50 hover:text-accent dark:hover:text-accent transition-colors"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-gray-700 dark:text-gray-50 hover:text-accent dark:hover:text-accent transition-colors"
            >
              Projects
            </a>
            <a
              href="#skills"
              className="text-gray-700 dark:text-gray-50 hover:text-accent dark:hover:text-accent transition-colors"
            >
              Skills
            </a>
            <a
              href="#experience"
              className="text-gray-700 dark:text-gray-50 hover:text-accent dark:hover:text-accent transition-colors"
            >
              Experience
            </a>
            <a
              href="#contact"
              className="text-gray-700 dark:text-gray-50 hover:text-accent dark:hover:text-accent transition-colors"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />

            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
