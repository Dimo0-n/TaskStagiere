import PropTypes from 'prop-types';

const empty = '................................';

function value(data, key, fallback = empty) {
    return data?.[key]?.trim?.() || fallback;
}

function StatementOfClaimTemplate({ data = {} }) {
    return (
        <article className="legal-document-template">
            <section className="mb-8 flex justify-end">
                <div className="w-1/2 space-y-1 text-xs">
                    <p className="font-bold">{value(data, 'instanta')}</p>
                    <p>
                        <span className="font-bold">Reclamant: </span>
                        {value(data, 'reclamant')}, cu domiciliul/sediul în {value(data, 'adresaReclamant')},
                        telefon {value(data, 'telefonReclamant')}, email {value(data, 'emailReclamant')}.
                    </p>
                    <p>
                        <span className="font-bold">Pârât: </span>
                        {value(data, 'parat')}, cu domiciliul/sediul în {value(data, 'adresaParat')}.
                    </p>
                    <p>
                        <span className="font-bold">Reprezentant: </span>
                        {value(data, 'reprezentant')}.
                    </p>
                </div>
            </section>
            <h1 className="mb-8 text-center text-xs font-bold uppercase">
                Cerere de chemare în judecată
            </h1>
            <section className="mb-6 text-center">
                <p className="text-xs">{value(data, 'obiectCerere')}</p>
            </section>
            <section className="mt-8 space-y-4">
                <p className="text-xs">
                    <span className="font-bold">Circumstanțele de fapt: </span>
                    {value(data, 'circumstanteDeFapt', 'Circumstanțele de fapt urmează a fi completate de reclamant.')}
                </p>
            </section>
            <section className="mt-8 space-y-4 text-center text-xs">
                <p>
                    <span className="font-bold">În drept </span>
                    {value(
                        data,
                        'temeiJuridic',
                        'îmi întemeiez cererea pe dispozițiile art. 66, 186 alin. (1) lit.b), 131 alin. (1), 142 alin (2), 151, 355 alin(1) din Codul Muncii, art.166, 167 CPC RM.',
                    )}
                </p>
            </section>
            <section className="mt-8 space-y-2 text-xs">
                <p>Astfel, reieșind din cele expuse mai sus, prin prezenta solicit:</p>
                <p>{value(data, 'solicitari', 'Solicitările reclamantului urmează a fi completate.')}</p>
            </section>
            <section className="mt-8 space-y-2 text-xs">
                <p className="font-bold">Anexe:</p>
                <p>{value(data, 'anexe', 'Nu sunt indicate anexe.')}</p>
            </section>
            <div className="mt-12 flex items-end justify-between text-xs">
                <p>Reprezentantul reclamantului</p>
                <div className="text-right">
                    <p className="border-b border-ink-900 pb-1" style={{ minWidth: '160px' }}>
                        {value(data, 'reprezentant', '')}
                    </p>
                </div>
            </div>
            <div className="mt-4 text-xs">
                <p>{value(data, 'data', '')}</p>
            </div>
        </article>
    );
}

StatementOfClaimTemplate.propTypes = {
    data: PropTypes.object,
};

export default StatementOfClaimTemplate;