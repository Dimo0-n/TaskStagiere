package com.app.tehredact.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "power_of_attorney")
public class PowerOfAttorney {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @Column(columnDefinition = "TEXT")
    private String scopMandat;

    private String dataEmiterii;

    @OneToOne
    @JoinColumn(name = "formatting_settings_id")
    private FormattingSettings formattingSettings;

    private LocalDateTime createdAt;

    @Column(name = "document_bytes")
    private byte[] documentBytes;
}