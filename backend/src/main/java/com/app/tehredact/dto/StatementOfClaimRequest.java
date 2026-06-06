package com.app.tehredact.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StatementOfClaimRequest {

    private String instanta;

    private String reclamant;

    private String adresaReclamant;

    private String telefonReclamant;

    private String emailReclamant;

    private String parat;

    private String adresaParat;

    private String reprezentant;

    private String obiectCerere;

    private String circumstanteDeFapt;

    private String temeiJuridic;

    private String solicitari;

    private String anexe;

    private String data;
}