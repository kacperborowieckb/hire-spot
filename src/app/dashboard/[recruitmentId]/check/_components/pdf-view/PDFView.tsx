"use client";

import React from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useWindowSize } from "~/hooks/useWindowSize";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();

export default function PDFView({ pdf }: { pdf: string }) {
  const { width = 0 } = useWindowSize();
  const calculatedWidth = () => {
    if (width < 640) return width - 32;
    else if (width < 760) return width - 96;
    return undefined;
  };

  return (
    <Document file={pdf} className={"mx-auto w-min"}>
      <Page pageNumber={1} width={calculatedWidth()} />
    </Document>
  );
}
