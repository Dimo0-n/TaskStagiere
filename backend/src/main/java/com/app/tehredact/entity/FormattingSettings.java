package com.app.tehredact.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "formatting_settings")
public class FormattingSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fontFamily;

    private Integer fontSize;

    private Double lineHeight;

    private Integer marginTop;

    private Integer marginRight;

    private Integer marginBottom;

    private Integer marginLeft;

    private String textAlignment;
}