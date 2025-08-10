// useDownloadPDF.js
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const useDownloadPDF = ({ name }) => {
  const downloadPDFByRef = async (ref, filename = `${name}.pdf`) => {
    const element = ref?.current;
    if (!element) {
      console.error("Ref is not attached to any element.");
      return;
    }

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "legal");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
  };

  return { downloadPDFByRef };
};

export default useDownloadPDF;
