import React, { useContext, useRef } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { FormLKP } from "./FormLKP";
import { ContentPreview } from "./ContentPreview";
import { InvoiceContext } from "@/contexts/InvoiceContext";
import useDownloadPDF from "./useDownloadPDF";
import moment from "moment";

function LKPMakerPage() {
  const { toggle, invoiceData } = useContext(InvoiceContext);
  const fileName = `INVOICE RJSPORT - ${invoiceData?.client}_${moment(
    invoiceData.date
  ).format("DD-MM-YYYY")}`;
  const { downloadPDFByRef } = useDownloadPDF(fileName);
  const invoiceRef = useRef();

  return (
    <div style={{ padding: "10px 1rem" }}>
      <Breadcrumbs
        items={[{ name: "Invoice Maker", path: "/invoice-maker" }]}
      />
      <div
        className={`grid ${
          toggle ? "grid-cols-[45%_55%]" : "grid-cols-[100%_0%]"
        }  gap-4`}
      >
        <div className="border border-gray-300 rounded-lg p-4">
          <FormLKP onDownload={downloadPDFByRef} />
        </div>
        {toggle && (
          <div className="border border-gray-300 rounded-lg p-4">
            <ContentPreview
              invoiceRef={invoiceRef}
              onDownload={downloadPDFByRef}
              filename={fileName}
            />
          </div>
        )}
      </div>

      <style>
        {`
          .card {
            width: calc(95vw / 5);
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            border-radius: 6px;
            overflow: hidden;
          }

          .card:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
            font-weight: 600;
          }

          .card-number {
            height: 100px;
            background: #4CD4B0;
            color: #2bb490;
            font-weight: 900;
            font-size: 100px;
            display: flex;
            align-items: center;
          }

          .card-title {
            background: white;
            padding: 20px;
          }
          .card-disabled {
            opacity: 0.5;
            pointer-events: none;
            cursor: not-allowed;
            filter: grayscale(0.4);
          }
          
          .card-disabled:hover {
            transform: none;
            box-shadow: none;
            font-weight: normal;
          }
          
        `}
      </style>
    </div>
  );
}

export default LKPMakerPage;
