import { useContext } from 'react';
import { FormattingContext } from './formattingDefaults.js';

export function useFormatting() {
  const context = useContext(FormattingContext);

  if (!context) {
    throw new Error('useFormatting must be used inside FormattingProvider');
  }

  return context;
}
