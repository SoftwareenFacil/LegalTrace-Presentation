import { Mensajes, Route } from "../../Constants/Constant";
import { Alert } from "react-bootstrap";

const emptyData = (empty) => {
    if (empty) {
     return   <Alert variant="info" className="mt-3">
                {Mensajes.EmptyData}
              </Alert>
    }
};

export {emptyData};
