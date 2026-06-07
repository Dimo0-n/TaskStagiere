package com.app.tehredact.service;

import com.app.tehredact.dto.FormattingSettingsDto;
import com.app.tehredact.dto.StatementOfClaimRequestDto;
import com.app.tehredact.service.impl.StatementOfClaimDocumentService;
import com.app.tehredact.util.DocumentBuilderHelper;
import org.apache.poi.xwpf.usermodel.*;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import static com.app.tehredact.util.DocumentBuilderHelper.*;

@Service
public class StatementOfClaimDocumentServiceImpl implements StatementOfClaimDocumentService {

    /**
     * Generează CEREREA DE CHEMARE ÎN JUDECATĂ conform template-ului din imagine.
     *
     * Layout:
     *   [instanta]
     *
     *   Reclamant: [reclamant], cu domiciliul/sediul în [adresaReclamant],
     *              telefon [telefonReclamant], email [emailReclamant].
     *
     *   Pârât: [parat], cu domiciliul/sediul în [adresaParat].
     *
     *   Reprezentant: [reprezentant].
     *
     *              CERERE DE CHEMARE ÎN JUDECATĂ
     *
     *   Obiectul cererii: [obiectCerere].
     *
     *   CIRCUMSTANȚE DE FAPT
     *   [circumstanteDeFapt]
     *
     *   TEMEI JURIDIC
     *   [temeiJuridic]
     *
     *   SOLICITĂRI
     *   [solicitari]
     *
     *   ANEXE
     *   [anexe]
     *
     *   Data: [data]         Semnătura:
     *                        ______________
     */
    public byte[] generate(StatementOfClaimRequestDto data, FormattingSettingsDto fmt) throws IOException {
        try (XWPFDocument doc = new XWPFDocument();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            configurePageA4(doc, fmt);

            // ── Instanța (destinatar) ─────────────────────────────────────────
            XWPFParagraph instPar = createParagraph(doc, ParagraphAlignment.LEFT, 200, 400, fmt);
            addRun(instPar, "        " + DocumentBuilderHelper.val(data.getInstanta(), 25), fmt);

            // ── Reclamant ─────────────────────────────────────────────────────
            XWPFParagraph reclamantPar = createParagraph(doc, ParagraphAlignment.BOTH, 0, 0, fmt);
            addRun(reclamantPar, "        Reclamant:  ", fmt);
            addRun(reclamantPar, DocumentBuilderHelper.val(data.getReclamant(), 20), false, true, fmt);
            addRun(reclamantPar, ", cu domiciliul/sediul în ", fmt);

            XWPFParagraph reclamantPar2 = createParagraph(doc, ParagraphAlignment.BOTH, 0, 0, fmt);
            addRun(reclamantPar2, DocumentBuilderHelper.val(data.getAdresaReclamant(), 25), false, true, fmt);
            addRun(reclamantPar2, ", telefon ", fmt);
            addRun(reclamantPar2, DocumentBuilderHelper.val(data.getTelefonReclamant(), 15), false, true, fmt);
            addRun(reclamantPar2, ", email ", fmt);

            XWPFParagraph reclamantPar3 = createParagraph(doc, ParagraphAlignment.BOTH, 0, 200, fmt);
            addRun(reclamantPar3, DocumentBuilderHelper.val(data.getEmailReclamant(), 20), false, true, fmt);
            addRun(reclamantPar3, ".", fmt);

            // ── Pârât ─────────────────────────────────────────────────────────
            XWPFParagraph paratPar = createParagraph(doc, ParagraphAlignment.BOTH, 0, 0, fmt);
            addRun(paratPar, "        Pârât:  ", fmt);
            addRun(paratPar, DocumentBuilderHelper.val(data.getParat(), 20), false, true, fmt);
            addRun(paratPar, ", cu domiciliul/sediul în ", fmt);

            XWPFParagraph paratPar2 = createParagraph(doc, ParagraphAlignment.BOTH, 0, 200, fmt);
            addRun(paratPar2, DocumentBuilderHelper.val(data.getAdresaParat(), 25), false, true, fmt);
            addRun(paratPar2, ".", fmt);

            // ── Reprezentant ──────────────────────────────────────────────────
            XWPFParagraph repPar = createParagraph(doc, ParagraphAlignment.BOTH, 0, 300, fmt);
            addRun(repPar, "        Reprezentant: ", fmt);
            addRun(repPar, DocumentBuilderHelper.val(data.getReprezentant(), 20), false, true, fmt);
            addRun(repPar, ".", fmt);

            // ── Titlu principal ───────────────────────────────────────────────
            XWPFParagraph titluPar = createParagraph(doc, ParagraphAlignment.CENTER, 200, 200, fmt);
            addRun(titluPar, "CERERE DE CHEMARE ÎN JUDECATĂ", true, false, fmt);

            // ── Obiectul cererii ──────────────────────────────────────────────
            XWPFParagraph obiectPar = createParagraph(doc, ParagraphAlignment.BOTH, 0, 300, fmt);
            addRun(obiectPar, "        Obiectul cererii: ", fmt);
            addRun(obiectPar, DocumentBuilderHelper.val(data.getObiectCerere(), 20), false, true, fmt);
            addRun(obiectPar, ".", fmt);

            // ── CIRCUMSTANȚE DE FAPT ──────────────────────────────────────────
            XWPFParagraph cfLabel = createParagraph(doc, ParagraphAlignment.LEFT, 200, 100, fmt);
            addRun(cfLabel, "CIRCUMSTANȚE DE FAPT", true, false, fmt);

            XWPFParagraph cfContent = createParagraph(doc, ParagraphAlignment.BOTH, 0, 300, fmt);
            addRun(cfContent, "        " + val(data.getCircumstanteDeFapt(),
                    "Circumstanțele de fapt urmează a fi completate de reclamant."), fmt);

            // ── TEMEI JURIDIC ─────────────────────────────────────────────────
            XWPFParagraph tjLabel = createParagraph(doc, ParagraphAlignment.LEFT, 200, 100, fmt);
            addRun(tjLabel, "TEMEI JURIDIC", true, false, fmt);

            XWPFParagraph tjContent = createParagraph(doc, ParagraphAlignment.BOTH, 0, 300, fmt);
            addRun(tjContent, "        " + val(data.getTemeiJuridic(),
                    "Temeiul juridic urmează a fi indicat conform normelor aplicabile."), fmt);

            // ── SOLICITĂRI ────────────────────────────────────────────────────
            XWPFParagraph solLabel = createParagraph(doc, ParagraphAlignment.LEFT, 200, 100, fmt);
            addRun(solLabel, "SOLICITĂRI", true, false, fmt);

            XWPFParagraph solContent = createParagraph(doc, ParagraphAlignment.BOTH, 0, 300, fmt);
            addRun(solContent, "        " + val(data.getSolicitari(),
                    "Solicitările reclamantului urmează a fi completate."), fmt);

            // ── ANEXE ─────────────────────────────────────────────────────────
            XWPFParagraph anexeLabel = createParagraph(doc, ParagraphAlignment.LEFT, 200, 100, fmt);
            addRun(anexeLabel, "ANEXE", true, false, fmt);

            XWPFParagraph anexeContent = createParagraph(doc, ParagraphAlignment.LEFT, 0, 400, fmt);
            addRun(anexeContent, "        " + DocumentBuilderHelper.val(data.getAnexe(), 25), fmt);

            // ── Data / Semnătura ──────────────────────────────────────────────
            XWPFParagraph dataPar = createParagraph(doc, ParagraphAlignment.LEFT, 0, 0, fmt);
            addTabStop(dataPar, 5500);
            addRun(dataPar, "Data:", fmt);
            XWPFRun tabRun = dataPar.createRun();
            tabRun.addTab();
            tabRun.setText("Semnătura:");

            XWPFParagraph dataValPar = createParagraph(doc, ParagraphAlignment.LEFT, 0, 800, fmt);
            addRun(dataValPar, DocumentBuilderHelper.val(data.getData(), 20), fmt);

            addSignatureLine(doc, fmt);

            doc.write(out);
            return out.toByteArray();
        }
    }

    // Suprascriere val() cu fallback text custom (nu puncte)
    private String val(String value, String fallback) {
        return (value != null && !value.isBlank()) ? value : fallback;
    }
}