package com.app.tehredact.service;

import com.app.tehredact.dto.ComplaintRequestDto;
import com.app.tehredact.dto.FormattingSettingsDto;
import com.app.tehredact.service.impl.ComplainDocumentService;
import org.apache.poi.wp.usermodel.HeaderFooterType;
import org.apache.poi.xwpf.usermodel.*;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTPageMar;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTSectPr;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigInteger;

import static com.app.tehredact.util.DocumentBuilderHelper.*;

@Service
public class ComplaintDocumentServiceImpl implements ComplainDocumentService {

    /**
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
            XWPFParagraph organPar =
                    createParagraph(doc, ParagraphAlignment.LEFT, 0, 300, fmt);
            addRun(organPar,
                    val(data.getOrganDestinatar(), 50), true, false, fmt);
            organPar.setIndentationLeft(5500);

            // ── Date cetățean ────────────────────────────────────────────────

            addLabelWithValue(doc, fmt, "de la cet. ", data.getNumePetent(), 200, 0);
            addLabelWithValue(doc, fmt, "a.n. ", data.getDataNasterii(), 0, 0);
            addLabelWithValue(doc, fmt, "dom. ", data.getAdresa(), 0, 0);
            addLabelWithValue(doc, fmt, "Ocupația ", data.getOcupatie(), 0, 0);
            addLabelWithValue(doc, fmt, "tel. ", data.getTelefon(), 0, 200);

            // ── 3. ARTICOLUL 311 ─────────────────────────────────────────────
            XWPFParagraph art311Title = createParagraph(doc, ParagraphAlignment.LEFT, 100, 0, fmt);
            addRun(art311Title, "Articolul 311. Denunțarea falsă sau plîngerea falsă", true, false, fmt);

            addJustifiedText(doc, fmt,
                    "        (1) Denunțarea cu bună știință falsă  în scopul de a-l învinui pe cineva de " +
                            "săvîrșirea unei infracțiuni, sau plîngerea cu bună știință falsă despre săvîrșirea " +
                            "unei infracțiuni, făcută unui organ sau unei persoane cu funcție de răspundere, care " +
                            "sînt în drept de a porni urmărirea penală,");
            addJustifiedText(doc, fmt,
                    "        se pedepsește cu amendă în mărime de pînă la 650 unități convenționale sau cu " +
                            "muncă neremunerată în folosul comunității de la 180 la 240 de ore, sau cu închisoare " +
                            "de pînă la 2 ani.");
            addJustifiedText(doc, fmt, "          (2) Aceeași acțiune:");
            addJustifiedText(doc, fmt,
                    "        a) legată de învinuirea de săvîrșire a unei infracțiuni grave, deosebi de " +
                            "grave sau excepțional de grave;");
            addJustifiedText(doc, fmt, "          b) săvîrșită din interes material;");
            addJustifiedText(doc, fmt, "          c) însoțită de crearea artificială a probelor acuzatoare");
            addJustifiedText(doc, fmt,
                    "        se pedepsește cu amendă în mărime de la 550 la 1150 unități convenționale " +
                            "sau cu închisoare de pînă la 5 ani.");

            // -- Avertizare------------------------------------
            fmt.setFontSize(14);
            XWPFParagraph avertizare = createParagraph(doc, ParagraphAlignment.BOTH, 0, 0, fmt);
            addRun(avertizare, "        Cu răspunderea ce o port în conformitate cu art. 311 al Codului Penal RM cu\n" +
                    "privire la denunțarea falsă am fost avertizat:", true, false, fmt);

            fmt.setFontSize(12);
            // ── Data / Semnătura ──────────────────────────────────────────────
            XWPFParagraph dataPar = createParagraph(doc, ParagraphAlignment.LEFT, 100, 0, fmt);
            addTabStop(dataPar, 5500);
            XWPFParagraph oraPar = createParagraph(doc, ParagraphAlignment.LEFT, 0, 0, fmt);
            addTabStop(oraPar, 5500);
            addRun(oraPar, "Ora: " + val(data.getOra(), 20), fmt);
            addRun(dataPar, "Data: " + val(data.getData(), 20), fmt);
            XWPFRun tabRun = dataPar.createRun();
            tabRun.addTab();
            tabRun.setText("Semnătura:");

            // ── Titlu PLÂNGERE ────────────────────────────────────────────────
            XWPFParagraph titluPar = createParagraph(doc, ParagraphAlignment.CENTER, 200, 200, fmt);
            addRun(titluPar, "PLÂNGERE", true, false, fmt);

            // ── Conținut plângere ─────────────────────────────────────────────
            XWPFParagraph continutPar = createParagraph(doc, ParagraphAlignment.LEFT, 100, 0, fmt);
            addRun(continutPar, "        " + val(data.getContinutPlangere(), 25), fmt);

            // ── Confirmare primire plângere ─────────────────────────────────

            XWPFFooter footer = doc.createFooter(HeaderFooterType.DEFAULT);

            XWPFParagraph receivedTitle = footer.createParagraph();

            addRun(
                    receivedTitle,
                    "Plângerea a primit:",
                    true,
                    false,
                    fmt
            );

            XWPFParagraph officerPar = footer.createParagraph();

            addRun(
                    officerPar,
                    "Ofițerul de urmărire penală al Secției de Urmărire Penală "
                            + "a IP Centru al Direcției de Poliție mun. Chișinău",
                    true,
                    false,
                    fmt
            );

            XWPFParagraph signLine = footer.createParagraph();
            signLine.setAlignment(ParagraphAlignment.RIGHT);

            addRun(
                    signLine,
                    "______________________________",
                    false,
                    false,
                    fmt
            );

            CTSectPr sectPr = doc.getDocument().getBody().addNewSectPr();

            CTPageMar pageMar = sectPr.addNewPgMar();
            pageMar.setFooter(BigInteger.valueOf(1200));

            doc.write(out);
            return out.toByteArray();
        }
    }

    /**
     * Paragraf text justificat.
     */
    private void addJustifiedText(XWPFDocument doc, FormattingSettingsDto fmt, String text) {
        XWPFParagraph par = createParagraph(doc, ParagraphAlignment.BOTH, 0, 0, fmt);
        addRun(par, text, false, false, fmt);
    }

}