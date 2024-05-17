
// External imports
import { Row, Col } from 'react-bootstrap';
// Internal imports
import DropdownVigency from './DropdownVigency';
import SearchBar from '../Searchs/SearchBar';
import DatePickerCustom from '../Searchs/DatePickerCustom';
import { getClient, getUsers } from '../../Utils/getEntity.js';

const MultiDropdown = ({  onVigencyChange, 
                          setParams,
                          category,
                          placeholderText,
                          setData,
                          getEntity,
                          params,
                          setEmpty,
                          setError,
                          setLoading,
}) => {

  const handleDateChange = () => { 

  };
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
              <DatePickerCustom
                onDateChange={handleDateChange}
              />
            ) : null}
          </div>
          <DropdownVigency
            onVigencyChange={onVigencyChange}
            setParams={setParams}
            category={category}
            forcedValue={params}
          />
        </Col>
      </Row>
    </>
  );
};

export default MultiDropdown;
