const Table = () => {
  const months = [
    { id: `col${1}`, data: "Month 1" },
    { id: `col${2}`, data: "" },
    { id: `col${3}`, data: "" },
    { id: `col${4}`, data: "" },
    { id: `col${5}`, data: "" },
    { id: `col${6}`, data: "" },
  ];

  const titles = [
    { id: `title${1}`, data: "Onboarding Call" },
    { id: `title${2}`, data: "Google Search Console Access" },
    { id: `title${3}`, data: "Website" },
    { id: `title${4}`, data: "Technical Audit" },
    { id: `title${5}`, data: "Anchor Text and Semantic Analysis" },
    { id: `title${6}`, data: "On Page Optimization" },
  ];

  const data = [{ id: `Onboarding Call${1}`, data: "pending" }];

  // Function to debounce API calls
  const debounce = (fn, delay) => {
    let timerId;

    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }

      timerId = setTimeout(() => {
        fn(...args);
        timerId = null;
      }, delay);
    };
  };

  const debouncedUpdateData = debounce(updateDatabase, 1000);

  const [rowCount, setRowCount] = React.useState(5);
  const [column, setColumn] = React.useState([...months]);
  const [rowHeading, setRowHeading] = React.useState([...titles]);

  const stateUpdation = (id, value) => {
    const testId = splitId(id); // this funtion is used the extract the id name if condionalyh update the state
    if (testId === "title") {
      setRowHeading((prevColumns) =>
        prevColumns.map((row) =>
          row.id === id ? { ...row, data: value } : row
        )
      );
    } else if (testId === "col") {
      setColumn((prevColumns) =>
        prevColumns.map((column) =>
          column.id === id ? { ...column, data: value } : column
        )
      );
    }
  };
  const handleSubmit = (id, value) => {
    /*This function enhances the user experience by triggering an action when the user
     either changes something and presses the Enter key or loses focus, eliminating the need to press Enter consistently.*/
    debouncedUpdateData(updateDatabase(id, value));
    stateUpdation(
      id,
      value
    ); /* Since there is no database, attempting to update it will result in an error 
      rather than returning a meaningful result; hence, the state is updated in this scenario. */
  };

  const updateDatabase = async (dataToUpdate) => {
    try {
      const response = await axios.post("your_api_endpoint", dataToUpdate);
      stateUpdation(response?.data?.id, response?.data?.data);
      window.alert("Save Changes");
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };

  function splitId(inputString) {
    //this function will helps to extract the exact from the number mixed #id coming from the input
    const index = inputString.search(/\d/);
    // If a number is found, use slice to get the substring before it
    if (index !== -1) {
      return inputString.slice(0, index);
    }
    return inputString;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr>
                  {column.map((column) => {
                    return (
                      <>
                        <th
                          key={column.id}
                          scope="col"
                          class="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-center border"
                        >
                          <input
                            // key={column.id}
                            value={column.data}
                            className="dark:bg-gray-700 text-center"
                            onBlur={(e) =>
                              handleSubmit(column.id, e.target.value)
                            }
                            onKeyDown={(e) =>
                              e.key === "Enter" &&
                              handleSubmit(column.id, e.target.value)
                            }
                            onChange={(e) =>
                              handleSubmit(column.id, e.target.value)
                            }
                          ></input>
                        </th>
                      </>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {rowHeading.map((heading) => {
                  return (
                    <tr class="border-b border-gray-200 dark:border-gray-700">
                      <th
                        key={heading.id}
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-600 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-500"
                      >
                        <input
                          className="text-center dark:bg-gray-500"
                          value={heading.data}
                          onBlur={(e) =>
                            handleSubmit(heading.id, e.target.value)
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSubmit(heading.id, e.target.value);
                            }
                          }}
                          onChange={(e) =>
                            handleSubmit(heading.id, e.target.value)
                          }
                        ></input>
                      </th>
                      {Array.from({ length: rowCount }).map((index) => (
                        <td className="border" key={index}>
                          <input
                            value={data.data}
                            onBlur={(e) =>
                              handleSubmit(data.id, e.target.value)
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleSubmit(data.id, e.target.value);
                              }
                            }}
                            className="px-6 py-4 text-center"
                            // onChange={(e) => handleChange(e)}
                          ></input>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </>
  );
};

// Render the component to the 'root' div
const rootElement = document.getElementById("table");
ReactDOM.render(<Table />, rootElement);
