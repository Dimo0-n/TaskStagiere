import PropTypes from 'prop-types';

const empty = '................................';

function value(data, key, fallback = empty) {
  return data?.[key]?.trim?.() || fallback;
}

function ComplaintTemplate({ data = {} }) {
  return (
    <article className="legal-document-template">
        <div className="mb-2 flex justify-end">
            <div className="w-1/2">
                <p
                    className="font-bold"
                    style={{ textAlign: 'left' }}
                >
                    {value(data, 'organDestinatar')}
                </p>
            </div>
        </div>

        <section className="mb-4 flex justify-end">
            <div className="w-[50%] space-y-1 text-left">
                <p>
                    <strong>de la cet.</strong> {value(data, 'numePetent')}
                </p>

                <p>
                    <strong>a.n.</strong> {value(data, 'dataNasterii')}
                </p>

                <p>
                    <strong>dom.</strong> {value(data, 'adresa')}
                </p>

                <p>
                    <strong>Ocupația</strong> {value(data, 'ocupatie')}
                </p>

                <p>
                    <strong>tel.</strong> {value(data, 'telefon')}
                </p>
            </div>
        </section>

      <h1 className="mb-4 text-center text-sm font-bold uppercase">Plângere</h1>

      <section className="space-y-4">
        <p>
          {value(
            data,
            'continutPlangere',
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
