const Slot = function(props) {
  return (
    <div
      id={`${props.slotIndex} ${props.columnIndex}`}
      key={props.slotIndex}
      className={
        `slot ${props.columnIndex} ${props.slot.state === "empty" ? "empty" : "pl-" + props.slot.state} ${props.slot.winningSlot === true ? "winning-slot" : ""}`
        } 
      onClick={props.tokenDrop}  
    >
      <div style={{display: `${props.slot.winningSlot ? "" : "none"}`}} className="glow"></div>
    </div>
  )
} 


export default Slot;