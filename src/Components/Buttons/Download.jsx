import React, { useState } from "react";
import { Button } from "react-bootstrap";
import paymentService from "../../Service/paymentService";

function Download({ fileLink }) {
  const [downloading, setDownloading] = useState(false);

  const handleButtonClick = async () => {
    try {
      if (fileLink) {
        setDownloading(true); 

        const { url, fileName } = await paymentService.fechFile(fileLink);

        const aTag = document.createElement("a");
        aTag.href = url;
        aTag.setAttribute("download", fileName || "archivo_pago.pdf");
        document.body.appendChild(aTag);
        aTag.click();
        document.body.removeChild(aTag);

        window.URL.revokeObjectURL(url);

        setDownloading(false); 
      } else {
        console.error("No se encontró el fileLink necesario para la descarga.");
      }
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
      setDownloading(false); 
    }
  };

  return (
    <div>
      <Button
        variant="primary"
        size="sm"
        className="w-100 ver-button"
        onClick={handleButtonClick}
        disabled={!fileLink || downloading} 
      >
         Descargar
      </Button>
    </div>
  );
}

export default Download;
