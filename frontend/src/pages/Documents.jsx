import { useEffect, useMemo, useState } from 'react';
import { Eye, FileDown, FileText, Search } from 'lucide-react';
import { fetchDocuments } from '../services/documentService.js';

const statusStyles = {
  Finalizat: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'În revizuire': 'bg-amber-50 text-amber-700 ring-amber-200',
  Ciornă: 'bg-stone-100 text-stone-700 ring-stone-200',
};

const statusOptions = ['Toate', 'Finalizat', 'În revizuire', 'Ciornă'];

function formatDate(value) {
  if (!value) return '—';
  try {
    return new Intl.DateTimeFormat('ro-RO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(value));
  } catch {
    return '—';
  }
}

function Documents() {
  const [query, setQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Toate');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDocuments()
        .then(setDocuments)
        .catch((err) => {
          console.error('Eroare la fetch:', err);
          setError('Nu s-au putut încărca documentele.');
        })
        .finally(() => setLoading(false));
  }, []);

  const filteredDocuments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return documents.filter((document) => {
      const matchesStatus = selectedStatus === 'Toate' || document.status === selectedStatus;
      const matchesQuery =
          !normalizedQuery ||
          [document.title, document.type, document.id].some((value) =>
              String(value ?? '').toLowerCase().includes(normalizedQuery),
          );

      return matchesStatus && matchesQuery;
    });
  }, [query, selectedStatus, documents]);

  return (
      <div className="space-y-8">
        <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent-600">Arhiva juridică</p>
            <h1 className="mt-2 text-3xl font-semibold text-ink-900">Documente</h1>
          </div>
        </section>

        <section className="rounded border border-legal-100 bg-white shadow-soft">
          <div className="grid gap-4 border-b border-legal-100 px-5 py-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
              <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Cauta dupa titlu, tip sau ID"
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

          {/* ── Loading ── */}
          {loading ? (
              <div className="px-5 py-12 text-center">
                <p className="text-sm text-ink-500">Se încarcă documentele...</p>
              </div>
          ) : error ? (
              /* ── Error ── */
              <div className="px-5 py-12 text-center">
                <p className="text-sm font-semibold text-red-600">{error}</p>
              </div>
          ) : (
              /* ── Tabel ── */
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-legal-100">
                  <thead className="bg-legal-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">Titlu</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">Tip</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">Creare</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">Status</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">Acțiuni</th>
                  </tr>
                  </thead>
                  <tbody className="divide-y divide-legal-100 bg-white">
                  {filteredDocuments.map((document) => (
                      <tr key={document.id} className="transition hover:bg-legal-50/70">
                        <td className="min-w-80 px-5 py-4">
                          <p className="text-sm font-semibold text-ink-900">{document.title}</p>
                          <p className="mt-1 text-xs text-ink-500">
                            {document.id}
                          </p>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-sm text-ink-700">{document.type}</td>
                        <td className="whitespace-nowrap px-5 py-4 text-sm text-ink-700">{formatDate(document.createdAt)}</td>
                        <td className="whitespace-nowrap px-5 py-4">
                      <span className={`inline-flex rounded px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[document.status] ?? 'bg-stone-100 text-stone-700 ring-stone-200'}`}>
                        {document.status}
                      </span>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4">
                          <div className="flex items-center gap-2">

                            {/* Previzualizează */}
                            <div className="relative group">
                              <button
                                  type="button"
                                  className="inline-flex h-9 w-9 items-center justify-center rounded border border-legal-100 text-ink-700 transition hover:border-legal-600 hover:text-legal-700"
                                  aria-label={`Previzualizează ${document.title}`}
                              >
                                <Eye className="h-4 w-4" aria-hidden="true" />
                              </button>
                              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            Previzualizează
                          </span>
                            </div>

                            {/* Exportă PDF */}
                            <div className="relative group">
                              <button
                                  type="button"
                                  className="inline-flex h-9 w-9 items-center justify-center rounded border border-red-200 text-red-500 transition hover:border-red-500 hover:text-red-600"
                                  aria-label={`Exportă PDF ${document.title}`}
                              >
                                <FileText className="h-4 w-4" aria-hidden="true" />
                              </button>
                              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            Exportă PDF
                          </span>
                            </div>

                            {/* Exportă DOCX */}
                            <div className="relative group">
                              <button
                                  type="button"
                                  className="inline-flex h-9 w-9 items-center justify-center rounded border border-blue-200 text-blue-500 transition hover:border-blue-500 hover:text-blue-600"
                                  aria-label={`Exportă DOCX ${document.title}`}
                              >
                                <FileDown className="h-4 w-4" aria-hidden="true" />
                              </button>
                              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            Exportă DOCX
                          </span>
                            </div>

                          </div>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>

                {filteredDocuments.length === 0 && (
                    <div className="px-5 py-12 text-center">
                      <p className="text-sm font-semibold text-ink-900">Nu există documente pentru filtrele selectate.</p>
                      <p className="mt-2 text-sm text-ink-500">Modifică termenul căutat sau statusul pentru a vedea rezultate.</p>
                    </div>
                )}
              </div>
          )}
        </section>
      </div>
  );
}

export default Documents;