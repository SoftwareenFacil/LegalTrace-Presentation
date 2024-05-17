
// External imports
import { parseISO } from 'date-fns';

// Internal imports
import { delay } from './delay.js';

//
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

// The backend returns the entities with a created value higher than the one
// given. In other words, created after.
// To get the ones created before the date.
// A - B in set notation.
// Where A is the users created from the epoch
// and B is the ones created after the given date.
// the mid point is the date given. epoch - given date - today
const filterByDate = async (date, getEntity, setEntity, setLoading, 
  setError, setEmpty) => {
  try {
    setLoading(true); // Start loading
    const minLoadingTime = delay(300);
    await minLoadingTime;

    const unixEpochDate = new Date(0);
    const epoch = unixEpochDate.toISOString();
    const mid = date.toISOString();

    const A = await getEntity({created: epoch});
    const B = await getEntity({created: mid});

    let filteredData;

    if (B === null || B.length === 0) {
      filteredData = A;
    } else {
      filteredData = A.filter(aObj => !B.some(bObj => bObj.id === aObj.id));
      console.log('filtered', filteredData);
    }

    if (filteredData === null || filteredData.length === 0) {
      setEmpty(true);
      setError(false);
    } else {
      setEntity(filteredData);
      setEmpty(false);
      setError(false);
    }
  } catch (error) {
    setError(true);
    setEmpty(false);
  } finally {
    setLoading(false);
  }
};

const filterByVigency = (selectedVigency, setParams, category) => {
  if (selectedVigency !== 'all') {
    const value = (selectedVigency === "true")? true : false;
    if (category === 'tasks')
    {
      setParams({finished: value});
    }
    else {
      setParams({vigency: value});
    }
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
export { filterByVigency, filterByDate };
