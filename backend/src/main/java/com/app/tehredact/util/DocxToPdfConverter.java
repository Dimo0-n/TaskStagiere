package com.app.tehredact.util;

import org.docx4j.Docx4J;
import org.docx4j.fonts.IdentityPlusMapper;
import org.docx4j.fonts.PhysicalFonts;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Component
public class DocxToPdfConverter {

    public byte[] convert(byte[] docxBytes) throws Exception {
        // 1. Încarcă docx-ul din bytes
        WordprocessingMLPackage wordPackage = WordprocessingMLPackage
                .load(new ByteArrayInputStream(docxBytes));

        // 2. Configurare mapper fonturi (IdentityPlusMapper = fonturile sistemului + fallback)
        wordPackage.setFontMapper(new IdentityPlusMapper());
        PhysicalFonts.discoverPhysicalFonts();

        // 3. Conversie → PDF
        ByteArrayOutputStream pdfOut = new ByteArrayOutputStream();
        Docx4J.toPDF(wordPackage, pdfOut);

        return pdfOut.toByteArray();
    }
}