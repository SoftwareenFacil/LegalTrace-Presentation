
// External imports
import { Row, Col } from 'react-bootstrap';
// Internal imports
import DropdownVigency from './DropdownVigency';
import SearchBar from '../Searchs/SearchBar';
import DatePickerFilter from '../Searchs/DatePickerFilter';
import { getClient, getUsers } from '../../Utils/getEntity.js';

const MultiDropdown = ({  onVigencyChange, 
                          setParams,
                          category,
                          placeholderText,
                          setData,
                          getEntity,
                          setEmpty,
                          setError,
                          setLoading,
}) => {

  return (
    <>
      <Row className="align-items-center">
        <Col xs={12} sm={6}>
          <SearchBar
            getEntity={getEntity}
            placeholderText={placeholderText}
            setParams={setParams}
          />
        </Col>
        <Col xs={12} sm={6} className="d-flex justify-content-end">
          <div className="me-2">
            {category !== 'credentials' ? (
              <DatePickerFilter
                getEntity={getEntity}
                setData={setData}
                setEmpty={setEmpty}
                setError={setError}
                setLoading={setLoading}
              />
            ) : null}
          </div>
          <DropdownVigency
            onVigencyChange={onVigencyChange}
            setParams={setParams}
            category={category}
          />
        </Col>
      </Row>
    </>
  );
};

export default MultiDropdown;
