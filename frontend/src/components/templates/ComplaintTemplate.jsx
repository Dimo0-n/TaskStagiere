import PropTypes from 'prop-types';

const empty = '................................';

function value(data, key, fallback = empty) {
  return data?.[key]?.trim?.() || fallback;
}

function ComplaintTemplate({ data = {} }) {
  return (
    <article className="legal-document-template">
      <div className="mb-10 flex justify-end">
        <div className="w-1/2 text-left">
          <p>Către</p>
          <p className="font-bold">{value(data, 'organ_destinatar')}</p>
        </div>
      </div>

      <section className="mb-8">
        <p>
          Subsemnatul(a) <strong>{value(data, 'nume_petent')}</strong>, născut(ă) la data de{' '}
          <strong>{value(data, 'data_nasterii')}</strong>, domiciliat(a) în <strong>{value(data, 'adresa')}</strong>,
          având ocupația <strong>{value(data, 'ocupatie')}</strong>, telefon <strong>{value(data, 'telefon')}</strong>,
          formulez prezenta:
        </p>
      </section>

      <h1 className="mb-4 text-center text-sm font-bold uppercase">Plângere</h1>

      <section className="space-y-4">
        <p>
          {value(
            data,
            'continut_plangere',
          )}
            <div className="h-1"></div>
          Solicit înregistrarea prezentei plângeri, verificarea circumstanțelor indicate și comunicarea rezultatului în
          termenul prevăzut de lege.
        </p>
      </section>

      <div className="mt-12 grid grid-cols-2 gap-8">
        <div>
          <p>Data: {value(data, 'data')}</p>
          <p>Ora: {value(data, 'ora')}</p>
        </div>
          <div className="text-right">
              <p>Semnătura:</p>
              <p className="mt-8 border-t border-ink-900" style={{ width: '100px' }}></p>
          </div>
      </div>
    </article>
  );
}

ComplaintTemplate.propTypes = {
  data: PropTypes.object,
};

export default ComplaintTemplate;
