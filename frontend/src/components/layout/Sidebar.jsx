import { NavLink } from 'react-router-dom';
import { FilePenLine, Files, LayoutDashboard, Scale, Settings } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, end: true },
  { name: 'Documente', href: '/documents', icon: Files },
  { name: 'Creare document', href: '/create-document', icon: FilePenLine },
  { name: 'Administrare', href: '/admin', icon: Settings },
];

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-52 border-r border-legal-100 bg-white lg:flex lg:flex-col">
      <div className="flex h-20 items-center gap-3 border-b border-legal-100 px-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-legal-700 text-white shadow-soft">
          <Scale className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-600">Legal Draft</p>
          <h1 className="truncate text-base font-semibold text-ink-900">Generator acte</h1>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2 px-3 py-6" aria-label="Navigare principala">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.end}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded px-3 py-3 text-sm font-medium transition',
                  isActive
                    ? 'bg-legal-700 text-white shadow-soft'
                    : 'text-ink-700 hover:bg-legal-50 hover:text-legal-700',
                ].join(' ')
              }
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span className="truncate">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
