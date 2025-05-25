// Usage examples:
// 1. Public file: <PDFViewer pdfSource="/sample.pdf" />
// 2. External URL: <PDFViewer pdfSource="https://example.com/doc.pdf" />
// 3. Blob: <PDFViewer pdfSource={pdfBlob} />

import React, { useState, useEffect } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { fetchPDFAsBlob } from "@/pages/ListSatuankerja/satkerHooks";
import { toast } from "react-toastify";

const CustomPDFViewer = ({ pdfSource }) => {
  const [processedUrl, setProcessedUrl] = useState("");
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const processUrl = (url) => {
      // Handle Google Drive URLs
      if (url.includes("drive.google.com")) {
        const fileId = url.match(/\/file\/d\/([^\/]+)/)?.[1];
        if (fileId) {
          return `https://drive.google.com/uc?export=download&id=${fileId}`;
        }
      }
      return url;
    };

    if (typeof pdfSource === "string") {
      setProcessedUrl(processUrl(pdfSource));
    } else if (pdfSource instanceof Blob) {
      const url = URL.createObjectURL(pdfSource);
      setProcessedUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [pdfSource]);

  useEffect(() => {
    const loadPDF = async () => {
      try {
        const blob = await fetchPDFAsBlob(pdfSource);
        const url = URL.createObjectURL(blob);
        console.log("urls", url);
      } catch (err) {
        toast.error("Gagal memuat dokumen PDF");
      }
    };

    if (typeof pdfSource === "string" && pdfSource.includes("rokeubmn-pa.id")) {
      loadPDF();
    }
  }, [pdfSource]);

  if (!processedUrl) return <div>Loading PDF...</div>;

  return (
    <div style={{ height: "80vh" }}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          fileUrl={processedUrl}
          plugins={[defaultLayoutPluginInstance]}
        />
      </Worker>
    </div>
  );
};

export default CustomPDFViewer;
