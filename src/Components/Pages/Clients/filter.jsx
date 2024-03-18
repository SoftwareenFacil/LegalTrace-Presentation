

  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");


  useEffect(() => {
    let filtered = clients;

    if (selectedDate) {
      filtered = filtered.filter((client) => {
        const clientDate = new Date(client.date);
        return (
          clientDate.getDate() === selectedDate.getDate() &&
          clientDate.getMonth() === selectedDate.getMonth() &&
          clientDate.getFullYear() === selectedDate.getFullYear()
        );
      });
    }

    if (filterStatus) {
      filtered = filtered.filter(
        (client) =>
          client.status && client.status.replace(/\s/g, "") === filterStatus
      );
    }

    setFilteredClients(filtered);
  }, [selectedDate, filterStatus, clients]);


    /*
    const lowercasedFilter = searchText.toLowerCase();
    const filteredData = clients.filter((item) => {
      return Object.keys(item).some((key) =>
        String(item[key]).toLowerCase().includes(lowercasedFilter)
      );
    });

    setFilteredClients(filteredData);
  };
  */

