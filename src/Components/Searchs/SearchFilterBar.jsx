
import DatePickerFilter from './DatePickerFilter';
import SearchVigency from './SearchVigency';
import SearchBar from './SearchUsers';

function SearchFilterBar ({onVigencyChange, setParams}) {
  return (
    <SearchVigency onVigencyChange={onVigencyChange} setParams={setParams}/>
  );
};

export default SearchFilterBar;
