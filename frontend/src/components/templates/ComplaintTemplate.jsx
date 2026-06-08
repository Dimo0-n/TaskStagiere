import PropTypes from 'prop-types';

const empty = '................................';

function value(data, key, fallback = empty) {
    return data?.[key]?.trim?.() || fallback;
}

function ComplaintTemplate({ data = {} }) {
    return (
        <article
            className="legal-document-template"
            style={{
                fontFamily: 'Times New Roman, serif',
            }}
        >

            {/* DESTINATAR */}
            <div className="mb-4 flex justify-end">
                <div className="w-[55%] text-left">
                    <p className="text-[9pt] font-bold">
                        {value(data, 'organDestinatar')}
                    </p>
                </div>
            </div>

            {/* DATE CETATEAN */}
            <section className="mb-6 flex justify-end">
                <div className="w-[55%] space-y-1 text-left text-[9pt]">

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

            {/* ARTICOLUL 311 */}
            <section className="mb-5 text-[8pt] leading-tight">

                <p className="font-bold text-[9pt]">
                    Articolul 311. Denunțarea falsă sau plîngerea falsă
                </p>

                <p>
                    (1) Denunțarea cu bună știință falsă în scopul de a-l învinui pe cineva
                    de săvîrșirea unei infracțiuni, sau plîngerea cu bună știință falsă
                    despre săvîrșirea unei infracțiuni, făcută unui organ sau unei persoane
                    cu funcție de răspundere, care sînt în drept de a porni urmărirea penală,
                </p>

                <p>
                    se pedepsește cu amendă în mărime de pînă la 650 unități convenționale
                    sau cu muncă neremunerată în folosul comunității de la 180 la 240 de ore,
                    sau cu închisoare de pînă la 2 ani.
                </p>

                <p>(2) Aceeași acțiune:</p>

                <p>
                    a) legată de învinuirea de săvîrșire a unei infracțiuni grave,
                    deosebi de grave sau excepțional de grave;
                </p>

                <p>
                    b) săvîrșită din interes material;
                </p>

                <p>
                    c) însoțită de crearea artificială a probelor acuzatoare.
                </p>

                <p>
                    se pedepsește cu amendă în mărime de la 550 la 1150 unități
                    convenționale sau cu închisoare de pînă la 5 ani.
                </p>

            </section>

            {/* DECLARATIE */}
            <section className="mb-5 text-center text-[9pt] font-bold">
                <p>
                    Cu răspunderea ce o port în conformitate cu art. 311 al Codului Penal RM
                    cu privire la denunțarea falsă am fost avertizat:
                </p>
            </section>

            {/* DATA + ORA + SEMNATURA */}
            <div className="mb-8 grid grid-cols-2 text-[8pt]">

                <div>
                    <p>Data: {value(data, 'data')}</p>
                    <p>Ora: {value(data, 'ora')}</p>
                </div>

                <div className="text-right">
                    <p>Semnătura:</p>
                </div>

            </div>

            {/* TITLU PLANGERE */}
            <h1 className="mb-6 text-center text-[9pt] font-bold uppercase">
                PLÂNGERE
            </h1>

            {/* CONTINUT */}
            <section className="text-[8pt] leading-relaxed">
                <p>
                    {value(data, 'continutPlangere')}
                </p>
            </section>

            {/* FOOTER PREVIEW */}
            <section className="mt-9 border-t border-gray-400 pt-4">

                <p className="text-[9pt] font-bold">
                    Plângerea a primit:
                </p>

                <p className="text-[9pt] font-bold">
                    Ofițerul de urmărire penală al Secției de Urmărire Penală
                    a IP Centru al Direcției de Poliție mun. Chișinău
                </p>

                <div className="mt-4 flex justify-end">
                    <div className="w-48 border-t border-black"></div>
                </div>

            </section>

        </article>
    );
}

ComplaintTemplate.propTypes = {
    data: PropTypes.object,
};

export default ComplaintTemplate;