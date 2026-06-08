import PropTypes from 'prop-types';

const empty = '................................';

function value(data, key, fallback = empty) {
  return data?.[key]?.trim?.() || fallback;
}

function StatementOfClaimTemplate({ data = {} }) {
  return (
    <article className="legal-document-template">
      <section className="mb-8">
        <p className="font-bold">{value(data, 'instanta')}</p>
      </section>

      <section className="mb-6 space-y-3">
        <p>
          Reclamant: <strong>{value(data, 'reclamant')}</strong>, cu domiciliul/sediul în{' '}
          <strong>{value(data, 'adresaReclamant')}</strong>, telefon <strong>{value(data, 'telefonReclamant')}</strong>,
          email <strong>{value(data, 'emailReclamant')}</strong>.
        </p>
        <p>
          Pârât: <strong>{value(data, 'parat')}</strong>, cu domiciliul/sediul în{' '}
          <strong>{value(data, 'adresaParat')}</strong>.
        </p>
        <p>
          Reprezentant: <strong>{value(data, 'reprezentant')}</strong>.
        </p>
      </section>

      <h1 className="mb-8 text-center text-sm font-bold uppercase">Cerere de chemare în judecată</h1>

      <section className="space-y-4">
        <p>
          Obiectivul cererii: <strong>{value(data, 'obiectCerere')}</strong>.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xs font-bold uppercase">Circumstanțe de fapt</h2>
        <p>{value(data, 'circumstanteDeFapt', 'Circumstanțele de fapt urmează a fi completate de reclamant.')}</p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xs font-bold uppercase">Temei juridic</h2>
        <p>{value(data, 'temeiJuridic', 'Temeiul juridic urmează a fi indicat conform normelor aplicabile.')}</p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xs font-bold uppercase">Solicitări</h2>
        <p>{value(data, 'solicitari', 'Solicitările reclamantului urmează a fi completate.')}</p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xs font-bold uppercase">Anexe</h2>
        <p>{value(data, 'anexe')}</p>
      </section>

        <div className="mt-8 grid grid-cols-2 gap-8">
            <div>
                <p>Data:</p>
                <p>{value(data, 'data')}</p>
            </div>
            <div className="text-right">
                <p>Semnătura:</p>
                <p className="mt-8 border-t border-ink-900" style={{ width: '100px' }}></p>
            </div>
        </div>
    </article>
  );
}

StatementOfClaimTemplate.propTypes = {
  data: PropTypes.object,
};

export default StatementOfClaimTemplate;
