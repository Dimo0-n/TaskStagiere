import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { defaultFormatting, FormattingContext } from './formattingDefaults.js';

export function FormattingProvider({ children }) {
  const [formatting, setFormatting] = useState(defaultFormatting);

  const value = useMemo(() => {
    const updateFormatting = (key, nextValue) => {
      setFormatting((current) => ({
        ...current,
        [key]: nextValue,
      }));
    };

    const resetFormatting = () => {
      setFormatting(defaultFormatting);
    };

    const previewStyles = {
      '--document-font-family': formatting.fontFamily,
      '--document-font-size': `${formatting.fontSize}px`,
      '--document-line-height': formatting.lineHeight,
      '--document-margin-top': `${formatting.marginTop}mm`,
      '--document-margin-right': `${formatting.marginRight}mm`,
      '--document-margin-bottom': `${formatting.marginBottom}mm`,
      '--document-margin-left': `${formatting.marginLeft}mm`,
      '--document-text-align': formatting.textAlignment,
    };

    return {
      formatting,
      updateFormatting,
      resetFormatting,
      previewStyles,
    };
  }, [formatting]);

  return <FormattingContext.Provider value={value}>{children}</FormattingContext.Provider>;
}

FormattingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
