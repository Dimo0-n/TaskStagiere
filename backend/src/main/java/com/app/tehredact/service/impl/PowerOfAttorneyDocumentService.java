package com.app.tehredact.service.impl;

import com.app.tehredact.dto.FormattingSettingsDto;
import com.app.tehredact.dto.PowerOfAttorneyRequestDto;

import java.io.IOException;

public interface PowerOfAttorneyDocumentService {

    byte[] generate(PowerOfAttorneyRequestDto data, FormattingSettingsDto fmt) throws IOException;

}
