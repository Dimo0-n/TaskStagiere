import { Link } from 'react-router-dom';
import { ArrowRight, FileCheck2, FilePlus2, Files, FolderOpen, Settings, Sparkles } from 'lucide-react';
import { documentStats, mockDocuments } from '../data/mockDocuments.js';

const statusStyles = {
  Finalizat: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'In revizuire': 'bg-amber-50 text-amber-700 ring-amber-200',
  Ciorna: 'bg-stone-100 text-stone-700 ring-stone-200',
};

const quickActions = [
  {
    title: 'Document nou',
    description: 'Porneste redactarea unui act juridic structurat.',
    href: '/create-document',
    icon: FilePlus2,
    primary: true,
  },
  {
    title: 'Arhiva documente',
    description: 'Consulta actele salvate si starea lor curenta.',
    href: '/documents',
    icon: FolderOpen,
  },
  {
    title: 'Reguli formatare',
    description: 'Ajusteaza normele vizuale folosite in previzualizare.',
    href: '/admin',
    icon: Settings,
  },
];

function formatDate(value) {
  return new Intl.DateTimeFormat('ro-RO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

function Dashboard() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded border border-legal-100 bg-white shadow-soft">
        <div className="grid gap-0 lg:grid-cols-[1fr_360px]">
          <div className="px-6 py-8 sm:px-8 lg:px-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded border border-accent-500/30 bg-accent-500/10 px-3 py-1 text-sm font-semibold text-accent-600">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Birou juridic digital
            </div>
            <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl">
              Bine ai revenit. Documentele importante sunt pregatite pentru redactare si revizuire.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ink-500">
              Urmareste activitatea recenta, porneste rapid un act nou si mentine aceleasi reguli de tehnoredactare
              pentru toate documentele juridice.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/create-document"
                className="inline-flex items-center justify-center gap-2 rounded bg-legal-700 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-legal-900"
              >
                <FilePlus2 className="h-4 w-4" aria-hidden="true" />
                Creeaza document
              </Link>
              <Link
                to="/documents"
                className="inline-flex items-center justify-center gap-2 rounded border border-legal-100 bg-white px-5 py-3 text-sm font-semibold text-ink-700 transition hover:border-legal-600 hover:text-legal-700"
              >
                <Files className="h-4 w-4" aria-hidden="true" />
                Vezi documente
              </Link>
            </div>
          </div>

          <div className="border-t border-legal-100 bg-legal-900 px-6 py-8 text-white sm:px-8 lg:border-l lg:border-t-0">
            <div className="flex h-full flex-col justify-between gap-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-accent-500">Astazi</p>
                <p className="mt-3 text-5xl font-semibold">7</p>
                <p className="mt-3 text-sm leading-6 text-legal-100">
                  documente au primit actualizari de continut sau formatare.
                </p>
              </div>
              <div className="rounded border border-white/15 bg-white/10 p-4">
                <div className="flex items-center gap-3">
                  <FileCheck2 className="h-5 w-5 text-accent-500" aria-hidden="true" />
                  <p className="text-sm font-semibold">Rata de finalizare</p>
                </div>
                <div className="mt-4 h-2 rounded bg-white/15">
                  <div className="h-2 w-3/4 rounded bg-accent-500" />
                </div>
                <p className="mt-3 text-sm text-legal-100">75% din documentele active sunt aproape de finalizare.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Statistici documente">
        {documentStats.map((stat) => (
          <article key={stat.label} className="rounded border border-legal-100 bg-white p-5 shadow-soft">
            <p className="text-sm font-medium text-ink-500">{stat.label}</p>
            <div className="mt-4 flex items-end justify-between gap-4">
              <p className="text-3xl font-semibold text-ink-900">{stat.value}</p>
              <p className="text-right text-sm font-medium text-legal-700">{stat.change}</p>
            </div>
          </article>
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="rounded border border-legal-100 bg-white shadow-soft">
          <div className="flex flex-col gap-3 border-b border-legal-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-ink-900">Documente recente</h2>
              <p className="mt-1 text-sm text-ink-500">Ultimele acte lucrate de echipa juridica.</p>
            </div>
            <Link
              to="/documents"
              className="inline-flex items-center gap-2 text-sm font-semibold text-legal-700 hover:text-legal-900"
            >
              Toate documentele
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-legal-100">
              <thead className="bg-legal-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">
                    Titlu
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">
                    Tip
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">
                    Data
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-legal-100 bg-white">
                {mockDocuments.slice(0, 4).map((document) => (
                  <tr key={document.id} className="transition hover:bg-legal-50/70">
                    <td className="min-w-72 px-5 py-4">
                      <p className="text-sm font-semibold text-ink-900">{document.title}</p>
                      <p className="mt-1 text-xs text-ink-500">{document.owner}</p>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-ink-700">{document.type}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-ink-700">
                      {formatDate(document.createdAt)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`inline-flex rounded px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                          statusStyles[document.status]
                        }`}
                      >
                        {document.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded border border-legal-100 bg-white shadow-soft">
          <div className="border-b border-legal-100 px-5 py-4">
            <h2 className="text-lg font-semibold text-ink-900">Actiuni rapide</h2>
            <p className="mt-1 text-sm text-ink-500">Cele mai folosite operatiuni ale biroului.</p>
          </div>

          <div className="divide-y divide-legal-100">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.title}
                  to={action.href}
                  className="group flex items-start gap-4 px-5 py-5 transition hover:bg-legal-50"
                >
                  <span
                    className={[
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded',
                      action.primary ? 'bg-legal-700 text-white' : 'bg-accent-500/10 text-accent-600',
                    ].join(' ')}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-ink-900">{action.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-ink-500">{action.description}</span>
                  </span>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-ink-500 transition group-hover:translate-x-1 group-hover:text-legal-700" />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
