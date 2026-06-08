export const generateInvoicePDF = async ({
  club,
  activeBlock,
  form,
  currentRef,
  remainingSessionsCount,
}) => {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const teal = [34, 158, 189];
  const dark = [17, 17, 17];
  const grey = [100, 100, 100];
  const lightGrey = [240, 240, 240];
  const w = 210;
  const pad = 20;
  let y = 20;

  // ── Header bar ──
  doc.setFillColor(...teal);
  doc.rect(0, 0, w, 14, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("WIMBLEDON LEARNING CENTRE", pad, 9);
  doc.setFont("helvetica", "normal");
  doc.text("INVOICE", w - pad, 9, { align: "right" });

  y = 28;

  // ── Invoice meta ──
  doc.setTextColor(...dark);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Invoice", pad, y);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grey);
  doc.text(`Date: ${new Date().toLocaleDateString("en-GB")}`, w - pad, y - 4, { align: "right" });
  doc.text(`Ref: ${currentRef}`, w - pad, y + 2, { align: "right" });

  y += 10;
  doc.setDrawColor(...teal);
  doc.setLineWidth(0.5);
  doc.line(pad, y, w - pad, y);
  y += 8;

  // ── Section helper ──
  const sectionTitle = (title) => {
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...teal);
    doc.text(title.toUpperCase(), pad, y);
    y += 5;
    doc.setDrawColor(...lightGrey);
    doc.setLineWidth(0.3);
    doc.line(pad, y, w - pad, y);
    y += 4;
  };

  const row = (label, value) => {
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...grey);
    doc.text(label, pad, y);
    doc.setTextColor(...dark);
    doc.setFont("helvetica", "bold");
    doc.text(String(value), pad + 50, y);
    y += 6;
  };

  // ── Club Details ──
  sectionTitle("Club Details");
  row("Club", club.name);
  row("Day", club.schedules?.[0]?.day_of_week || "Monday");
  row("Sessions", `${remainingSessionsCount} sessions`);

  let datesStr = `From ${new Date(activeBlock.block_start_date).toLocaleDateString("en-GB")} to ${new Date(activeBlock.block_end_date).toLocaleDateString("en-GB")}`;
  if (activeBlock.session_dates && activeBlock.session_dates.length > 0) {
    const datesToInvoice = activeBlock.session_dates.slice(-remainingSessionsCount);
    datesStr = datesToInvoice
      .map((d) => new Date(d.session_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }))
      .join(", ");
  }

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grey);
  doc.text("Dates", pad, y);
  doc.setTextColor(...dark);
  doc.setFont("helvetica", "bold");
  const wrapped = doc.splitTextToSize(datesStr, w - pad - pad - 50);
  doc.text(wrapped, pad + 50, y);
  y += wrapped.length * 5 + 3;

  y += 4;

  // ── Registration Details ──
  sectionTitle("Registration Details");
  row("Parent / Guardian", form.parentName);
  row("Child's Name", form.childName);
  row("Year Group", form.yearGroup);
  row("Email", form.parentEmail);
  row("Phone", form.parentPhone);
  if (form.comments) row("Comments", form.comments);

  y += 4;

  // ── Payment ──
  sectionTitle("Payment");
  row("Sessions", `${remainingSessionsCount} sessions included`);

  // Total row with background
  y += 2;
  doc.setFillColor(...teal);
  doc.roundedRect(pad, y - 4, w - pad * 2, 12, 2, 2, "F");
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("Total Due", pad + 4, y + 4);
  doc.text(`£${((club.price_per_block ? parseFloat(club.price_per_block) : 11.00) * remainingSessionsCount).toFixed(2)}`, w - pad - 4, y + 4, { align: "right" });
  y += 18;

  // ── Bank Transfer ──
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...teal);
  doc.text("Bank Transfer Instructions:", pad, y);
  y += 5;

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...dark);

  const accountName = process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME || "Wimbledon Learning Centre";
  const sortCode = process.env.NEXT_PUBLIC_BANK_SORT_CODE || "XX-XX-XX";
  const accountNo = process.env.NEXT_PUBLIC_BANK_ACCOUNT_NO || "XXXXXXXX";

  // Line 1: Account Name
  doc.text(`Account Name: ${accountName}`, pad, y);
  y += 5;

  // Line 2: Sort Code
  doc.text(`Sort Code: ${sortCode}`, pad, y);
  y += 5;

  // Line 3: Account Number
  doc.text(`Account No: ${accountNo}`, pad, y);
  y += 5.5; // Slightly larger gap before the reference number

  doc.setFont("helvetica", "bold");
  doc.setTextColor(...dark);
  doc.text(`Payment Reference: ${currentRef}`, pad, y);
  y += 4.5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(220, 38, 38);
  doc.text("(CRITICAL: You MUST include this exact Reference number as the payment reference when making your transfer.)", pad, y);

  // ── Footer ──
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grey);
  doc.text(
    "Wimbledon Learning Centre  ·  contact@wimbledonlearningcentre.co.uk  ·  wimbledonlearningcentre.co.uk",
    w / 2, 287,
    { align: "center" }
  );
  doc.setDrawColor(...lightGrey);
  doc.line(pad, 283, w - pad, 283);

  doc.save(`WLC-Invoice-${currentRef}.pdf`);
};
