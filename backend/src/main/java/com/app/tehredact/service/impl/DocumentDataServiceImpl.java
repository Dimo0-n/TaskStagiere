package com.app.tehredact.service.impl;

import com.app.tehredact.dto.DocumentDataDto;
import com.app.tehredact.entity.Complaint;
import com.app.tehredact.entity.PowerOfAttorney;
import com.app.tehredact.entity.StatementOfClaim;
import com.app.tehredact.repository.ComplaintDocumentRepository;
import com.app.tehredact.repository.PowerOfAttorneyRepository;
import com.app.tehredact.repository.StatementOfClaimRepository;
import com.app.tehredact.service.DocumentDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DocumentDataServiceImpl implements DocumentDataService {

    @Autowired
    private ComplaintDocumentRepository complaintDocumentRepository;

    @Autowired
    private PowerOfAttorneyRepository powerOfAttorneyRepository;

    @Autowired
    private StatementOfClaimRepository statementOfClaimRepository;

    @Override
    public List<DocumentDataDto> getAllDocumentData() {
        List<DocumentDataDto> documentDataDto = new ArrayList<>();

        // Complaints
        complaintDocumentRepository.findAll().forEach(complaint ->
                documentDataDto.add(DocumentDataDto.builder()
                        .id("PL-" + complaint.getId())
                        .title("Plângere - " + complaint.getNumePetent())
                        .type("Plângere")
                        .createdAt(complaint.getCreatedAt() != null
                                ? complaint.getCreatedAt().toString() : null)
                        .status("Finalizat")
                        .build()
                )
        );

        // Power of Attorney
        powerOfAttorneyRepository.findAll().forEach(poa ->
                documentDataDto.add(DocumentDataDto.builder()
                        .id("PROC-" + poa.getId())
                        .title("Procură - " + poa.getMandatarNume() + " " + poa.getMandatarPrenume())
                        .type("Procură")
                        .createdAt(poa.getCreatedAt() != null
                                ? poa.getCreatedAt().toString() : null)
                        .status("Finalizat")
                        .build()
                )
        );

        // Statement of Claim
        statementOfClaimRepository.findAll().forEach(soc ->
                documentDataDto.add(DocumentDataDto.builder()
                        .id("CCJ-" + soc.getId())
                        .title("Cerere de chemare - " + soc.getReclamant())
                        .type("Cerere de chemare în judecată")
                        .createdAt(soc.getCreatedAt() != null
                                ? soc.getCreatedAt().toString() : null)
                        .status("Finalizat")
                        .build()
                )
        );

        documentDataDto.sort((a, b) -> {
            if (a.getCreatedAt() == null) return 1;
            if (b.getCreatedAt() == null) return -1;
            return b.getCreatedAt().compareTo(a.getCreatedAt());
        });

        return documentDataDto;
    }
}
