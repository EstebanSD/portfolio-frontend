import { LanguageSwitcher } from './LanguageSwitcher';

export async function PublicHeader() {
  return (
    <header className="fixed top-0 w-full z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-900">Tu Nombre</h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="text-gray-700 hover:text-accent-500 transition-colors">
              About
            </a>
            <a href="#projects" className="text-gray-700 hover:text-accent-500 transition-colors">
              Projects
            </a>
            <a href="#skills" className="text-gray-700 hover:text-accent-500 transition-colors">
              Skills
            </a>
            <a href="#experience" className="text-gray-700 hover:text-accent-500 transition-colors">
              Experience
            </a>
            <a href="#contact" className="text-gray-700 hover:text-accent-500 transition-colors">
              Contact
            </a>
          </nav>

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
