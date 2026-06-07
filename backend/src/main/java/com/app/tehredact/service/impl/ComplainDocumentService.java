package com.app.tehredact.service.impl;

import com.app.tehredact.dto.ComplaintRequestDto;
import com.app.tehredact.dto.FormattingSettingsDto;

import java.io.IOException;

public interface ComplainDocumentService {

    byte[] generate(ComplaintRequestDto data, FormattingSettingsDto fmt) throws IOException;

}
