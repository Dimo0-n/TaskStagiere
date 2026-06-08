package com.app.tehredact.util;

import com.app.tehredact.dto.FormattingSettingsDto;
import org.apache.poi.xwpf.usermodel.*;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.*;

import java.math.BigInteger;

public class DocumentBuilderHelper {

    // ── Constante A4 în twips (1 twip = 1/1440 inch) ──────────────────────────
    public static final int A4_WIDTH_TWIPS  = 11906;
    public static final int A4_HEIGHT_TWIPS = 16838;

    // cm → twips: 1 cm = 567 twips
    public static final int DEFAULT_MARGIN_TOP    = 1134; // 2 cm
    public static final int DEFAULT_MARGIN_BOTTOM = 1134;
    public static final int DEFAULT_MARGIN_LEFT   = 1701; // 3 cm
    public static final int DEFAULT_MARGIN_RIGHT  = 1134; // 2 cm

    // ── Configurare pagina A4 cu marginile din FormattingSettingsDto ───────────
    public static void configurePageA4(XWPFDocument doc, FormattingSettingsDto fmt) {
        CTSectPr sectPr = doc.getDocument().getBody().isSetSectPr()
                ? doc.getDocument().getBody().getSectPr()
                : doc.getDocument().getBody().addNewSectPr();

        CTPageSz pgSz = sectPr.isSetPgSz() ? sectPr.getPgSz() : sectPr.addNewPgSz();
        pgSz.setW(BigInteger.valueOf(A4_WIDTH_TWIPS));
        pgSz.setH(BigInteger.valueOf(A4_HEIGHT_TWIPS));

        CTPageMar pgMar = sectPr.isSetPgMar() ? sectPr.getPgMar() : sectPr.addNewPgMar();
        pgMar.setTop(BigInteger.valueOf(cmToTwips(fmt != null && fmt.getMarginTop()    != null ? fmt.getMarginTop()    : 200)));
        pgMar.setBottom(BigInteger.valueOf(cmToTwips(fmt != null && fmt.getMarginBottom() != null ? fmt.getMarginBottom() : 200)));
        pgMar.setLeft(BigInteger.valueOf(cmToTwips(fmt != null && fmt.getMarginLeft()  != null ? fmt.getMarginLeft()  : 300)));
        pgMar.setRight(BigInteger.valueOf(cmToTwips(fmt != null && fmt.getMarginRight() != null ? fmt.getMarginRight() : 200)));
    }

    // ── Creare paragraf cu aliniere și spacing ────────────────────────────────
    public static XWPFParagraph createParagraph(
            XWPFDocument doc,
            ParagraphAlignment alignment,
            int spacingBefore,
            int spacingAfter,
            FormattingSettingsDto fmt) {

        XWPFParagraph par = doc.createParagraph();

        par.setAlignment(alignment);

        applySpacing(par, spacingBefore, spacingAfter, fmt);

        return par;
    }

    // ── Adăugare run cu text și stilizare ─────────────────────────────────────
    public static XWPFRun addRun(XWPFParagraph par, String text,
                                  boolean bold, boolean underline,
                                  FormattingSettingsDto fmt) {
        XWPFRun run = par.createRun();
        run.setFontFamily(fmt != null && fmt.getFontFamily() != null ? fmt.getFontFamily() : "Times New Roman");
        run.setFontSize(fmt != null && fmt.getFontSize() != null ? fmt.getFontSize() : 12);
        run.setBold(bold);
        run.setUnderline(underline ? UnderlinePatterns.SINGLE : UnderlinePatterns.NONE);
        run.setText(text != null ? text : "");
        return run;
    }

    // ── Adăugare run simplu (fără bold/underline) ─────────────────────────────
    public static XWPFRun addRun(XWPFParagraph par, String text, FormattingSettingsDto fmt) {
        return addRun(par, text, false, false, fmt);
    }

    // ── Valoare sau puncte (placeholder) ─────────────────────────────────────
    public static String val(String value, int dots) {
        return (value != null && !value.isBlank()) ? value : ".".repeat(dots);
    }

    // ── Spacing pe paragraf ───────────────────────────────────────────────────
    public static void applySpacing(XWPFParagraph par, int before, int after, FormattingSettingsDto fmt) {
        CTPPr pPr = par.getCTP().isSetPPr() ? par.getCTP().getPPr() : par.getCTP().addNewPPr();
        CTSpacing sp = pPr.isSetSpacing() ? pPr.getSpacing() : pPr.addNewSpacing();
        sp.setBefore(BigInteger.valueOf(before));
        sp.setAfter(BigInteger.valueOf(after));

        // line height din formatting (lineHeight e multiplicator, ex: 1.5 → 360 twips)
        if (fmt != null && fmt.getLineHeight() != null) {
            sp.setLine(BigInteger.valueOf((long)(fmt.getLineHeight() * 240)));
            sp.setLineRule(STLineSpacingRule.AUTO);
        } else {
            sp.setLine(BigInteger.valueOf(276)); // ~1.15 default
            sp.setLineRule(STLineSpacingRule.AUTO);
        }
    }

    // ── Tab stop pentru aliniere dreapta (semnătură) ──────────────────────────
    public static void addTabStop(XWPFParagraph par, int positionTwips) {
        CTPPr pPr = par.getCTP().isSetPPr() ? par.getCTP().getPPr() : par.getCTP().addNewPPr();
        CTTabs tabs = pPr.isSetTabs() ? pPr.getTabs() : pPr.addNewTabs();
        CTTabStop tab = tabs.addNewTab();
        tab.setVal(STTabJc.LEFT);
        tab.setPos(BigInteger.valueOf(positionTwips));
    }

    // ── Linie subliniere pentru semnătură (border-bottom pe paragraf) ─────────
    public static void addSignatureLine(XWPFDocument doc, FormattingSettingsDto fmt) {
        XWPFParagraph par = doc.createParagraph();
        par.setAlignment(ParagraphAlignment.RIGHT);
        applySpacing(par, 0, 0, fmt);

        CTPPr pPr = par.getCTP().isSetPPr() ? par.getCTP().getPPr() : par.getCTP().addNewPPr();
        CTPBdr bdr = pPr.isSetPBdr() ? pPr.getPBdr() : pPr.addNewPBdr();
        CTBorder bottom = bdr.addNewBottom();
        bottom.setVal(STBorder.SINGLE);
        bottom.setSz(BigInteger.valueOf(6));
        bottom.setColor("000000");
        bottom.setSpace(BigInteger.valueOf(1));

        XWPFRun run = par.createRun();
        run.setText("                    "); // lățime linie semnătură
    }

    // ── Conversie cm → twips (margini trimise ca mm din front) ───────────────
    private static long cmToTwips(int mm) {
        // presupunem că frontul trimite în mm; 1 mm = 56.7 twips
        return Math.round(mm * 56.7);
    }

    // ── Rezolvare aliniere text ───────────────────────────────────────────────
    private static ParagraphAlignment resolveAlignment(ParagraphAlignment defaultAlign,
                                                        FormattingSettingsDto fmt) {
        if (fmt == null || fmt.getTextAlignment() == null) return defaultAlign;
        return switch (fmt.getTextAlignment().toUpperCase()) {
            case "LEFT"    -> ParagraphAlignment.LEFT;
            case "RIGHT"   -> ParagraphAlignment.RIGHT;
            case "CENTER"  -> ParagraphAlignment.CENTER;
            case "JUSTIFY" -> ParagraphAlignment.BOTH;
            default        -> defaultAlign;
        };
    }

    public static void addLabelWithValue(
            XWPFDocument doc,
            FormattingSettingsDto fmt,
            String label,
            String value,
            int spaceBefore,
            int spaceAfter) {

        XWPFParagraph par =
                createParagraph(doc, ParagraphAlignment.LEFT, spaceBefore, spaceAfter, fmt);

        // Mută întregul bloc spre dreapta
        par.setIndentationLeft(5500);

        // Label
        XWPFRun labelRun = par.createRun();
        labelRun.setFontFamily(
                fmt != null && fmt.getFontFamily() != null
                        ? fmt.getFontFamily()
                        : "Times New Roman"
        );
        labelRun.setFontSize(
                fmt != null && fmt.getFontSize() != null
                        ? fmt.getFontSize()
                        : 12
        );
        labelRun.setBold(true);
        labelRun.setText(label);

        // Valoarea introdusă de utilizator
        XWPFRun valueRun = par.createRun();
        valueRun.setFontFamily(
                fmt != null && fmt.getFontFamily() != null
                        ? fmt.getFontFamily()
                        : "Times New Roman"
        );
        valueRun.setFontSize(
                fmt != null && fmt.getFontSize() != null
                        ? fmt.getFontSize()
                        : 12
        );

        String safeValue = value != null ? value : "";
        valueRun.setText(safeValue);

        // Completează restul liniei cu underline
        XWPFRun underlineRun = par.createRun();
        underlineRun.setFontFamily(
                fmt != null && fmt.getFontFamily() != null
                        ? fmt.getFontFamily()
                        : "Times New Roman"
        );
        underlineRun.setFontSize(
                fmt != null && fmt.getFontSize() != null
                        ? fmt.getFontSize()
                        : 12
        );
        underlineRun.setUnderline(UnderlinePatterns.SINGLE);
    }
}