package com.app.tehredact.controller;

import com.app.tehredact.request.ComplaintGenerationRequest;
import com.app.tehredact.request.PowerOfAttorneyGenerationRequest;
import com.app.tehredact.request.StatementOfClaimGenerationRequest;
import com.app.tehredact.service.impl.ComplaintDocumentServiceImpl;
import com.app.tehredact.service.impl.FormattingSettingsServiceImpl;
import com.app.tehredact.service.impl.PowerOfAttorneyDocumentServiceImpl;
import com.app.tehredact.service.impl.StatementOfClaimDocumentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final ComplaintDocumentServiceImpl complaintService;
    private final PowerOfAttorneyDocumentServiceImpl powerOfAttorneyService;
    private final StatementOfClaimDocumentServiceImpl statementOfClaimService;

    // ── POST /api/documents/complaint ─────────────────────────────────────────
    @PostMapping("/complaint")
    public ResponseEntity<byte[]> createComplaint(
            @RequestBody ComplaintGenerationRequest request) throws Exception {

//        System.out.println(request.getDocumentData().getDataNasterii() + " " + request.getFormatting().getFontFamily());
        byte[] docBytes = complaintService.generate(
                request.getDocumentData(),
                request.getFormatting()
        );
        return buildDocxResponse(docBytes, "plangere.docx");
    }

    // ── POST /api/documents/power-of-attorney ────────────────────────────────
    @PostMapping("/power-of-attorney")
    public ResponseEntity<byte[]> createPowerOfAttorney(
            @RequestBody PowerOfAttorneyGenerationRequest request) throws Exception {

        byte[] docBytes = powerOfAttorneyService.generate(
                request.getDocumentData(),
                request.getFormatting()
        );
        return buildDocxResponse(docBytes, "procura.docx");
    }

    // ── POST /api/documents/statement-of-claim ───────────────────────────────
    @PostMapping("/statement-of-claim")
    public ResponseEntity<byte[]> createStatementOfClaim(
            @RequestBody StatementOfClaimGenerationRequest request) throws Exception {

        byte[] docBytes = statementOfClaimService.generate(
                request.getDocumentData(),
                request.getFormatting()
        );
        return buildDocxResponse(docBytes, "cerere-chemare-judecata.docx");
    }

    private ResponseEntity<byte[]> buildDocxResponse(byte[] content, String filename) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ));
        headers.setContentDisposition(
                ContentDisposition.attachment().filename(filename).build()
        );
        headers.setContentLength(content.length);
        return ResponseEntity.ok().headers(headers).body(content);
    }
}