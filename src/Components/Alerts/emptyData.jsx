// emptyData.jsx

// External imports
import { Alert } from "react-bootstrap";
// Internal imports
import { Mensajes} from "../../Constants/Constant";

const emptyData = (empty) => {
    if (empty) {
     return   <Alert variant="info" className="mt-3">
                {Mensajes.EmptyData}
              </Alert>
    }
};

export {emptyData};
