import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, Eye, FilePlus2, Files, Search } from 'lucide-react';
import { mockDocuments } from '../data/mockDocuments.js';

const statusStyles = {
  Finalizat: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'În revizuire': 'bg-amber-50 text-amber-700 ring-amber-200',
  Ciornă: 'bg-stone-100 text-stone-700 ring-stone-200',
};

const statusOptions = ['Toate', 'Finalizat', 'În revizuire', 'Ciornă'];

function formatDate(value) {
  return new Intl.DateTimeFormat('ro-RO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

function Documents() {
  const [query, setQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Toate');

  const filteredDocuments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return mockDocuments.filter((document) => {
      const matchesStatus = selectedStatus === 'Toate' || document.status === selectedStatus;
      const matchesQuery =
        !normalizedQuery ||
        [document.title, document.type, document.owner, document.id].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        );

      return matchesStatus && matchesQuery;
    });
  }, [query, selectedStatus]);

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-600">Arhiva juridică</p>
          <h1 className="mt-2 text-3xl font-semibold text-ink-900">Documente</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-ink-500">
            Consultă actele generate, starea lor curentă și datele de creare. Datele sunt mock pentru integrarea
            viitoare cu Spring Boot.
          </p>
        </div>

        <Link
          to="/create-document"
          className="inline-flex items-center justify-center gap-2 rounded bg-legal-700 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-legal-900"
        >
          <FilePlus2 className="h-4 w-4" aria-hidden="true" />
          Document nou
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-3" aria-label="Rezumat documente">
        {statusOptions.slice(1).map((status) => {
          const count = mockDocuments.filter((document) => document.status === status).length;

          return (
            <article key={status} className="rounded border border-legal-100 bg-white p-5 shadow-soft">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-ink-500">{status}</p>
                  <p className="mt-3 text-3xl font-semibold text-ink-900">{count}</p>
                </div>
                <span className="flex h-11 w-11 items-center justify-center rounded bg-legal-50 text-legal-700">
                  <Files className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
            </article>
          );
        })}
      </section>

      <section className="rounded border border-legal-100 bg-white shadow-soft">
        <div className="grid gap-4 border-b border-legal-100 px-5 py-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cauta dupa titlu, tip, avocat sau ID"
              className="w-full rounded border border-legal-100 bg-white py-2.5 pl-10 pr-3 text-sm text-ink-900 outline-none transition placeholder:text-ink-500 focus:border-legal-600 focus:ring-2 focus:ring-legal-700/15"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {statusOptions.map((status) => {
              const active = status === selectedStatus;

              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setSelectedStatus(status)}
                  className={[
                    'rounded border px-3 py-2 text-sm font-semibold transition',
                    active
                      ? 'border-legal-700 bg-legal-700 text-white'
                      : 'border-legal-100 bg-white text-ink-700 hover:border-legal-600 hover:text-legal-700',
                  ].join(' ')}
                >
                  {status}
                </button>
              );
            })}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-legal-100">
            <thead className="bg-legal-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">
                  Titlu
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">Tip</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">
                  Creare
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">
                  Status
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">
                  Acțiuni
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-legal-100 bg-white">
              {filteredDocuments.map((document) => (
                <tr key={document.id} className="transition hover:bg-legal-50/70">
                  <td className="min-w-80 px-5 py-4">
                    <p className="text-sm font-semibold text-ink-900">{document.title}</p>
                    <p className="mt-1 text-xs text-ink-500">
                      {document.id} · {document.owner} · actualizat {formatDate(document.updatedAt)}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-sm text-ink-700">{document.type}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-sm text-ink-700">{formatDate(document.createdAt)}</td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <span
                      className={`inline-flex rounded px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                        statusStyles[document.status]
                      }`}
                    >
                      {document.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded border border-legal-100 text-ink-700 transition hover:border-legal-600 hover:text-legal-700"
                        aria-label={`Previzualizează ${document.title}`}
                      >
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded border border-legal-100 text-ink-700 transition hover:border-legal-600 hover:text-legal-700"
                        aria-label={`Exportă ${document.title}`}
                      >
                        <Download className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDocuments.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="text-sm font-semibold text-ink-900">Nu există documente pentru filtrele selectate.</p>
            <p className="mt-2 text-sm text-ink-500">Modifică termenul căutat sau statusul pentru a vedea rezultate.</p>
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default Documents;
