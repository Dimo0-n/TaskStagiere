package com.app.tehredact.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentDataDto {

    private String id;

    private String title; //tip document + Nume Prenume cine a inaintat documentul

    private String type;

    private String createdAt;

    private String status;

}
