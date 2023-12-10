import { useEffect, useState } from "react";

function PlayerTab(props) {

  function truncateString(str, num) {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '...'
  }

  const [name, setName] = useState(null);

  useEffect(() => {
    const truncatedName = truncateString(props.name, 8)
    setName(truncatedName);
  }, [props.name])  

  return (
    <div className={`player-tab player-tab-${props.player} ${props.displayedEmoticon === "" ? "" : "animated-tab"} ${props.name === "" ? "hidden" : ""}`}>
    <div className={`player-tab__emoticon emoticon-${props.player}`}>
      <img className={`player-tab__emoticon-img ${props.displayedEmoticon === "" ? "" : "displayed-emoticon"}`} src={props.displayedEmoticon}></img>
    </div>
      <p className="player-tab__name">{name}</p>
      <p className="player-tab__wins">{props.name === "" ? "" : `Wins: ${props.wins}`}</p>
    </div>
  )
}
 
export default PlayerTab;