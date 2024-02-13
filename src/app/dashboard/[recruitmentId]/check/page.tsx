"use client";

import React from "react";
import { Document, Page } from "react-pdf";
import Button from "~/ui/button/Button";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useWindowSize } from "~/hooks/useWindowSize";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();

export default function CheckPage() {
  const { width = 0 } = useWindowSize();

  const calculatedWidth = () => {
    if (width < 640) return width - 32;
    else if (width < 760) return width - 96;
    else if (width < 980) 684;
  };

  return (
    <section className="flex w-full gap-8 p-4 lg:p-8">
      <div className="flex flex-col gap-4">
        <Document file={"/test-cv.pdf"}>
          <Page pageNumber={1} width={calculatedWidth()} />
        </Document>
        <div className="flex justify-center gap-10">
          <Button variant="error">No</Button>
          <Button variant="outline">Yes</Button>
          <Button variant="default">Strong yes</Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl text-black-900">Homer Simpson</h2>
        <p className="text-base text-black-600">
          Software engineer with a lot of experience that are passionate about
          cats
        </p>
        <Button variant="outline">Skip this resume</Button>
      </div>
    </section>
  );
}
