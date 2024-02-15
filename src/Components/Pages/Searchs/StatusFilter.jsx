const StatusFilter = ({ filterStatus, handleStatusChange }) => {
  return (
    <select
      value={filterStatus}
      onChange={handleStatusChange}
      className="form-select"
    >
      <option value="">Todos los Estados</option>
      <option value="Activo">Activo</option>
      <option value="noactivo">No Activo</option>
    </select>
  );
};

export default StatusFilter;
