package com.app.tehredact.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PowerOfAttorneyRequestDto {

    private String mandatarNume;

    private String mandatarPrenume;

    private String mandatarCetatenie;

    private String mandatarAdresaDomiciliu;

    private String mandatarIdnp;

    private String mandatarSerie;

    private String imputernicitNume;

    private String imputernicitPrenume;

    private String imputernicitCetatenie;

    private String imputernicitAdresaDomiciliu;

    private String imputernicitIdnp;

    private String imputernicitSerie;

    private String loculRedactariiDocumentului;

    private String scopMandat;

    private String dataEmiterii;
}