import whatsappImage from 
"../../Assets/ChatOnWhatsAppButton/WhatsAppButtonGreenLarge.svg";

const WhatsAppButton = ({ phoneNumber, text }) => {
  return (
    <button aria-label="Chat on WhatsApp" 
      onClick={() => window.location.href=`https://wa.me/${phoneNumber}?text=${text}`}>
      <img alt="Chat on WhatsApp" src={whatsappImage} />
    </button>
  );
}

export default WhatsAppButton;

