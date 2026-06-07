package com.app.tehredact.service;

import com.app.tehredact.dto.FormattingSettingsDto;
import com.app.tehredact.dto.PowerOfAttorneyRequestDto;
import com.app.tehredact.service.impl.PowerOfAttorneyDocumentService;
import org.apache.poi.xwpf.usermodel.*;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import static com.app.tehredact.util.DocumentBuilderHelper.*;

@Service
public class PowerOfAttorneyDocumentServiceImpl implements PowerOfAttorneyDocumentService {

    /**
     * Generează PROCURA (Power of Attorney) conform template-ului din imagine.
     *
     * Layout:
     *   Subsemnatul(a) [mandatarNume] [mandatarPrenume], cetățean(ă) a [mandatarCetatenie],
     *   domiciliat(ă) în [mandatarAdresaDomiciliu], identificat(ă) cu IDNP buletin
     *   [mandatarIdnp], seria [mandatarSerie], prin prezenta împuternicesc pe
     *   [imputernicitNume] [imputernicitPrenume], cetățean(ă) a [imputernicitCetatenie],
     *   domiciliat(ă) în [imputernicitAdresaDomiciliu], identificat(ă) cu IDNP buletin
     *   [imputernicitIdnp], seria [imputernicitSerie], pentru ca în numele meu și pentru mine
     *   să mă reprezinte la Poliția competentă...
     *
     *   [corpul fix al procurii]
     *
     *   Redactat și autenticat la [loculRedactariiDocumentului]...
     *
     *   Scopul mandatului:
     *   [scopMandat]
     *
     *   Prezenta procură este emisă conform voinței mele...
     *
     *   Data emiterii: [dataEmiterii]    Semnătura:
     *                                   ______________
     */
    public byte[] generate(PowerOfAttorneyRequestDto data, FormattingSettingsDto fmt) throws IOException {
        try (XWPFDocument doc = new XWPFDocument();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            configurePageA4(doc, fmt);

            // ── Paragraful 1: Identitate mandatar ────────────────────────────
            XWPFParagraph p1 = createParagraph(doc, ParagraphAlignment.BOTH, 200, 0, fmt);
            addRun(p1, "        Subsemnatul(a) ", fmt);
            addRun(p1, val(data.getMandatarNume(), 20), false, true, fmt);
            addRun(p1, " ", fmt);
            addRun(p1, val(data.getMandatarPrenume(), 20), false, true, fmt);
            addRun(p1, ", cetățean(ă) a ", fmt);

            XWPFParagraph p1b = createParagraph(doc, ParagraphAlignment.BOTH, 0, 0, fmt);
            addRun(p1b, val(data.getMandatarCetatenie(), 20), false, true, fmt);
            addRun(p1b, ", domiciliat(ă) în ", fmt);

            XWPFParagraph p1c = createParagraph(doc, ParagraphAlignment.BOTH, 0, 0, fmt);
            addRun(p1c, val(data.getMandatarAdresaDomiciliu(), 25), false, true, fmt);
            addRun(p1c, ", identificat(ă) cu IDNP buletin ", fmt);

            XWPFParagraph p1d = createParagraph(doc, ParagraphAlignment.BOTH, 0, 0, fmt);
            addRun(p1d, val(data.getMandatarIdnp(), 20), false, true, fmt);
            addRun(p1d, ", seria ", fmt);
            addRun(p1d, val(data.getMandatarSerie(), 15), false, true, fmt);
            addRun(p1d, ", prin prezenta împuternicesc pe ", fmt);

            // ── Identitate împuternicit ───────────────────────────────────────
            XWPFParagraph p2 = createParagraph(doc, ParagraphAlignment.BOTH, 0, 0, fmt);
            addRun(p2, val(data.getImputernicitNume(), 20), false, true, fmt);
            addRun(p2, " ", fmt);
            addRun(p2, val(data.getImputernicitPrenume(), 20), false, true, fmt);
            addRun(p2, ", cetățean(ă) a ", fmt);

            XWPFParagraph p2b = createParagraph(doc, ParagraphAlignment.BOTH, 0, 0, fmt);
            addRun(p2b, val(data.getImputernicitCetatenie(), 20), false, true, fmt);
            addRun(p2b, ", domiciliat(ă) în ", fmt);

            XWPFParagraph p2c = createParagraph(doc, ParagraphAlignment.BOTH, 0, 0, fmt);
            addRun(p2c, val(data.getImputernicitAdresaDomiciliu(), 25), false, true, fmt);
            addRun(p2c, ", identificat(ă) cu IDNP buletin ", fmt);

            XWPFParagraph p2d = createParagraph(doc, ParagraphAlignment.BOTH, 0, 0, fmt);
            addRun(p2d, val(data.getImputernicitIdnp(), 20), false, true, fmt);
            addRun(p2d, ", seria ", fmt);
            addRun(p2d, val(data.getImputernicitSerie(), 15), false, true, fmt);
            addRun(p2d,
                    ", pentru ca în numele meu și pentru mine să mă reprezinte la Poliția " +
                    "competentă, în vederea solicitei ofertei și ridicării cazierului meu judiciar.", fmt);

            // ── Corp fix mandat ───────────────────────────────────────────────
            XWPFParagraph pCorpA = createParagraph(doc, ParagraphAlignment.BOTH, 200, 0, fmt);
            addRun(pCorpA,
                    "        În baza prezentului mandat, mandatarul meu să mă reprezinte în fața " +
                    "Inspectoratului General al Poliției și a subdiviziunilor sale teritoriale, va face " +
                    "orice cereri necesare, va înțelege formalitățile necesare, va face declarații cerute, " +
                    "va semna de primirea cazierului, oriunde va fi necesar în legătură cu prezentul mandat, " +
                    "semnătura sa fiind-mi opozabilă.", fmt);

            XWPFParagraph pCorpB = createParagraph(doc, ParagraphAlignment.BOTH, 200, 0, fmt);
            addRun(pCorpB,
                    "        Mandatul este gratuit, netransmisibil și valabil în timp până la revocare, " +
                    "dar nu mult de 3 (trei) ani de la data autentificării, conform art. 2015 Codul Civil.", fmt);

            // ── Redactat la ────────────────────────────────────────────────────
            XWPFParagraph pRedactat = createParagraph(doc, ParagraphAlignment.BOTH, 200, 0, fmt);
            addRun(pRedactat, "        Redactat și autenticat la ", fmt);
            addRun(pRedactat, val(data.getLoculRedactariiDocumentului(), 20), false, true, fmt);
            addRun(pRedactat,
                    ", într-un exemplar original care rămâne în arhiva biroului notarial și 3 (trei) " +
                    "duplicate, din care unul va rămâne în arhiva biroului notarial și 2 (două) exemplare " +
                    "au fost eliberate părții.", fmt);

            // ── Scopul mandatului ─────────────────────────────────────────────
            XWPFParagraph pScopLabel = createParagraph(doc, ParagraphAlignment.LEFT, 300, 0, fmt);
            addRun(pScopLabel, "        Scopul mandatului:", fmt);

            XWPFParagraph pScop = createParagraph(doc, ParagraphAlignment.LEFT, 0, 200, fmt);
            addRun(pScop, "        " + val(data.getScopMandat(), 25), fmt);

            // ── Prezenta procură ──────────────────────────────────────────────
            XWPFParagraph pProcura = createParagraph(doc, ParagraphAlignment.BOTH, 200, 600, fmt);
            addRun(pProcura,
                    "        Prezenta procură este emisă conform voinței mele și produce efecte " +
                    "de la data emiterii.", fmt);

            // ── Data emiterii / Semnătura ─────────────────────────────────────
            XWPFParagraph dataPar = createParagraph(doc, ParagraphAlignment.LEFT, 0, 0, fmt);
            addTabStop(dataPar, 5500);
            addRun(dataPar, "Data emiterii:", fmt);
            XWPFRun tabRun = dataPar.createRun();
            tabRun.addTab();
            tabRun.setText("Semnătura:");

            XWPFParagraph dataValPar = createParagraph(doc, ParagraphAlignment.LEFT, 0, 800, fmt);
            addRun(dataValPar, val(data.getDataEmiterii(), 20), fmt);

            addSignatureLine(doc, fmt);

            doc.write(out);
            return out.toByteArray();
        }
    }
}