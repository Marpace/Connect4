function PlayerTab(props) {
  return (
    <div className={`player-tab player-tab-${props.player} ${props.displayedEmoticon === "" ? "" : "animated-tab"}`}>
    <div className={`player-tab__emoticon emoticon-${props.player}`}>
      <img className={`player-tab__emoticon-img ${props.displayedEmoticon === "" ? "" : "displayed-emoticon"}`} src={props.displayedEmoticon}></img>
    </div>
      <p className="player-tab__name">{props.name}</p>
      <p className="player-tab__wins">{props.name === "" ? "" : `Wins: ${props.wins}`}</p>
    </div>
  )
}
 
export default PlayerTab;