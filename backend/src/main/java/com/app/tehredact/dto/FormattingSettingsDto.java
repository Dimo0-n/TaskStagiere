package com.app.tehredact.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FormattingSettingsDto {

    private String fontFamily;

    private Integer fontSize;

    private Double lineHeight;

    private Integer marginTop;

    private Integer marginRight;

    private Integer marginBottom;

    private Integer marginLeft;

    private String textAlignment;
}