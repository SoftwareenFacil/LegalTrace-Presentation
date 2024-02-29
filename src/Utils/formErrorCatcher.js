// formErrorCatcher.jsx

async function formErrorCatcher(operationPromise) {
  try {
    const response = await operationPromise;
    return { success: true, data: response };
  } catch (error) {
    let errorMessage = error?.response?.data?.message || error.message;
    let errorType = 'general';

    if (error?.response?.status === 400) {
      const emailExistsPattern = /Client with Email .* already exists/;
      if (emailExistsPattern.test(errorMessage)) {
        errorType = 'errorEmail';
      }
    }

    return { success: false, error: error, errorType: errorType };
  }
}


export { formErrorCatcher }
