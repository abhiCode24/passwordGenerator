
import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {

  const [length,setlength] = useState(8);
  const [numLao,setNumLao] = useState(false);
  const [charLao,setCharLao]= useState(false);
  const [password,setPassword]= useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numLao){
      letters += "0123456789";
    }
    if(charLao){
      letters += "!@#$%^&*~?_-";
    }

    for(let i = 0; i < length; i++){
      let charIndex = Math.floor(Math.random()*letters.length);
      pass+=letters.charAt(charIndex)
    }

    setPassword(pass);


  },[length,numLao,charLao])

  const copyPasswordToClipBoard = useCallback(()=>{
      passwordRef.current?.select();
      window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{
    passwordGenerator();
  },[length,numLao,charLao,passwordGenerator])

  return (
    <>

    <div className='main'>

      <div className="heading">
        <h3>Password Generator</h3>
      </div>

      <div className="content">
        <input type="text" value={password} className='input' placeholder='name' ref = {passwordRef} />

        <button className='btn' onClick={copyPasswordToClipBoard}><img src="img/pic.png" alt="pic" /></button>
      </div>

      <div className="second-box">

        <div className='inp-len'>
        <input type="range" value={length} min={4} max={100} onChange={(e)=>{
          setlength(e.target.value)
        }} />
        <label> Length: {length}</label>
        </div>

        <div>
          <input type="checkbox"
           defaultChecked={charLao}
          onChange={
            ()=>{
            setCharLao((prev) => !prev);
          }} />
          <label>Character</label>
        </div>

        <div>
          <input type="checkbox"
           defaultChecked={numLao}
            onChange={
            ()=>{
            setNumLao((prev) => !prev);
          }} />
          <label>Number</label>
        </div>

      </div>


    </div>

    </>
  );
}

export default App;

