"use client";

import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useWindowSize } from "~/hooks/useWindowSize";
import PDFPagesController from "../pdf-pages-controller/PDFPagesController";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();

export default function PDFView({ pdf }: { pdf: string }) {
  const [pages, setPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const { width = 0 } = useWindowSize();

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setPages(numPages);
  };

  const nextPage = (): void => setPage(page + 1);
  const previousPage = (): void => setPage(page - 1);

  const calculatedWidth = () => {
    if (width < 640) return width - 32;
    else if (width < 760) return width - 96;
    return undefined;
  };

  return (
    <div className="flex flex-col gap-4">
      <Document
        file={pdf}
        className={"relative mx-auto w-min"}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={page} width={calculatedWidth()} />
      </Document>
      {pages > 1 && (
        <PDFPagesController
          page={page}
          numPages={pages}
          next={nextPage}
          previous={previousPage}
        />
      )}
    </div>
  );
}
