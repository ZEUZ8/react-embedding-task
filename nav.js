const Nav = ()=>{
    return(
        <nav className="bg-white border-gray-200 dark:bg-gray-900 rounded-md" >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
        <a
          href="https://redux.js.org/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            DYNAMIC TABLE
          </span>
        </a>
      </div>
    </nav>
    )
}
// Render the component to the 'root' div
const rootElement = document.getElementById('nav');
ReactDOM.render(<Nav />, rootElement);
