import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Save } from 'lucide-react';
import { TextArea, TextInput } from '../ui/FormControls.jsx';
import axios from "axios";

const requiredMessage = 'Camp obligatoriu.';

const defaultValues = {
  instanta: '',
  reclamant: '',
  adresaReclamant: '',
  telefonReclamant: '',
  emailReclamant: '',
  parat: '',
  adresaParat: '',
  reprezentant: '',
  obiectCerere: '',
  circumstanteDeFapt: '',
  temeiJuridic: '',
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
          id="adresaReclamant"
          label="Adresa reclamant"
          required
          error={errors.adresaReclamant}
          registration={register('adresaReclamant', { required: requiredMessage })}
        />
        <TextInput
          id="adresaParat"
          label="Adresa parat"
          required
          error={errors.adresaParat}
          registration={register('adresaParat', { required: requiredMessage })}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          id="telefonReclamant"
          label="Telefon reclamant"
          type="tel"
          error={errors.telefonReclamant}
          registration={register('telefonReclamant', {
            pattern: {
              value: /^[+()0-9\s-]{6,20}$/,
              message: 'Introdu un numar de telefon valid.',
            },
          })}
        />
        <TextInput
          id="emailReclamant"
          label="Email reclamant"
          type="email"
          error={errors.emailReclamant}
          registration={register('emailReclamant', {
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
        id="obiectCerere"
        label="Obiectiv cerere"
        required
        error={errors.obiectCerere}
        registration={register('obiectCerere', { required: requiredMessage })}
      />

      <TextArea
        id="circumstanteDeFapt"
        label="Circumstante de fapt"
        required
        rows={6}
        error={errors.circumstanteDeFapt}
        registration={register('circumstanteDeFapt', {
          required: requiredMessage,
          minLength: {
            value: 40,
            message: 'Circumstantele trebuie sa contina minimum 40 de caractere.',
          },
        })}
      />

      <TextArea
        id="temeiJuridic"
        label="Temei juridic"
        required
        rows={4}
        error={errors.temeiJuridic}
        registration={register('temeiJuridic', { required: requiredMessage })}
      />

      <TextArea
        id="solicitari"
        label="Solicitari"
        placeholder="Scrieți solicitarile dvs. enumerate prin punct si virgulă."
        required
        rows={5}
        error={errors.solicitari}
        registration={register('solicitari', { required: requiredMessage })}
      />

      <TextArea
          id="anexe"
          label="Anexe"
          placeholder="Enumerați documente anexate prin punct și virgulă, daca exista."
          rows={4}
          error={errors.anexe}
          registration={register('anexe')} />

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
          Salveaza documentul
      </button>
    </form>
  );
}

StatementOfClaimForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onValuesChange: PropTypes.func,
};

export default StatementOfClaimForm;
