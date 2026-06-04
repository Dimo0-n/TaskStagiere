import { Link, useLocation } from 'react-router-dom';
import { FilePlus2, Menu, Scale } from 'lucide-react';

const pageTitles = {
  '/': 'Dashboard',
  '/documents': 'Documente',
  '/create-document': 'Creare document',
  '/admin': 'Administrare formatare',
};

function Header() {
  const { pathname } = useLocation();
  const title = pageTitles[pathname] ?? 'Legal Draft';

  return (
    <header className="sticky top-0 z-20 border-b border-legal-100 bg-white/95 backdrop-blur">
      <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded border border-legal-100 text-ink-700 lg:hidden"
            aria-label="Deschide navigarea"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex h-10 w-10 items-center justify-center rounded bg-legal-700 text-white lg:hidden">
            <Scale className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent-600">Aplicatie juridica</p>
            <h2 className="text-xl font-semibold text-ink-900">{title}</h2>
          </div>
        </div>

        <Link
          to="/create-document"
          className="inline-flex items-center gap-2 rounded bg-legal-700 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-legal-900"
        >
          <FilePlus2 className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Document nou</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
