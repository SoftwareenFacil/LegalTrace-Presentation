
// Internal imports
import DropdownVigency from './DropdownVigency';

const MultiDropdown = ({onVigencyChange, setParams, category}) => {
  return (
    <DropdownVigency 
      onVigencyChange={onVigencyChange}
      setParams={setParams}
      category={category}
    />
  );
};

export default MultiDropdown;
