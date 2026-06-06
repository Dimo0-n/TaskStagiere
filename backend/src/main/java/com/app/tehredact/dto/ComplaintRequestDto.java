package com.app.tehredact.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ComplaintRequestDto {

    private String organDestinatar;

    private String numePetent;

    private String dataNasterii;

    private String adresa;

    private String ocupatie;

    private String telefon;

    private String continutPlangere;

    private String data;

    private String ora;
}