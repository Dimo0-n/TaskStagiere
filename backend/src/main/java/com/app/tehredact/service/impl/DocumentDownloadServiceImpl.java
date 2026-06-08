package com.app.tehredact.service.impl;

import com.app.tehredact.repository.ComplaintDocumentRepository;
import com.app.tehredact.repository.PowerOfAttorneyRepository;
import com.app.tehredact.repository.StatementOfClaimRepository;
import com.app.tehredact.service.DocumentDownloadService;
import com.app.tehredact.util.DocxToPdfConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DocumentDownloadServiceImpl implements DocumentDownloadService {

    @Autowired
    private ComplaintDocumentRepository complaintRepository;

    @Autowired
    private PowerOfAttorneyRepository powerRepository;

    @Autowired
    private StatementOfClaimRepository statementRepository;

    @Autowired
    private DocxToPdfConverter converter;

    @Override
    public ResponseEntity<byte[]> downloadDocx(String documentId) {

        byte[] bytes = getDocumentBytes(documentId);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=document.docx"
                )
                .body(bytes);
    }

    @Override
    public ResponseEntity<byte[]> downloadPdf(String documentId) {

        byte[] docxBytes = getDocumentBytes(documentId);

        try {
            byte[] pdfBytes = converter.convert(docxBytes);

            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=document.pdf"
                    )
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfBytes);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private byte[] getDocumentBytes(String documentId) {

        String[] parts = documentId.split("-");

        String prefix = parts[0];
        Long id = Long.parseLong(parts[1]);

        return switch (prefix) {

            case "PL" -> complaintRepository
                    .findById(id)
                    .orElseThrow()
                    .getDocumentBytes();

            case "PROC" -> powerRepository
                    .findById(id)
                    .orElseThrow()
                    .getDocumentBytes();

            case "CCJ" -> statementRepository
                    .findById(id)
                    .orElseThrow()
                    .getDocumentBytes();

            default -> throw new IllegalArgumentException(
                    "Tip document necunoscut: " + prefix
            );
        };
    }
}