package com.app.tehredact.controller;

import com.app.tehredact.request.ComplaintGenerationRequest;
import com.app.tehredact.request.PowerOfAttorneyGenerationRequest;
import com.app.tehredact.request.StatementOfClaimGenerationRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    @PostMapping("/complaint")
    public ResponseEntity<?> createComplaint(
            @RequestBody ComplaintGenerationRequest request) {

        return ResponseEntity.ok().build();
    }

    @PostMapping("/power-of-attorney")
    public ResponseEntity<?> createPowerOfAttorney(
            @RequestBody PowerOfAttorneyGenerationRequest request) {

        return ResponseEntity.ok().build();
    }

    @PostMapping("/statement-of-claim")
    public ResponseEntity<?> createStatementOfClaim(
            @RequestBody StatementOfClaimGenerationRequest request) {

        return ResponseEntity.ok().build();
    }
}