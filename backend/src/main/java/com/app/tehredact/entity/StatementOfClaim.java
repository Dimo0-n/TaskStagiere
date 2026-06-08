package com.app.tehredact.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "statement_of_claims")
public class StatementOfClaim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String instanta;

    private String reclamant;

    private String adresaReclamant;

    private String telefonReclamant;

    private String emailReclamant;

    private String parat;

    private String adresaParat;

    private String reprezentant;

    private String obiectCerere;

    @Column(columnDefinition = "TEXT")
    private String circumstanteDeFapt;

    @Column(columnDefinition = "TEXT")
    private String temeiJuridic;

    @Column(columnDefinition = "TEXT")
    private String solicitari;

    @Column(columnDefinition = "TEXT")
    private String anexe;

    private String data;

    @OneToOne
    @JoinColumn(name = "formatting_settings_id")
    private FormattingSettings formattingSettings;

    @Column(name = "document_bytes")
    private byte[] documentBytes;
}