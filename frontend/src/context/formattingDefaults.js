import { createContext } from 'react';

export const defaultFormatting = {
  fontFamily: 'Times New Roman',
  fontSize: 12,
  lineHeight: 1.5,
  marginTop: 20,
  marginRight: 15,
  marginBottom: 20,
  marginLeft: 25,
  textAlignment: 'justify',
};

export const FormattingContext = createContext(null);
