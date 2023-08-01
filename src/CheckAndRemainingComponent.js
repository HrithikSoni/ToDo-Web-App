const CheckAndRemainingComponent = (props) => {
  return (
    <div className="check-all-container">
      <div>
        <div className="button" onClick={props.checkAllFun}>
          Check All
        </div>
      </div>

      <span>{props.remaining().length} items remaining</span>
    </div>
  );
};

export default CheckAndRemainingComponent;
