import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import './App.css';
import StringUtil from './Utils/StringUtl';

function App() {
  const [text, setText] = useState<string>('')
  const stringUtil = new StringUtil()
  const [answer, setAnswer] = useState<string>('')

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  const convertToAlgebra: React.MouseEventHandler<HTMLButtonElement> = () => {
    
    setAnswer(`hello ${stringUtil.convertToSubscript(text)}`) 
  }

  return (
    <div className="App">
      <header className="App-background">
        
        <textarea           
          value = {text}
          className='App-textArea'
          onChange={handleTextChange}
        /> 

        <button 
          onClick={convertToAlgebra} 
        > Convert </button>

        <p><span dangerouslySetInnerHTML={{ __html: answer }} /></p>
      </header>
    </div>
  );
}

export default App;
