
const messageGenerator = (entity) => {

  let message = 'Hola, ' + entity.name + ' queremos contactarte';
  return message;
};

export { messageGenerator };
