import PropTypes from 'prop-types';

const empty = '................................';

function value(data, key, fallback = empty) {
  return data?.[key]?.trim?.() || fallback;
}

function PowerOfAttorneyTemplate({ data = {} }) {
  return (
    <article className="legal-document-template">
      <h1 className="mb-8 text-center text-sm font-bold uppercase">Procură</h1>

      <section className="mb-8 text-justify">
        <p className="indent-8">
          Subsemnatul(a) <strong>{value(data, 'mandatarNume')}</strong> <strong>{value(data, 'mandatarPrenume')}</strong>,
          cetățean(că) a <strong>{value(data, 'mandatarCetatenie')}</strong>, domiciliat(ă) în
          <strong> {value(data, 'mandatarAdresaDomiciliu')}</strong>, identificat(ă) cu
          IDNP buletin <strong>{value(data, 'mandatarIdnp')}</strong>,
          seria <strong> {value(data, 'mandatarSerie')}</strong>,
          prin prezenta împuternicesc pe <strong>{value(data, 'imputernicitNume')}</strong> <strong>{value(data, 'imputernicitPrenume')}</strong>,
          cetățean(că) a <strong>{value(data, 'imputernicitCetatenie')}</strong>, domiciliat(ă) în
          <strong> {value(data, 'imputernicitAdresaDomiciliu')}</strong>, identificat(ă) cu
          IDNP buletin <strong>{value(data, 'imputernicitIdnp')}</strong>,
          seria <strong> {value(data, 'imputernicitSerie')}</strong>, pentru ca în numele
          meu și pentru mine să mă reprezinte la Poliția competență, în vederea solicită ofertei și ridicării 
          cazierului meu judiciar.
        </p>
        <p className="indent-8">
          În baza prezentului mandat, mandatarul meu să mă reprezinte în fața Inspectoratului General al Poliției
          și a subdiviziunilor sale teritoriale, va face orice
          cereri necesare, va înțelege formalitățile necesare, va face declarații cerute, va semna de primirea 
          cazierului, oriunde va fi necesar în legătură cu prezentul mandat, semnătura sa fiind-mi opozabilă.
        </p>
        <p className="indent-8">
          Mandatul este gratuit, netransmisibil și valabil în timp până la revocarea, dar nu mult de 3 (trei) 
          ani de la data autentificării, conform art. 2015 Codul Civil.
        </p>
        <p className="indent-8">
          Redactat și autenticat la <strong> {value(data, 'loculRedactariiDocumentului')}</strong>, într-un exemplar original care rămâne
          în arhiva biroului notarial și 3 (trei) duplicate, din care unul va rămâne în arhiva biroului notarial 
          și 2 (două) exemplare au fost eliberate părții.
        </p>
        <div className="h-4"></div>
        <p>Scopul mandatului:</p>
        <p className="text-justify indent-8">{value(data, 'scopMandat')}</p>

        <div className="h-4"></div>
        <p>Prezenta procură este emisă conform voinței mele și produce efecte de la data emiterii.</p>

        <div className="mt-8 grid grid-cols-2 gap-8">
          <div>
            <p>Data emiterii:</p>
            <p>{value(data, "dataEmiterii")}</p>
          </div>
          <div className="text-right">
            <p>Semnătura:</p>
            <p className="mt-8 border-t border-ink-900" style={{ width: '100px' }}></p>
          </div>
        </div>
      </section>
    </article>
  );
}

PowerOfAttorneyTemplate.propTypes = {
  data: PropTypes.object,
};

export default PowerOfAttorneyTemplate;
