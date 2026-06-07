package com.app.tehredact.service;

import com.app.tehredact.dto.ComplaintRequestDto;
import com.app.tehredact.dto.FormattingSettingsDto;
import com.app.tehredact.service.impl.ComplainDocumentService;
import org.apache.poi.xwpf.usermodel.*;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import static com.app.tehredact.util.DocumentBuilderHelper.*;

@Service
public class ComplaintDocumentServiceImpl implements ComplainDocumentService {

    /**
     * Generează documentul PLÂNGERE conform template-ului din imagine.
     *
     * Layout:
     *   Către
     *   [organDestinatar]
     *
     *   Subsemnatul(a) [numePetent], născut(ă) la data de [dataNasterii],
     *   domiciliat(ă) în [adresa], având ocupația [ocupatie],
     *   telefon [telefon], formulez prezenta:
     *
     *                         PLÂNGERE
     *
     *   [continutPlangere]
     *   Solicit înregistrarea prezentei plângeri...
     *
     *   Data: [data]          Semnătura:
     *   Ora:  [ora]
     *                         ________________
     */
    public byte[] generate(ComplaintRequestDto data, FormattingSettingsDto fmt) throws IOException {
        try (XWPFDocument doc = new XWPFDocument();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            configurePageA4(doc, fmt);

            // ── Către ────────────────────────────────────────────────────────
            XWPFParagraph catrePar = createParagraph(doc, ParagraphAlignment.CENTER, 200, 0, fmt);
            addRun(catrePar, "Către", false, false, fmt);

            XWPFParagraph organPar = createParagraph(doc, ParagraphAlignment.CENTER, 0, 400, fmt);
            addRun(organPar, val(data.getOrganDestinatar(), 25), false, false, fmt);

            // ── Subsemnatul(a) ────────────────────────────────────────────────
            XWPFParagraph line1 = createParagraph(doc, ParagraphAlignment.BOTH, 200, 0, fmt);
            addRun(line1, "        Subsemnatul(a) ", fmt);
            addRun(line1, val(data.getNumePetent(), 25), false, true, fmt);
            addRun(line1, ", născut(ă) la data de ", fmt);

            XWPFParagraph line2 = createParagraph(doc, ParagraphAlignment.BOTH, 0, 0, fmt);
            addRun(line2, val(data.getDataNasterii(), 20), false, true, fmt);
            addRun(line2, ", domiciliat(ă) în ", fmt);
            addRun(line2, val(data.getAdresa(), 25), false, true, fmt);
            addRun(line2, ", având ocupația ", fmt);

            XWPFParagraph line3 = createParagraph(doc, ParagraphAlignment.BOTH, 0, 400, fmt);
            addRun(line3, val(data.getOcupatie(), 20), false, true, fmt);
            addRun(line3, ", telefon ", fmt);
            addRun(line3, val(data.getTelefon(), 20), false, true, fmt);
            addRun(line3, ", formulez prezenta:", fmt);

            // ── Titlu PLÂNGERE ────────────────────────────────────────────────
            XWPFParagraph titluPar = createParagraph(doc, ParagraphAlignment.CENTER, 200, 200, fmt);
            addRun(titluPar, "PLÂNGERE", true, false, fmt);

            // ── Conținut plângere ─────────────────────────────────────────────
            XWPFParagraph continutPar = createParagraph(doc, ParagraphAlignment.LEFT, 0, 0, fmt);
            addRun(continutPar, "        " + val(data.getContinutPlangere(), 25), fmt);

            // ── Solicit ───────────────────────────────────────────────────────
            XWPFParagraph solicitPar = createParagraph(doc, ParagraphAlignment.BOTH, 200, 600, fmt);
            addRun(solicitPar,
                    "Solicit înregistrarea prezentei plângeri, verificarea circumstanțelor " +
                    "indicate și comunicarea rezultatului în termenul prevăzut de lege.", fmt);

            // ── Data / Semnătura ──────────────────────────────────────────────
            XWPFParagraph dataPar = createParagraph(doc, ParagraphAlignment.LEFT, 0, 0, fmt);
            addTabStop(dataPar, 5500);
            addRun(dataPar, "Data: " + val(data.getData(), 20), fmt);
            XWPFRun tabRun = dataPar.createRun();
            tabRun.addTab();
            tabRun.setText("Semnătura:");

            XWPFParagraph oraPar = createParagraph(doc, ParagraphAlignment.LEFT, 0, 800, fmt);
            addRun(oraPar, "Ora: " + val(data.getOra(), 20), fmt);

            // ── Linie semnătură ───────────────────────────────────────────────
            addSignatureLine(doc, fmt);

            doc.write(out);

            return out.toByteArray();
        }
    }
}