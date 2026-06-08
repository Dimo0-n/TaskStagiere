package com.app.tehredact.service.impl;

import com.app.tehredact.dto.FormattingSettingsDto;
import com.app.tehredact.dto.StatementOfClaimRequestDto;
import com.app.tehredact.entity.FormattingSettings;
import com.app.tehredact.entity.StatementOfClaim;
import com.app.tehredact.repository.FormattingSettingRepository;
import com.app.tehredact.repository.StatementOfClaimRepository;
import com.app.tehredact.service.StatementOfClaimDocumentService;
import com.app.tehredact.util.DocumentBuilderHelper;
import org.apache.poi.xwpf.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import static com.app.tehredact.util.DocumentBuilderHelper.*;

@Service
public class StatementOfClaimDocumentServiceImpl implements StatementOfClaimDocumentService {

    @Autowired
    private StatementOfClaimRepository statementOfClaimRepository;

    @Autowired
    private FormattingSettingsServiceImpl formattingSettingsService;

    @Autowired
    private FormattingSettingRepository formattingSettingRepository;

    /**
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
    @Override
    public byte[] generate(StatementOfClaimRequestDto data, FormattingSettingsDto fmt) throws IOException {
        try (XWPFDocument doc = new XWPFDocument();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            configurePageA4(doc, fmt);

            // ── Instanța (destinatar) ─────────────────────────────────────────
            fmt.setFontSize(14);

            XWPFParagraph instPar =
                    createParagraph(doc, ParagraphAlignment.LEFT, 0, 300, fmt);

            addRun(
                    instPar,
                    DocumentBuilderHelper.val(data.getInstanta(), 100),
                    true,
                    false,
                    fmt
            );

            instPar.setIndentationLeft(5500);

            fmt.setFontSize(12);

            // ── Reclamant ─────────────────────────────────────────────────────
            XWPFParagraph reclamantPar =
                    createParagraph(doc, ParagraphAlignment.LEFT, 0, 100, fmt);

            reclamantPar.setIndentationLeft(5500);

            addRun(reclamantPar, "Reclamant: ", true, false, fmt);

            addRun(
                    reclamantPar,
                    data.getReclamant()
                            + ", " + data.getAdresaReclamant()
                            + ", tel. " + data.getTelefonReclamant()
                            + ", e-mail " + data.getEmailReclamant(),
                    false,
                    false,
                    fmt
            );

            // ── Pârât ─────────────────────────────────────────────────────────
            XWPFParagraph paratPar =
                    createParagraph(doc, ParagraphAlignment.LEFT, 0, 100, fmt);

            paratPar.setIndentationLeft(5500);

            addRun(paratPar, "Pârât: ", true, false, fmt);

            addRun(
                    paratPar,
                    data.getParat()
                            + ", " + data.getAdresaParat(),
                    false,
                    false,
                    fmt
            );

            // ── Reprezentant ──────────────────────────────────────────────────
            XWPFParagraph repPar =
                    createParagraph(doc, ParagraphAlignment.LEFT, 0, 300, fmt);

            repPar.setIndentationLeft(5500);

            addRun(
                    repPar,
                    "Reprezentantul reclamantului: ",
                    true,
                    false,
                    fmt
            );

            addRun(
                    repPar,
                    data.getReprezentant(),
                    false,
                    false,
                    fmt
            );

            // ── Titlu principal ───────────────────────────────────────────────
            fmt.setFontSize(14);
            XWPFParagraph titluPar = createParagraph(doc, ParagraphAlignment.CENTER, 400, 0, fmt);
            addRun(titluPar, "CERERE DE CHEMARE ÎN JUDECATĂ", true, false, fmt);
            fmt.setFontSize(12);

            // ── Obiectul cererii ──────────────────────────────────────────────
            XWPFParagraph obiectPar =
                    createParagraph(doc, ParagraphAlignment.CENTER, 0, 200, fmt);

            addRun(
                    obiectPar,
                    data.getObiectCerere(),
                    false,
                    false,
                    fmt
            );

            // ── Circumstanțele de fapt ────────────────────────────────────────
            XWPFParagraph cfPar =
                    createParagraph(doc, ParagraphAlignment.BOTH, 200, 300, fmt);

            addRun(
                    cfPar,
                    "Circumstanțele de fapt: ",
                    true,
                    false,
                    fmt
            );

            addRun(
                    cfPar,
                    val(
                            data.getCircumstanteDeFapt(),
                            "Circumstanțele de fapt urmează a fi completate de reclamant."
                    ),
                    false,
                    false,
                    fmt
            );

            // ── În drept ──────────────────────────────────────────────────────
            XWPFParagraph dreptPar =
                    createParagraph(doc, ParagraphAlignment.CENTER, 200, 300, fmt);

            addRun(dreptPar, "În drept ", true, false, fmt);

            addRun(
                    dreptPar,
                    "îmi întemeiez cererea pe dispoziţiile art. 66, 186 alin. (1) lit.b), "
                            + "131 alin. (1), 142 alin (2), 151, 355 alin(1) din Codul Muncii, "
                            + "art.166, 167 CPC RM.",
                    false,
                    false,
                    fmt
            );

            // ── Solicitări ────────────────────────────────────────────────────
            XWPFParagraph solicitIntro =
                    createParagraph(doc, ParagraphAlignment.LEFT, 200, 100, fmt);
            addRun(
                    solicitIntro,
                    "Astfel, reieșind din cele expuse mai sus, prin prezenta solicit:",
                    false,
                    false,
                    fmt
            );

            addNumberedList(
                    doc,
                    data.getSolicitari(),
                    "Solicitările reclamantului urmează a fi completate.",
                    fmt
            );

            // ── Anexe ─────────────────────────────────────────────────────────
            XWPFParagraph anexeLabel =
                    createParagraph(doc, ParagraphAlignment.LEFT, 200, 100, fmt);
            addRun(
                    anexeLabel,
                    "Anexe:",
                    true,
                    false,
                    fmt
            );

            addNumberedList(
                    doc,
                    data.getAnexe(),
                    "Nu sunt indicate anexe.",
                    fmt
            );

            // ── Semnătura finală ──────────────────────────────────────────────
            XWPFParagraph signPar =
                    createParagraph(doc, ParagraphAlignment.LEFT, 600, 0, fmt);

            addTabStop(signPar, 7000);

            addRun(
                    signPar,
                    "Reprezentantul reclamantului",
                    false,
                    false,
                    fmt
            );

            XWPFRun signTab = signPar.createRun();
            signTab.addTab();

            signTab.setText(
                    val(data.getReprezentant(), "________________")
            );

            XWPFParagraph dataPar =
                    createParagraph(doc, ParagraphAlignment.LEFT, 200, 0, fmt);

            addRun(
                    dataPar,
                    val(data.getData(), ""),
                    false,
                    false,
                    fmt
            );

            StatementOfClaim statementOfClaim = new StatementOfClaim();
            statementOfClaim.setInstanta(data.getInstanta());
            statementOfClaim.setReclamant(data.getReclamant());
            statementOfClaim.setAdresaReclamant(data.getAdresaReclamant());
            statementOfClaim.setTelefonReclamant(data.getTelefonReclamant());
            statementOfClaim.setEmailReclamant(data.getEmailReclamant());
            statementOfClaim.setParat(data.getParat());
            statementOfClaim.setAdresaParat(data.getAdresaParat());
            statementOfClaim.setReprezentant(data.getReprezentant());
            statementOfClaim.setObiectCerere(data.getObiectCerere());
            statementOfClaim.setCircumstanteDeFapt(data.getCircumstanteDeFapt());
            statementOfClaim.setTemeiJuridic(data.getTemeiJuridic());
            statementOfClaim.setSolicitari(data.getSolicitari());
            statementOfClaim.setAnexe(data.getAnexe());
            statementOfClaim.setData(data.getData());

            FormattingSettings formattingSettings =
                    formattingSettingsService.convertFormattingSettingsDtoToEntity(fmt);

            statementOfClaim.setFormattingSettings(formattingSettings);

            formattingSettingRepository.save(formattingSettings);

            doc.write(out);

            byte[] docxBytes = out.toByteArray();
            statementOfClaim.setDocumentBytes(docxBytes);
            statementOfClaimRepository.save(statementOfClaim);

            return out.toByteArray();
        }
    }

    private String val(String value, String fallback) {
        return (value != null && !value.isBlank()) ? value : fallback;
    }
}