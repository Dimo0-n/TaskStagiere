import PropTypes from 'prop-types';

const empty = '................................';

function value(data, key, fallback = empty) {
    return data?.[key]?.trim?.() || fallback;
}

function numberedList(raw, fallback) {
    if (!raw?.trim()) {
        return <p>{fallback}</p>;
    }

    const items = raw
        .split(';')
        .map((s) => s.trim())
        .filter(Boolean);

    if (items.length === 0) {
        return <p>{fallback}</p>;
    }

    return (
        <ol className="list-none space-y-1 pl-0">
            {items.map((item, i) => {
                const isLast = i === items.length - 1;
                const clean = item.replace(/[;.]+$/, '');
                return (
                    <li key={i} className="flex gap-2">
                        <span className="shrink-0">{i + 1}.</span>
                        <span>{clean}{isLast ? '.' : ';'}</span>
                    </li>
                );
            })}
        </ol>
    );
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
                {numberedList(data.solicitari, 'Solicitările reclamantului urmează a fi completate.')}
            </section>
            <section className="mt-8 space-y-2 text-xs">
                <p className="font-bold">Anexe:</p>
                {numberedList(data.anexe, 'Nu sunt indicate anexe.')}
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