function MultiButton () {
  return (
    <div className="edit-button mt-0">
      <Button
        variant="outline-primary"
        size="sm"
        className="custom-edit-button"
        onClick={() =>
        }
        data-bs-toggle="modal"
        data-bs-target="#modalUser"
      >
        Editar

      </Button>
      <div className="btn-container d-grid ">
        <Button
          variant="primary"
          size="sm"
          className="w-100 ver-button"
          onClick={() => redirectToUserDetails(user)}
        >
          <FontAwesomeIcon
            icon={faEye}
            className="icon-spacing"
          />{" "}
          Ver
        </Button>
        <Button
          variant="danger"
          size="sm"
          className="w-100 custom-disable-button"
          onClick={() => deleteUser(user.id, user.name)}
        >
          Deshabilitar
        </Button>
      </div>
    </div>
  );
};

export default MultiButton;
