import PropTypes from 'prop-types';

const empty = '................................';

function value(data, key, fallback = empty) {
  return data?.[key]?.trim?.() || fallback;
}

function PowerOfAttorneyTemplate({ data = {} }) {
  return (
    <article className="legal-document-template">
      <h1 className="mb-8 text-center text-sm font-bold uppercase">Procură</h1>

      <section className="mb-8 text-justify space-y-4">
        <p className="indent-8">
          Subsemnatul(a) <strong>{value(data, 'mandatar_nume')}</strong>,
          cetățean(că) a <strong>{value(data, 'mandatar_cetatenie')}</strong>, domiciliat(ă) în municipiul <strong> {value(data, 'mandatar_adresa_domiciliu')}</strong>, identificat(ă) cu IDNP buletin
          <strong>{value(data, 'mandatar_idnp')}</strong>, seria <strong> {value(data, 'mandatar_serie')}</strong>,
          prin prezenta împuternicesc pe <strong>{value(data, 'mandatar_prenume')}</strong>, 
          cetățean român, cu domiciliul în municipiul ________________________, B.d. _______, bl. _____, 
          sc. ____, ap. ____, județul _______, identificat(ă) cu C.I. seria _______, nr. _______, 
          eliberat(ă) de SPCPEP _______, la data de _______, C.N.P. ________________, pentru ca în numele 
          meu și pentru mine să mă reprezinte la Poliția competență, în vederea solicită ofertei și ridicării 
          cazierului meu judiciar.
        </p>
        <p className="indent-8">
          În baza prezentului mandat, mandatarul meu va putea reprezenta la Poliția competență, va face orice 
          cereri necesare, va înțelege formalitățile necesare, va face declarații cerute, va semna de primirea 
          cazierului, oriunde va fi necesar în legătură cu prezentul mandat, semnătura sa fiind-mi opozabilă.
        </p>
        <p className="indent-8">
          Mandatul este gratuit, netransmisibil și valabil în timp până la revocarea, dar nu mult de 3 (trei) 
          ani de la data autentificării, conform art. 2015 Codul Civil.
        </p>
        <p className="indent-8">
          Redactat și autenticat la Birou Individual Notarial PROFESSIO, într-un exemplar original care rămâne 
          în arhiva biroului notarial și 3 (trei) duplicate, din care unul va rămâne în arhiva biroului notarial 
          și 2 (două) exemplare au fost eliberate părții.
        </p>
      </section>
      <section className="mt-12 space-y-4">
        <p>Scopul mandatului:</p>
        <p className="text-justify indent-8">{value(data, 'scop_mandat')}</p>
      </section>

      <section className="mt-12 space-y-4">
        <p>Prezenta procură este emisă conform voinței mele și produce efecte de la data emiterii.</p>

        <div className="mt-8 grid grid-cols-2 gap-8">
          <p>Data emiterii: {value(data, 'data_emiterii')}</p>
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
