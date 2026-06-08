package com.app.tehredact.service.impl;

import com.app.tehredact.dto.FormattingSettingsDto;
import com.app.tehredact.entity.FormattingSettings;
import com.app.tehredact.repository.FormattingSettingRepository;
import com.app.tehredact.service.FormattingSettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FormattingSettingsServiceImpl implements FormattingSettingsService {

    @Override
    public FormattingSettings convertFormattingSettingsDtoToEntity(FormattingSettingsDto fmt) {
        FormattingSettings formattingSettings = new FormattingSettings();

        formattingSettings.setFontFamily(fmt.getFontFamily());
        formattingSettings.setFontSize(fmt.getFontSize());
        formattingSettings.setLineHeight(fmt.getLineHeight());
        formattingSettings.setMarginLeft(fmt.getMarginLeft());
        formattingSettings.setMarginRight(fmt.getMarginRight());
        formattingSettings.setMarginTop(fmt.getMarginTop());
        formattingSettings.setMarginBottom(fmt.getMarginBottom());
        formattingSettings.setTextAlignment(fmt.getTextAlignment());

        return formattingSettings;

    }

}
