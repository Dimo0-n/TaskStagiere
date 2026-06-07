package com.app.tehredact.service.impl;

import com.app.tehredact.dto.FormattingSettingsDto;
import com.app.tehredact.dto.StatementOfClaimRequestDto;

import java.io.IOException;

public interface StatementOfClaimDocumentService {

    byte[] generate(StatementOfClaimRequestDto data, FormattingSettingsDto fmt) throws IOException;

}
