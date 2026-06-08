package com.app.tehredact.service;

import org.springframework.http.ResponseEntity;

public interface DocumentDownloadService {

    ResponseEntity<byte[]> downloadDocx(String documentId);

    ResponseEntity<byte[]> downloadPdf(String documentId);
}