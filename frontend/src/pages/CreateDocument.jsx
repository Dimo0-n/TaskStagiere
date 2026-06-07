import { useCallback, useMemo, useState } from 'react';
import {
  CheckCircle2,
  Download,
  FileText,
  Gavel,
  Landmark,
  Scale,
  Briefcase,
} from 'lucide-react';
import ComplaintForm from '../components/forms/ComplaintForm.jsx';
import PowerOfAttorneyForm from '../components/forms/PowerOfAttorneyForm.jsx';
import StatementOfClaimForm from '../components/forms/StatementOfClaimForm.jsx';
import DocumentPreview from '../components/preview/DocumentPreview.jsx';
import { documentTypes } from '../data/documentTypes.js';
import {
  createComplaint,
  createPowerOfAttorney,
  createStatementOfClaim,
} from "../services/documentService";
import { useFormatting } from "../context/useFormatting";

const documentIcons = {
  'complaint': Scale,
  'procura': Briefcase,
  'statement-of-claim': Landmark,
};

const documentForms = {
  'complaint': ComplaintForm,
  'procura': PowerOfAttorneyForm,
  'statement-of-claim': StatementOfClaimForm,
};

function CreateDocument() {
  const [selectedTypeId, setSelectedTypeId] = useState(documentTypes[0].id);
  const [draftValues, setDraftValues] = useState({});
  const [savedDraft, setSavedDraft] = useState(null);

  const { formatting } = useFormatting();

  const selectedType = useMemo(
    () => documentTypes.find((type) => type.id === selectedTypeId) ?? documentTypes[0],
    [selectedTypeId],
  );

  const SelectedIcon = documentIcons[selectedType.id] ?? FileText;
  const SelectedForm = documentForms[selectedType.id];

  const completedFields = useMemo(
    () => Object.values(draftValues).filter((value) => String(value ?? '').trim().length > 0).length,
    [draftValues],
  );

  const handleTypeChange = useCallback((documentTypeId) => {
    setSelectedTypeId(documentTypeId);
    setDraftValues({});
    setSavedDraft(null);
  }, []);

  const handleValuesChange = useCallback((values) => {
    setDraftValues(values);
  }, []);

  const handleDraftSubmit = useCallback(
      async (values) => {

        const request = {
          documentData: values,
          formatting: formatting
        };

        try {

          switch (selectedType.id) {

            case "complaint": {
              const response = await createComplaint(request);

              const blob = new Blob(
                  [response.data],
                  {
                    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  }
              );

              const url = window.URL.createObjectURL(blob);

              const link = document.createElement("a");
              link.href = url;
              link.download = "plangere.docx";

              document.body.appendChild(link);
              link.click();
              link.remove();

              window.URL.revokeObjectURL(url);

              break;
            }

            case "procura": {
              const response = await createComplaint(request);

              const blob = new Blob(
                  [response.data],
                  {
                    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  }
              );

              const url = window.URL.createObjectURL(blob);

              const link = document.createElement("a");
              link.href = url;
              link.download = "plangere.docx";

              document.body.appendChild(link);
              link.click();
              link.remove();

              window.URL.revokeObjectURL(url);

              break;
          }

            case "statement-of-claim": {
              const response = await createComplaint(request);

              const blob = new Blob(
                  [response.data],
                  {
                    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  }
              );

              const url = window.URL.createObjectURL(blob);

              const link = document.createElement("a");
              link.href = url;
              link.download = "cerere-de-chemare-in-judecata.docx";

              document.body.appendChild(link);
              link.click();
              link.remove();

              window.URL.revokeObjectURL(url);

              break;
          }

            default:
              throw new Error("Tip document necunoscut");
          }

          setDraftValues(values);

          setSavedDraft({
            type: selectedType.title,
            savedAt: new Intl.DateTimeFormat("ro-RO", {
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date()),
          });

        } catch (error) {

          console.error(error);

          alert("Eroare la salvarea documentului.");
        }
      },
      [selectedType]
  );

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-600">Redactare act juridic</p>
          <h1 className="mt-2 text-3xl font-semibold text-ink-900">Creare document</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-ink-500">
            Selecteaza tipul actului si lucreaza intr-un flux pregatit pentru formular structurat, previzualizare A4 si
            export.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3" aria-label="Tipuri documente">
        {documentTypes.map((documentType) => {
          const Icon = documentIcons[documentType.id] ?? FileText;
          const isSelected = documentType.id === selectedType.id;

          return (
            <button
              key={documentType.id}
              type="button"
              onClick={() => handleTypeChange(documentType.id)}
              className={[
                'rounded border bg-white p-5 text-left shadow-soft transition',
                isSelected
                  ? 'border-legal-700 ring-2 ring-legal-700/15'
                  : 'border-legal-100 hover:border-legal-600 hover:bg-legal-50',
              ].join(' ')}
              aria-pressed={isSelected}
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={[
                    'flex h-11 w-11 items-center justify-center rounded',
                    isSelected ? 'bg-legal-700 text-white' : 'bg-accent-500/10 text-accent-600',
                  ].join(' ')}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="rounded bg-legal-50 px-2.5 py-1 text-xs font-semibold text-legal-700">
                  {documentType.badge}
                </span>
              </div>
              <h2 className="mt-5 text-lg font-semibold text-ink-900">{documentType.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink-500">{documentType.subtitle}</p>
              <div className="mt-5 flex items-center justify-end gap-3">
                {isSelected ? <CheckCircle2 className="h-5 w-5 text-legal-700" aria-hidden="true" /> : null}
              </div>
            </button>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)] 2xl:grid-cols-[320px_minmax(0,1fr)]">
        <div className="space-y-6">
          <article className="rounded border border-legal-100 bg-white shadow-soft">
            <div className="border-b border-legal-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded bg-legal-700 text-white">
                  <SelectedIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-ink-900">{selectedType.title}</h2>
                  <p className="mt-1 text-sm text-ink-500">{selectedType.subtitle}</p>
                </div>
              </div>
            </div>

            <div className="px-5 py-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500">Campuri document</h3>
              <p className="mt-2 text-sm text-ink-500">
                {completedFields} din {selectedType.fields.length} campuri completate.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedType.fields.map((field) => (
                  <span
                    key={field}
                    className={[
                      'rounded px-2.5 py-1.5 text-xs font-semibold',
                      String(draftValues[field] ?? '').trim()
                        ? 'bg-legal-700 text-white'
                        : 'bg-legal-50 text-ink-700',
                    ].join(' ')}
                  >
                    {field}
                  </span>
                ))}
              </div>
            </div>
          </article>

          <article className="rounded border border-legal-100 bg-white p-5 shadow-soft">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500">Structura actului</h3>
            <ol className="mt-4 space-y-3">
              {selectedType.sections.map((section, index) => (
                <li key={section} className="flex items-center gap-3 text-sm text-ink-700">
                  <span className="flex h-7 w-7 items-center justify-center rounded bg-accent-500/10 text-xs font-semibold text-accent-600">
                    {index + 1}
                  </span>
                  {section}
                </li>
              ))}
            </ol>
          </article>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-[360px_minmax(520px,1fr)]">
          <article className="rounded border border-legal-100 bg-white shadow-soft">
            <div className="flex items-center justify-between gap-4 border-b border-legal-100 px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold text-ink-900">Formular</h2>
                <p className="mt-1 text-sm text-ink-500">Componenta dedicata pentru {selectedType.title}.</p>
              </div>
              <Gavel className="h-5 w-5 text-accent-600" aria-hidden="true" />
            </div>
            <div className="px-5 py-5">
              <SelectedForm
                key={selectedType.id}
                onSubmit={handleDraftSubmit}
                onValuesChange={handleValuesChange}
              />
              {savedDraft ? (
                <div className="mt-5 rounded border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                  Ciorna pentru {savedDraft.type} a fost salvata local la {savedDraft.savedAt}.
                </div>
              ) : null}
            </div>
          </article>

          <article className="rounded border border-legal-100 bg-white shadow-soft">
            <div className="border-b border-legal-100 px-5 py-4">
              <h2 className="text-lg font-semibold text-ink-900">Previzualizare</h2>
              <p className="mt-1 text-sm text-ink-500">Actualizare live in format A4 juridic.</p>
            </div>
            <DocumentPreview documentTypeId={selectedType.id} data={draftValues} />
            <div className="flex items-center gap-3 border-t border-legal-100 px-5 py-4 text-sm font-medium text-legal-700">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Previzualizarea foloseste valorile completate in formular.
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

export default CreateDocument;
