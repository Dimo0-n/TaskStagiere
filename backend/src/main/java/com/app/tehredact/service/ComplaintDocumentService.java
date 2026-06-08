package com.app.tehredact.service;

import com.app.tehredact.dto.ComplaintRequestDto;
import com.app.tehredact.dto.FormattingSettingsDto;

import java.io.IOException;

public interface ComplaintDocumentService {

    byte[] generate(ComplaintRequestDto data, FormattingSettingsDto fmt) throws IOException;

}
