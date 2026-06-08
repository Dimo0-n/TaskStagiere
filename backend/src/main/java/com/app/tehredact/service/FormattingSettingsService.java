package com.app.tehredact.service;

import com.app.tehredact.dto.FormattingSettingsDto;
import com.app.tehredact.entity.FormattingSettings;

public interface FormattingSettingsService {

    FormattingSettings convertFormattingSettingsDtoToEntity(FormattingSettingsDto settings);

}
