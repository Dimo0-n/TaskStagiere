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
@Table(name = "complaints")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String organDestinatar;

    private String numePetent;

    private String dataNasterii;

    private String adresa;

    private String ocupatie;

    private String telefon;

    @Column(columnDefinition = "TEXT")
    private String continutPlangere;

    private String data;

    private String ora;

    @OneToOne
    @JoinColumn(name = "formatting_settings_id")
    private FormattingSettings formattingSettings;

    private LocalDateTime createdAt;

    @Column(name = "document_bytes")
    private byte[] documentBytes;

}