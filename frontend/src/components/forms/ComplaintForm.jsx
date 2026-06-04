import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Save } from 'lucide-react';
import { TextArea, TextInput } from '../ui/FormControls.jsx';

const requiredMessage = 'Camp obligatoriu.';

const defaultValues = {
  organ_destinatar: '',
  nume_petent: '',
  data_nasterii: '',
  adresa: '',
  ocupatie: '',
  telefon: '',
  continut_plangere: '',
  data: '',
  ora: '',
};

const time24hPattern = /^([01]\d|2[0-3]):[0-5]\d$/;

function ComplaintForm({ onSubmit, onValuesChange }) {
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
        id="organ_destinatar"
        label="Organ destinatar"
        placeholder="Ex: Inspectoratul de Politie..."
        required
        error={errors.organ_destinatar}
        registration={register('organ_destinatar', { required: requiredMessage })}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          id="nume_petent"
          label="Nume petent"
          required
          error={errors.nume_petent}
          registration={register('nume_petent', { required: requiredMessage })}
        />
        <TextInput
          id="data_nasterii"
          label="Data nasterii"
          type="date"
          error={errors.data_nasterii}
          registration={register('data_nasterii')}
        />
      </div>

      <TextInput
        id="adresa"
        label="Adresa"
        required
        error={errors.adresa}
        registration={register('adresa', { required: requiredMessage })}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <TextInput id="ocupatie" label="Ocupatie" error={errors.ocupatie} registration={register('ocupatie')} />
        <TextInput
          id="telefon"
          label="Telefon"
          type="tel"
          error={errors.telefon}
          registration={register('telefon', {
            pattern: {
              value: /^[+()0-9\s-]{6,20}$/,
              message: 'Introdu un numar de telefon valid.',
            },
          })}
        />
      </div>

      <TextArea
        id="continut_plangere"
        label="Continut plangere"
        required
        rows={7}
        placeholder="Descrie situatia, circumstantele si solicitarea formulata."
        error={errors.continut_plangere}
        registration={register('continut_plangere', {
          required: requiredMessage,
          minLength: {
            value: 30,
            message: 'Descrierea trebuie sa contina minimum 30 de caractere.',
          },
        })}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <TextInput
          id="data"
          label="Data"
          type="date"
          required
          error={errors.data}
          registration={register('data', { required: requiredMessage })}
        />
        <TextInput
          id="ora"
          label="Ora"
          type="text"
          inputMode="numeric"
          placeholder="HH:MM"
          error={errors.ora}
          registration={register('ora', {
            pattern: {
              value: time24hPattern,
              message: 'Introdu ora in format 24h, de exemplu 14:30.',
            },
          })}
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

ComplaintForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onValuesChange: PropTypes.func,
};

export default ComplaintForm;
