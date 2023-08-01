function FilterButtonAndClearComponent(props) {
  return (
    <div className="other-buttons-container">
      <div>
        <button
          className="button filter-button filter-button-active"
          onClick={() => {
            props.setFilter("all");
          }}
        >
          All
        </button>
        <button
          className="button filter-button"
          onClick={() => {
            props.setFilter("active");
          }}
        >
          Active
        </button>
        <button
          className="button filter-button"
          onClick={() => {
            props.setFilter("completed");
          }}
        >
          Completed
        </button>
      </div>
      <div>
        <button className="button" onClick={props.clearCompleted}>
          Clear completed
        </button>
      </div>
    </div>
  );
}

export default FilterButtonAndClearComponent;
