import React, { useState } from "react";
import QRCode from "qrcode.react";
import "./App.css";

function App() {
  const [queue, setQueue] = useState([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);
  const [complete, setComplete] = useState([]);
  const [noShow, setNoShow] = useState([]);

  const addPerson = () => {
    const name = prompt("Enter name:");
    if (name) {
      const nextId = queue.length ? queue[queue.length - 1].id + 1 : 1;
      setQueue([...queue, { id: nextId, name }]);
    }
  };

  const moveToComplete = (person) => {
    setComplete([...complete, person]);
    setQueue(queue.filter((p) => p.id !== person.id));
  };

  const moveToNoShow = (person) => {
    setNoShow([...noShow, person]);
    setQueue(queue.filter((p) => p.id !== person.id));
  };

  return (
    <div className="App">
      <h1>Facepaint Queue</h1>
      <button onClick={addPerson}>Add Person</button>
      {queue.length > 0 && (
        <div>
          <h2>Now Painting: {queue[0].name}</h2>
          <button onClick={() => moveToComplete(queue[0])}>Complete</button>
          <button onClick={() => moveToNoShow(queue[0])}>No Show</button>
        </div>
      )}
      <h2>Queue</h2>
      <ul>
        {queue.slice(1).map((person) => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>

      <h2>Complete</h2>
      <ul>
        {complete.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>

      <h2>No Show</h2>
      <ul>
        {noShow.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>

      <h3>Scan QR code to view:</h3>
      <QRCode value={window.location.href} />
    </div>
  );
}

export default App;

