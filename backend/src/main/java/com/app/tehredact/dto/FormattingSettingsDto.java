package com.app.tehredact.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
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