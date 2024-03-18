
import SearchBar from "../Searchs/SearchUsers";
import DatePickerFilter from "../Searchs/DatePickerFilter";
import StatusFilter from "../Searchs/StatusFilter";
import "react-datepicker/dist/react-datepicker.css";

  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    let filtered = users;

    if (selectedDate) {
      filtered = filtered.filter((user) => {
        if (user.date) {
          const userDate = new Date(user.date);
          return (
            userDate.getDate() === selectedDate.getDate() &&
            userDate.getMonth() === selectedDate.getMonth() &&
            userDate.getFullYear() === selectedDate.getFullYear()
          );
        }
        return false;
      });
    }

    if (filterStatus) {
      filtered = filtered.filter(
        (user) => user.status && user.status.replace(/\s/g, "") === filterStatus
      );
    }

    setFilteredUsers(filtered);
  }, [selectedDate, filterStatus, users]);


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const formatUserDate = (date) => {
    return date ? format(new Date(date)) : Mensajes.NoInformado;
  };


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

      <div className="row filter-container">
        <div className="search-bar">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="status-filter">
          <StatusFilter
            filterStatus={filterStatus}
            handleStatusChange={handleStatusChange}
          />
        </div>
        <div className="date-picker-filter">
          <DatePickerFilter
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
        </div>
      </div>

