import PropTypes from 'prop-types';

export function FormField({ id, label, error, required = false, hint, children }) {
  return (
    <div>
      <label className="text-sm font-medium text-ink-700" htmlFor={id}>
        {label}
        {required ? <span className="ml-1 text-accent-600">*</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {hint ? <p className="mt-1 text-xs leading-5 text-ink-500">{hint}</p> : null}
      {error ? <p className="mt-1 text-xs font-medium text-red-600">{error.message}</p> : null}
    </div>
  );
}

const fieldErrorType = PropTypes.shape({
  message: PropTypes.string,
});

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: fieldErrorType,
  required: PropTypes.bool,
  hint: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export function TextInput({
  id,
  label,
  error,
  registration,
  required = false,
  hint,
  type = 'text',
  placeholder,
  ...restProps
}) {
  return (
    <FormField id={id} label={label} error={error} required={required} hint={hint}>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full rounded border border-legal-100 bg-white px-3 py-2.5 text-sm text-ink-900 outline-none transition placeholder:text-ink-500 focus:border-legal-600 focus:ring-2 focus:ring-legal-700/15"
        {...restProps}
        {...registration}
      />
    </FormField>
  );
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: fieldErrorType,
  registration: PropTypes.object.isRequired,
  required: PropTypes.bool,
  hint: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

export function TextArea({ id, label, error, registration, required = false, hint, rows = 5, placeholder }) {
  return (
    <FormField id={id} label={label} error={error} required={required} hint={hint}>
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        className="w-full resize-y rounded border border-legal-100 bg-white px-3 py-2.5 text-sm leading-6 text-ink-900 outline-none transition placeholder:text-ink-500 focus:border-legal-600 focus:ring-2 focus:ring-legal-700/15"
        {...registration}
      />
    </FormField>
  );
}

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: fieldErrorType,
  registration: PropTypes.object.isRequired,
  required: PropTypes.bool,
  hint: PropTypes.string,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
};
