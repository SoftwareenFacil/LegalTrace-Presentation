const handleCopy = async (value, setCopied) => {
  const toCopy = `${value}`;

  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(toCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        throw err; 
    }
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = toCopy;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      throw err; 
    }

    document.body.removeChild(textArea);
  }
};

export { handleCopy }; 
