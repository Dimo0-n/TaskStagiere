package com.app.tehredact.controller;

import com.app.tehredact.dto.DocumentDataDto;
import com.app.tehredact.service.DocumentDataService;
import com.app.tehredact.service.DocumentDownloadService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {

    @Autowired
    private DocumentDataService documentService;

    @Autowired
    private DocumentDownloadService documentDownloadService;

    @GetMapping("/all")
    public List<DocumentDataDto> getAllDocuemnts() {
        return documentService.getAllDocumentData();
    }

    @GetMapping("/{documentId}/docx")
    public ResponseEntity<byte[]> downloadDocx(
            @PathVariable String documentId) {

        return documentDownloadService.downloadDocx(documentId);
    }

    @GetMapping("/{documentId}/pdf")
    public ResponseEntity<byte[]> downloadPdf(
            @PathVariable String documentId) {

        return documentDownloadService.downloadPdf(documentId);
    }

}
