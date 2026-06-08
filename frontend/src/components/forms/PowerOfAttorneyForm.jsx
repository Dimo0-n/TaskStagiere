import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Save } from 'lucide-react';
import { TextArea, TextInput } from '../ui/FormControls.jsx';

const requiredMessage = 'Camp obligatoriu.';

const defaultValues = {
      mandatarNume: '',
      mandatarPrenume: '',
      mandatarCetatenie:'',
      mandatarAdresaDomiciliu: '',
      mandatarIdnp: '',
      mandatarSerie: '',
      scopMandat: '',
      imputernicitNume: '',
      imputernicitPrenume: '',
      imputernicitCetatenie:'',
      imputernicitAdresaDomiciliu: '',
      imputernicitIdnp: '',
      loculRedactariiDocumentului: '',
      imputernicitSerie: '',
      dataEmiterii: '',
};

function PowerOfAttorneyForm({ onSubmit, onValuesChange }) {
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
      <h3 className="text-sm font-semibold text-ink-900">Date Mandatar</h3>

      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          id="mandatarNume"
          label="Nume"
          required
          error={errors.mandatarNume}
          registration={register('mandatarNume', { required: requiredMessage })}
        />
        <TextInput
          id="mandatarPrenume"
          label="Prenume"
          required
          error={errors.mandatarPrenume}
          registration={register('mandatarPrenume', { required: requiredMessage })}
        />
      </div>

        <TextInput
            id="mandatarCetatenie"
            label="Tara de origine mandatar"
            required
            error={errors.mandatarCetatenie}
            registration={register('mandatarCetatenie', { required: requiredMessage })}
        />

      <TextInput
        id="mandatarAdresaDomiciliu"
        label="Adresa domiciliu"
        required
        error={errors.mandatarAdresaDomiciliu}
        registration={register('mandatarAdresaDomiciliu', { required: requiredMessage })}
      />

      <div className="grid gap-4 md:grid-cols-2">
          <TextInput
              id="mandatarIdnp"
              label="IDNP"
              required
              error={errors.mandatarIdnp}
              registration={register('mandatarIdnp', {
                  required: requiredMessage,
                  pattern: {
                      value: /^\d{13}$/,
                      message: 'IDNP-ul trebuie să conțină exact 13 cifre.',
                  },
              })}
          />
          <TextInput
              id="mandatarSerie"
              label="Serie buletin"
              required
              error={errors.mandatarSerie}
              registration={register('mandatarSerie', {
                  required: requiredMessage,
                  pattern: {
                      value: /^[A-Z]\d{8}$/,
                      message: 'Seria trebuie să conțină o majuscula urmată de 8 cifre.',
                  },
              })}
          />
      </div>

      <h3 className="text-sm font-semibold text-ink-900">Date Persoana imputernicita</h3>

        <div className="grid gap-4 md:grid-cols-2">
            <TextInput
                id="imputernicitNume"
                label="Nume"
                required
                error={errors.imputernicitNume}
                registration={register('imputernicitNume', { required: requiredMessage })}
            />
            <TextInput
                id="imputernicitPrenume"
                label="Prenume"
                required
                error={errors.imputernicitPrenume}
                registration={register('imputernicitPrenume', { required: requiredMessage })}
            />
        </div>

        <TextInput
            id="imputernicitCetatenie"
            label="Tara de origine imputernicit"
            required
            error={errors.imputernicitCetatenie}
            registration={register('imputernicitCetatenie', { required: requiredMessage })}
        />

        <TextInput
            id="imputernicitAdresaDomiciliu"
            label="Adresa domiciliu"
            required
            error={errors.imputernicitAdresaDomiciliu}
            registration={register('imputernicitAdresaDomiciliu', { required: requiredMessage })}
        />

        <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-4 md:grid-cols-2">
                <TextInput
                    id="imputernicitIdnp"
                    label="IDNP"
                    required
                    error={errors.imputernicitIdnp}
                    registration={register('imputernicitIdnp', {
                        required: requiredMessage,
                        pattern: {
                            value: /^\d{13}$/,
                            message: 'IDNP-ul trebuie să conțină exact 13 cifre.',
                        },
                    })}
                />
                <TextInput
                    id="imputernicitSerie"
                    label="Serie buletin"
                    required
                    error={errors.imputernicitSerie}
                    registration={register('imputernicitSerie', {
                        required: requiredMessage,
                        pattern: {
                            value: /^[A-Z]\d{8}$/,
                            message: 'Seria trebuie să conțină o literă mare urmată de 8 cifre.',
                        },
                    })}
                />
            </div>
        </div>

      <h3 className="text-sm font-semibold text-ink-900">Detalii Mandat</h3>
        <TextInput
            id="loculRedactariiDocumentului"
            label="Institutia redactarii documentului"
            required
            error={errors.loculRedactariiDocumentului}
            registration={register('loculRedactariiDocumentului', { required: requiredMessage })}
        />
      <TextArea
        id="scopMandat"
        label="Scopul mandatului"
        required
        rows={6}
        placeholder="Descrie scopul pentru care se acorda aceasta procura..."
        error={errors.scopMandat}
        registration={register('scopMandat', {
          required: requiredMessage,
          minLength: {
            value: 20,
            message: 'Scopul mandatului trebuie sa contina minimum 20 de caractere.',
          },
        })}
      />

      <TextInput
        id="dataEmiterii"
        label="Data emiterii"
        type="date"
        required
        error={errors.dataEmiterii}
        registration={register('dataEmiterii', { required: requiredMessage })}
      />

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

PowerOfAttorneyForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onValuesChange: PropTypes.func,
};

export default PowerOfAttorneyForm;
