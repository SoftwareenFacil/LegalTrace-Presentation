
// External imports

// Internal imports
/*
import SearchBar from "../Components/Searchs/SearchUsers";
import DatePickerFilter from "../Components/Searchs/DatePickerFilter";
import StatusFilter from "../Components/Searchs/StatusFilter";
import "react-datepicker/dist/react-datepicker.css";
*/

/*
const [selectedDate, setSelectedDate] = useState(null);
const [filteredUsers, setFilteredUsers] = useState([]);
const [filterStatus, setFilterStatus] = useState("");

const filterByDate = (data, selectedDate) => {
    filtered = data.filter((entity) => {
      if (entity.date) {
        const entityDate = new Date(entity.date);
        return (
          entityDate.getDate() === selectedDate.getDate() &&
          entityDate.getMonth() === selectedDate.getMonth() &&
          entityDate.getFullYear() === selectedDate.getFullYear()
        );
      }
      return false;
    });
};
*/



const filterByVigency = (selectedVigency, setParams) => {
  if (selectedVigency !== 'all') {
    const value = (selectedVigency === "true")? true : false;
    setParams({vigency: value});
  }
  else {
    setParams({id: 0});
  }
};

/*
  const formatUserDate = (date) => {
    return date ? format(new Date(date)) : Mensajes.NoInformado;
  };

*/

/*
  const isFilteredUsersEmpty = filteredUsers.length === 0;


  const handleSearch = (searchText) => {
    if (!users || users.length === 0) {
      return;
    }

    const lowercasedFilter = searchText.toLowerCase();
    const filteredData = users.filter((item) => {
      return Object.keys(item).some((key) =>
        String(item[key]).toLowerCase().includes(lowercasedFilter)
      );
    });

    setFilteredUsers(filteredData);
  };

*/
export { filterByVigency };
