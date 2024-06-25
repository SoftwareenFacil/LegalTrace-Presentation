import { Button } from "react-bootstrap";
import paymentService from "../../Service/paymentService";

function Download({ fileLink }) {

 

  const handleButtonClick = async () => {
    try {
      if (fileLink) {
        const {url, fileName } = await paymentService.fechFile(fileLink)

        const aTag = document.createElement("a");
        aTag.href = url;
        aTag.setAttribute("download", fileName || "archivo_pago.pdf");
        document.body.appendChild(aTag);
        aTag.click();
        document.body.removeChild(aTag);

        window.URL.revokeObjectURL(url);
      } else {
        console.error("No se encontró el fileLink necesario para la descarga.");
      }
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
    }
  };

  return (
    <div>
  
      <Button
        variant="primary"
        size="sm"
        className="w-100 ver-button"
        onClick={handleButtonClick}
        disabled={!fileLink}
      >
        Descargar
      </Button>
    </div>
  );
}

export default Download;
