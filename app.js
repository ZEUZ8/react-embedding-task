const Table = () => {
  const columns = [{ id: Date.now().toString(), title: "Onboarding Call" }];

  const months = [
    { id: `col${1}`, data: "Month 1" },
    { id: `col${2}`, data: "" },
    { id: `col${3}`, data: "" },
    { id: `col${4}`, data: "" },
    { id: `col${5}`, data: "" },
    { id: `col${6}`, data: "" },
  ];

  const titles = [
    { id: `title${1}`, title: "Onboading Call" },
    { id: `title${2}`, title: "Google Search Console Access" },
    { id: `title${3}`, title: "Website" },
    { id: `title${4}`, title: "Technical Audit" },
    { id: `title${5}`, title: "Anchor Text and Semantic Analysis" },
    { id: `title${6}`, title: "On Page Optimization" },
  ];

  const data = [
    {id:``}
  ]

  const [row, setRow] = React.useState();
  const [rowCount, setRowCount] = React.useState(5);
  const [column, setColumn] = React.useState([...months]);
  const [rowHeading, setRowHeading] = React.useState([...titles]);

  const handleChange = (id,newValue) => {
    setRowHeading((prevColumns) =>
    prevColumns.map((column) =>
      column.id === id ? { ...column, data: newValue } : column
    )
  );
  };
  const handleSubmit = (e) => {
    console.log(e.target.value);
  };

  const handleHeadinClick = (id, newValue) => {
    setColumn((prevColumns) =>
      prevColumns.map((column) =>
        column.id === id ? { ...column, data: newValue } : column
      )
    );
  };

  return (
    <>
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
                          onChange={(e) =>
                            handleHeadinClick(column.id, e.target.value)
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
                        value={heading.title}
                        className="text-center dark:bg-gray-500"
                        onChange={(e) => handleChange(heading.id, e.target.value)}
                      ></input>
                    </th>
                    {/* {rowHeading.shift() && rowHeading.map((heading)=>{
                      return (
                        <td className="border">
                        <input
                          key={heading.id}
                          value={"sina"}
                          className="px-6 py-4 text-center"
                          onChange={(e) => handleChange(e)}
                        ></input>
                      </td>
                      )
                    })} */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

// Render the component to the 'root' div
const rootElement = document.getElementById("table");
ReactDOM.render(<Table />, rootElement);
