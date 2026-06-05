import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Save } from 'lucide-react';
import { TextArea, TextInput } from '../ui/FormControls.jsx';

const requiredMessage = 'Camp obligatoriu.';

const defaultValues = {
      mandatar_nume: '',
      mandatar_prenume: '',
      mandatar_cetatenie:'',
      mandatar_adresa_domiciliu: '',
      mandatar_idnp: '',
      mandatar_serie: '',
      scop_mandat: '',
      imputernicit_nume: '',
      imputernicit_prenume: '',
      imputernicit_cetatenie:'',
      imputernicit_adresa_domiciliu: '',
      imputernicit_idnp: '',
      locul_redactarii_documentului: '',
      imputernicit_serie: '',
      data_emiterii: '',
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
          id="mandatar_nume"
          label="Nume"
          required
          error={errors.mandatar_nume}
          registration={register('mandatar_nume', { required: requiredMessage })}
        />
        <TextInput
          id="mandatar_prenume"
          label="Prenume"
          required
          error={errors.mandatar_prenume}
          registration={register('mandatar_prenume', { required: requiredMessage })}
        />
      </div>

        <TextInput
            id="mandatar_cetatenie"
            label="Tara de origine mandatar"
            required
            error={errors.mandatar_cetatenie}
            registration={register('mandatar_cetatenie', { required: requiredMessage })}
        />

      <TextInput
        id="mandatar_adresa_domiciliu"
        label="Adresa domiciliu"
        required
        error={errors.mandatar_adresa_domiciliu}
        registration={register('mandatar_adresa_domiciliu', { required: requiredMessage })}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          id="mandatar_idnp"
          label="IDNP"
          required
          error={errors.mandatar_idnp}
          registration={register('mandatar_idnp', { required: requiredMessage })}
        />
        <TextInput
          id="mandatar_serie"
          label="Serie buletin"
          required
          error={errors.mandatar_serie}
          registration={register('mandatar_serie', { required: requiredMessage })}
        />
      </div>

      <h3 className="text-sm font-semibold text-ink-900">Date Persoana imputernicita</h3>

        <div className="grid gap-4 md:grid-cols-2">
            <TextInput
                id="imputernicit_nume"
                label="Nume"
                required
                error={errors.imputernicit_nume}
                registration={register('imputernicit_nume', { required: requiredMessage })}
            />
            <TextInput
                id="imputernicit_prenume"
                label="Prenume"
                required
                error={errors.imputernicit_prenume}
                registration={register('imputernicit_prenume', { required: requiredMessage })}
            />
        </div>

        <TextInput
            id="imputernicit_cetatenie"
            label="Tara de origine imputernicit"
            required
            error={errors.imputernicit_cetatenie}
            registration={register('imputernicit_cetatenie', { required: requiredMessage })}
        />

        <TextInput
            id="imputernicit_adresa_domiciliu"
            label="Adresa domiciliu"
            required
            error={errors.imputernicit_adresa_domiciliu}
            registration={register('imputernicit_adresa_domiciliu', { required: requiredMessage })}
        />

        <div className="grid gap-4 md:grid-cols-2">
            <TextInput
                id="imputernicit_idnp"
                label="IDNP"
                required
                error={errors.imputernicit_idnp}
                registration={register('imputernicit_idnp', { required: requiredMessage })}
            />
            <TextInput
                id="imputernicit_serie"
                label="Serie buletin"
                required
                error={errors.imputernicit_serie}
                registration={register('imputernicit_serie', { required: requiredMessage })}
            />
        </div>

      <h3 className="text-sm font-semibold text-ink-900">Detalii Mandat</h3>
        <TextInput
            id="locul_redactarii_documentului"
            label="Institutia redactarii documentului"
            required
            error={errors.locul_redactarii_documentului}
            registration={register('locul_redactarii_documentului', { required: requiredMessage })}
        />
      <TextArea
        id="scop_mandat"
        label="Scopul mandatului"
        required
        rows={6}
        placeholder="Descrie scopul pentru care se acorda aceasta procura..."
        error={errors.scop_mandat}
        registration={register('scop_mandat', {
          required: requiredMessage,
          minLength: {
            value: 20,
            message: 'Scopul mandatului trebuie sa contina minimum 20 de caractere.',
          },
        })}
      />

      <TextInput
        id="data_emiterii"
        label="Data emiterii"
        type="date"
        required
        error={errors.data_emiterii}
        registration={register('data_emiterii', { required: requiredMessage })}
      />

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

PowerOfAttorneyForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onValuesChange: PropTypes.func,
};

export default PowerOfAttorneyForm;
