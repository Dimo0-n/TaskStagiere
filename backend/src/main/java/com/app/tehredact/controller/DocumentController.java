package com.app.tehredact.controller;

import com.app.tehredact.dto.DocumentDataDto;
import com.app.tehredact.service.DocumentDataService;
import com.app.tehredact.service.impl.DocumentDataServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {

    @Autowired
    private DocumentDataService documentService;

    @GetMapping("/all")
    public List<DocumentDataDto> getAllDocuemnts() {
        return documentService.getAllDocumentData();
    }

}
