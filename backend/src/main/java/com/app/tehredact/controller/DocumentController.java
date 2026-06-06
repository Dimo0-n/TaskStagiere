package com.app.tehredact.controller;

import com.app.tehredact.dto.ComplaintRequest;
import com.app.tehredact.dto.PowerOfAttorneyRequest;
import com.app.tehredact.dto.StatementOfClaimRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/documents")
public class DocumentController {

    @PostMapping("/complaint")
    public ResponseEntity<?> createComplaint(
            @RequestBody ComplaintRequest request) {

        return ResponseEntity.ok().build();
    }

    @PostMapping("/power-of-attorney")
    public ResponseEntity<?> createPowerOfAttorney(
            @RequestBody PowerOfAttorneyRequest request) {

        return ResponseEntity.ok().build();
    }

    @PostMapping("/statement-of-claim")
    public ResponseEntity<?> createStatementOfClaim(
            @RequestBody StatementOfClaimRequest request) {

        return ResponseEntity.ok().build();
    }
}