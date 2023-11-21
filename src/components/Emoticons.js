import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";

function Emoticons(props) {

  let sources = [];
  for(let i = 0; i < 12; i++) {
    sources.push(`./assets/emoticons/emoticon ${i + 1}.png`);
  }
  
  const socket = useContext(SocketContext);

  const [showEmoticons, setShowEmoticons] = useState(false);
  const [imgSources, setImgSources] = useState(sources)
  const [sendingEmoticon, setSendingEmoticon] = useState(false);

  useEffect(() => {
    socket.on("receiveEmoticon", handleReceiveEmoticon)
  }, [])

  function sendEmoticon(source) {
    if(sendingEmoticon) return;
    setSendingEmoticon(true);
    socket.emit("sendEmoticon", source)
  }

  function handleReceiveEmoticon(data) {
    props.setDisplayedEmoticons(prev => {
      const copy = {...prev};
      copy.playerOne = data.playerNumber === 1 ? data.source : copy.playerOne
      copy.playerTwo = data.playerNumber === 2 ? data.source : copy.playerTwo
      return copy;
    })
    setTimeout(() => {
      props.setDisplayedEmoticons({playerOne: "", playerTwo: ""});
      setSendingEmoticon(false);
    }, 2000);
  }
 

  return (
    <div className="emoticons">
      <button onClick={() => setShowEmoticons(true)} className="emoticon-btn">
        <img src="./assets/smiley.svg"></img>
      </button>
      <div className={`emoticons__faces ${showEmoticons ? "faces-shown" : ""}`}>
        <span onClick={() => setShowEmoticons(false)} className="emoticons-close-btn"></span>
        {imgSources.map((source, index) => ( 
          <img onClick={() => sendEmoticon(source)} className="face" key={index} src={source}></img>
        ))}
      </div>
    </div>
  ) 
}

export default Emoticons;