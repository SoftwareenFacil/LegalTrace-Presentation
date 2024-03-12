
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
                          getEntity,
                          placeholderText,
                          setData,
                          refresh,
}) => {

  return (
    <>
      <Row>
        <Col>
          <DatePickerFilter setData={setData}
                            getEntity={getEntity}
                            refresh={refresh}/>
        </Col>
        <Col>
          <SearchBar  getEntity={getEntity}
                      placeholderText={placeholderText}
                      setParams={setParams}/>
        </Col>
        <Col>
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
