import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');

  const addItem = async (i: string) => {
    try{
      const r = await fetch('http://localhost:3001/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: i })
      });
  
      const json = await r.json();
      const newItemsList = [...items];
      newItemsList.push(json.description);
      setItems(newItemsList);
      setNewItem('');  
    }catch(e){
      console.log(e);
    }
  }

  useEffect(() =>{
    const getItems = async ()=>{
      const r = await fetch('http://localhost:3001/items');
      const json = await r.json() as any[];
      const items = json.map(item => item.description);
      setItems(items);
    }
  
    getItems().catch(e => console.log(e));
  }, [])

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
        <button onClick={() => addItem(newItem)}>Add</button>

      </section>
    </div>
  );
}

export default App;
