import React, { ReactElement, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [items, setItems] = useState(['1']);
  const [newItem, setNewItem] = useState('');

  const onAdd = (i: string) =>{
    const newItemsList = [...items];
    newItemsList.push(i);
    setItems(newItemsList);
    setNewItem('');
  }

  const listItems = items.map((i, n) => <li key={n}>{i}</li>);



  return (
    <div className="App">
      <header className="App-header">
        TODO List
      </header>
      <section>
        <ul>{listItems}
        </ul>
          <input type="text" value={newItem} onChange={e => setNewItem(e.target.value)}></input>
          <button onClick={() => onAdd(newItem)}>Add</button>
        
      </section>
    </div>
  );
}

export default App;
