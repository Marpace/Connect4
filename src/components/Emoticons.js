import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";

function Emoticons(props) {

  let sources = [];
  for(let i = 0; i < 22; i++) {
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
    setShowEmoticons(false);
    setSendingEmoticon(true);
    socket.emit("sendEmoticon", source)
  }

  function handleReceiveEmoticon(data) {
    props.setDisplayedEmoticons(prev => {
      const copy = {...prev};
      copy.playerOne = data.playerNumber === 1 ? data.source : copy.playerOne;
      copy.playerTwo = data.playerNumber === 2 ? data.source : copy.playerTwo;
      return copy;
    })
    setTimeout(() => {
      props.setDisplayedEmoticons( prev => {
        console.log(prev)
        const copy = {...prev}
        copy.playerOne = data.playerNumber === 1 ? "" : copy.playerOne;
        copy.playerTwo = data.playerNumber === 2 ? "" : copy.playerTwo;
        return copy;
      });
      setSendingEmoticon(false);
    }, 2000);
  }
 

  return (
    <div className="emoticons">
      <button onClick={() => setShowEmoticons(true)} className="emoticon-btn">
        <img onClick={() => setShowEmoticons(true)} className="smiley" src="./assets/smiley.svg"></img>
      </button>
      <div className={`emoticons__faces ${showEmoticons ? "faces-shown" : ""}`}>
        <span onClick={() => setShowEmoticons(false)} className="emoticons-close-btn"></span>
        <div className="emoticons__faces-wrap">
          {imgSources.map((source, index) => ( 
            <img onClick={() => sendEmoticon(source)} className="face" key={index} src={source}></img>
          ))}
        </div>
      </div>
    </div>
  ) 
}

export default Emoticons;