import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Save } from 'lucide-react';
import { TextArea, TextInput } from '../ui/FormControls.jsx';

const requiredMessage = 'Camp obligatoriu.';

const defaultValues = {
  instanta: '',
  reclamant: '',
  adresa_reclamant: '',
  telefon_reclamant: '',
  email_reclamant: '',
  parat: '',
  adresa_parat: '',
  reprezentant: '',
  obiect_cerere: '',
  circumstante_de_fapt: '',
  temei_juridic: '',
  solicitari: '',
  anexe: '',
  data: '',
};

function StatementOfClaimForm({ onSubmit, onValuesChange }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  useEffect(() => {
    const subscription = watch((values) => onValuesChange?.(values));
    return () => subscription.unsubscribe();
  }, [onValuesChange, watch]);

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        id="instanta"
        label="Instanța"
        placeholder="Ex: Judecatoria Chisinau, sediul Centru"
        required
        error={errors.instanta}
        registration={register('instanta', { required: requiredMessage })}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          id="reclamant"
          label="Reclamant"
          required
          error={errors.reclamant}
          registration={register('reclamant', { required: requiredMessage })}
        />
        <TextInput
          id="parat"
          label="Pârât"
          required
          error={errors.parat}
          registration={register('parat', { required: requiredMessage })}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          id="adresa_reclamant"
          label="Adresa reclamant"
          required
          error={errors.adresa_reclamant}
          registration={register('adresa_reclamant', { required: requiredMessage })}
        />
        <TextInput
          id="adresa_parat"
          label="Adresa parat"
          required
          error={errors.adresa_parat}
          registration={register('adresa_parat', { required: requiredMessage })}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          id="telefon_reclamant"
          label="Telefon reclamant"
          type="tel"
          error={errors.telefon_reclamant}
          registration={register('telefon_reclamant', {
            pattern: {
              value: /^[+()0-9\s-]{6,20}$/,
              message: 'Introdu un numar de telefon valid.',
            },
          })}
        />
        <TextInput
          id="email_reclamant"
          label="Email reclamant"
          type="email"
          error={errors.email_reclamant}
          registration={register('email_reclamant', {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Introdu o adresa de email valida.',
            },
          })}
        />
      </div>

      <TextInput
        id="reprezentant"
        label="Reprezentant"
        placeholder="Avocat / mandatar, daca exista"
        error={errors.reprezentant}
        registration={register('reprezentant')}
      />

      <TextInput
        id="obiect_cerere"
        label="Obiect cerere"
        required
        error={errors.obiect_cerere}
        registration={register('obiect_cerere', { required: requiredMessage })}
      />

      <TextArea
        id="circumstante_de_fapt"
        label="Circumstante de fapt"
        required
        rows={6}
        error={errors.circumstante_de_fapt}
        registration={register('circumstante_de_fapt', {
          required: requiredMessage,
          minLength: {
            value: 40,
            message: 'Circumstantele trebuie sa contina minimum 40 de caractere.',
          },
        })}
      />

      <TextArea
        id="temei_juridic"
        label="Temei juridic"
        required
        rows={4}
        error={errors.temei_juridic}
        registration={register('temei_juridic', { required: requiredMessage })}
      />

      <TextArea
        id="solicitari"
        label="Solicitari"
        required
        rows={5}
        error={errors.solicitari}
        registration={register('solicitari', { required: requiredMessage })}
      />

      <TextArea id="anexe" label="Anexe" rows={4} error={errors.anexe} registration={register('anexe')} />

      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          id="data"
          label="Data"
          type="date"
          required
          error={errors.data}
          registration={register('data', { required: requiredMessage })}
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded bg-legal-700 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-legal-900 disabled:cursor-not-allowed disabled:bg-ink-500"
        disabled={!isValid}
      >
        <Save className="h-4 w-4" aria-hidden="true" />
        Salveaza ciorna
      </button>
    </form>
  );
}

StatementOfClaimForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onValuesChange: PropTypes.func,
};

export default StatementOfClaimForm;
