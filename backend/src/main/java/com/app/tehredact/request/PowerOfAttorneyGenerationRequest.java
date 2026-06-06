package com.app.tehredact.request;

import com.app.tehredact.dto.FormattingSettingsDto;
import com.app.tehredact.dto.PowerOfAttorneyRequestDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PowerOfAttorneyGenerationRequest {

    private PowerOfAttorneyRequestDto documentData;

    private FormattingSettingsDto formatting;
}