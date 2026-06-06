package com.app.tehredact.request;

import com.app.tehredact.dto.ComplaintRequestDto;
import com.app.tehredact.dto.FormattingSettingsDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ComplaintGenerationRequest {

    private ComplaintRequestDto documentData;

    private FormattingSettingsDto formatting;
}