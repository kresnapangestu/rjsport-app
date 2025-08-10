import Button from "@/components/Button";
import React from "react";
import PDFContent from "./pdfContent";
export const ContentPreview = ({ invoiceRef, onDownload, filename }) => {
  return (
    <div className="flex flex-col gap-5 h-full">
      <div className="flex justify-between">
        <span className="text-xl">
          <b>Pratinjau Invoice</b>
        </span>
        <Button onClick={() => onDownload(invoiceRef, filename)}>
          Download
        </Button>
      </div>
      <PDFContent ref={invoiceRef} />
    </div>
  );
};
