import { useState } from "react";
import { Document, Page } from "react-pdf";

const Pdfview = ({ pdflink }) => {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file="http://localhost:3001/files/1709195213790VL2023240504809_DA.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => {return(
            <Page
              pageNumber={page}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          )})}
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};
export default Pdfview;
