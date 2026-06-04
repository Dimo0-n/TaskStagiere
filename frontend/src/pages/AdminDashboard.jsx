import { AlignCenter, AlignJustify, AlignLeft, AlignRight, RotateCcw, SlidersHorizontal, Type } from 'lucide-react';
import { useFormatting } from '../context/useFormatting.js';

const fontOptions = ['Times New Roman', 'Georgia', 'Cambria', 'Arial'];

const alignmentOptions = [
  { label: 'Justify', value: 'justify', icon: AlignJustify },
  { label: 'Stanga', value: 'left', icon: AlignLeft },
  { label: 'Centru', value: 'center', icon: AlignCenter },
  { label: 'Dreapta', value: 'right', icon: AlignRight },
];

const marginControls = [
  { key: 'marginTop', label: 'Sus' },
  { key: 'marginRight', label: 'Dreapta' },
  { key: 'marginBottom', label: 'Jos' },
  { key: 'marginLeft', label: 'Stanga' },
];

function AdminDashboard() {
  const { formatting, updateFormatting, resetFormatting } = useFormatting();

  const updateNumber = (key, value) => {
    updateFormatting(key, Number(value));
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-600">Reguli globale</p>
          <h1 className="mt-2 text-3xl font-semibold text-ink-900">Administrare formatare</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-ink-500">
            Configureaza regulile vizuale folosite de toate previzualizarile documentelor juridice.
          </p>
        </div>

        <button
          type="button"
          onClick={resetFormatting}
          className="inline-flex items-center justify-center gap-2 rounded border border-legal-100 bg-white px-4 py-2.5 text-sm font-semibold text-ink-700 shadow-soft transition hover:border-legal-600 hover:text-legal-700"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Reset
        </button>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <article className="rounded border border-legal-100 bg-white shadow-soft">
            <div className="flex items-center gap-3 border-b border-legal-100 px-5 py-4">
              <span className="flex h-10 w-10 items-center justify-center rounded bg-legal-700 text-white">
                <Type className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-ink-900">Tipografie</h2>
                <p className="mt-1 text-sm text-ink-500">Font, dimensiune si interlinie pentru corpul actului.</p>
              </div>
            </div>

            <div className="grid gap-5 px-5 py-5 lg:grid-cols-3">
              <div>
                <label className="text-sm font-medium text-ink-700" htmlFor="fontFamily">
                  Font family
                </label>
                <select
                  id="fontFamily"
                  value={formatting.fontFamily}
                  onChange={(event) => updateFormatting('fontFamily', event.target.value)}
                  className="mt-2 w-full rounded border border-legal-100 bg-white px-3 py-2.5 text-sm text-ink-900 outline-none transition focus:border-legal-600 focus:ring-2 focus:ring-legal-700/15"
                >
                  {fontOptions.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-ink-700" htmlFor="fontSize">
                  Font size
                </label>
                <div className="mt-2 flex items-center gap-3">
                  <input
                    id="fontSize"
                    type="range"
                    min="10"
                    max="16"
                    step="1"
                    value={formatting.fontSize}
                    onChange={(event) => updateNumber('fontSize', event.target.value)}
                    className="w-full accent-legal-700"
                  />
                  <input
                    type="number"
                    min="10"
                    max="16"
                    value={formatting.fontSize}
                    onChange={(event) => updateNumber('fontSize', event.target.value)}
                    className="w-16 rounded border border-legal-100 px-2 py-2 text-sm outline-none focus:border-legal-600 focus:ring-2 focus:ring-legal-700/15"
                    aria-label="Font size value"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-ink-700" htmlFor="lineHeight">
                  Line height
                </label>
                <div className="mt-2 flex items-center gap-3">
                  <input
                    id="lineHeight"
                    type="range"
                    min="1"
                    max="2"
                    step="0.1"
                    value={formatting.lineHeight}
                    onChange={(event) => updateNumber('lineHeight', event.target.value)}
                    className="w-full accent-legal-700"
                  />
                  <input
                    type="number"
                    min="1"
                    max="2"
                    step="0.1"
                    value={formatting.lineHeight}
                    onChange={(event) => updateNumber('lineHeight', event.target.value)}
                    className="w-16 rounded border border-legal-100 px-2 py-2 text-sm outline-none focus:border-legal-600 focus:ring-2 focus:ring-legal-700/15"
                    aria-label="Line height value"
                  />
                </div>
              </div>
            </div>
          </article>

          <article className="rounded border border-legal-100 bg-white shadow-soft">
            <div className="flex items-center gap-3 border-b border-legal-100 px-5 py-4">
              <span className="flex h-10 w-10 items-center justify-center rounded bg-accent-500/10 text-accent-600">
                <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-ink-900">Pagina si aliniere</h2>
                <p className="mt-1 text-sm text-ink-500">Margini A4 si alinierea paragrafelor din corp.</p>
              </div>
            </div>

            <div className="space-y-6 px-5 py-5">
              <div>
                <p className="text-sm font-medium text-ink-700">Text alignment</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-4">
                  {alignmentOptions.map((option) => {
                    const Icon = option.icon;
                    const active = formatting.textAlignment === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateFormatting('textAlignment', option.value)}
                        className={[
                          'inline-flex items-center justify-center gap-2 rounded border px-3 py-2.5 text-sm font-semibold transition',
                          active
                            ? 'border-legal-700 bg-legal-700 text-white'
                            : 'border-legal-100 bg-white text-ink-700 hover:border-legal-600 hover:text-legal-700',
                        ].join(' ')}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {marginControls.map((control) => (
                  <div key={control.key}>
                    <label className="text-sm font-medium text-ink-700" htmlFor={control.key}>
                      Margine {control.label}
                    </label>
                    <div className="mt-2 flex items-center gap-3">
                      <input
                        id={control.key}
                        type="range"
                        min="10"
                        max="35"
                        step="1"
                        value={formatting[control.key]}
                        onChange={(event) => updateNumber(control.key, event.target.value)}
                        className="w-full accent-legal-700"
                      />
                      <input
                        type="number"
                        min="10"
                        max="35"
                        value={formatting[control.key]}
                        onChange={(event) => updateNumber(control.key, event.target.value)}
                        className="w-16 rounded border border-legal-100 px-2 py-2 text-sm outline-none focus:border-legal-600 focus:ring-2 focus:ring-legal-700/15"
                        aria-label={`Margine ${control.label}`}
                      />
                      <span className="text-sm font-medium text-ink-500">mm</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>

        <aside className="rounded border border-legal-100 bg-white shadow-soft">
          <div className="border-b border-legal-100 px-5 py-4">
            <h2 className="text-lg font-semibold text-ink-900">Setari active</h2>
            <p className="mt-1 text-sm text-ink-500">Aceste valori se aplica instant in live preview.</p>
          </div>

          <dl className="divide-y divide-legal-100">
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <dt className="text-sm text-ink-500">Font</dt>
              <dd className="text-sm font-semibold text-ink-900">{formatting.fontFamily}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <dt className="text-sm text-ink-500">Dimensiune</dt>
              <dd className="text-sm font-semibold text-ink-900">{formatting.fontSize}px</dd>
            </div>
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <dt className="text-sm text-ink-500">Interlinie</dt>
              <dd className="text-sm font-semibold text-ink-900">{formatting.lineHeight}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <dt className="text-sm text-ink-500">Aliniere</dt>
              <dd className="text-sm font-semibold capitalize text-ink-900">{formatting.textAlignment}</dd>
            </div>
            <div className="px-5 py-4">
              <dt className="text-sm text-ink-500">Margini</dt>
              <dd className="mt-2 grid grid-cols-2 gap-2 text-sm font-semibold text-ink-900">
                <span>Sus {formatting.marginTop}mm</span>
                <span>Dreapta {formatting.marginRight}mm</span>
                <span>Jos {formatting.marginBottom}mm</span>
                <span>Stanga {formatting.marginLeft}mm</span>
              </dd>
            </div>
          </dl>
        </aside>
      </section>
    </div>
  );
}

export default AdminDashboard;
