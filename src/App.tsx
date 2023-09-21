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
    const parser = require('js-sql-parser')
    
    try {
      const parsedQuery = parser.parse(text); // dummy sql
    
      console.log('Parsed Query:');
      console.log(JSON.stringify(parsedQuery, null, 2));
    
      const selectClause = parsedQuery.value.selectItems.value[0].value;
      const fromClause = parsedQuery.value.from.value[0].value.value.value;
      const whereClause_left = parsedQuery.value.where.left.value;
      const whereClause_op = parsedQuery.value.where.operator;
      const whereClause_right = parsedQuery.value.where.right.value;
      const whereCluase = whereClause_left + whereClause_op + whereClause_right
      console.log('SELECT Clause:', selectClause);
      console.log('FROM Clause:', fromClause);
      console.log('WHERE Clause:', whereCluase);

      const relationalAlgebra = `π ${stringUtil.convertToSubscript(selectClause)} σ ${stringUtil.convertToSubscript(fromClause)} (${whereCluase})`
      setAnswer(relationalAlgebra) 
    } catch (error:any) {
      console.error('SQL Parsing Error:', error.message);
    }
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
