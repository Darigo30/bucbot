import { useState } from "react";
//import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar el CSS de Bootstrap

const App = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const getCompletion = async () => {
    try {
      const response = await fetch("http://localhost:8000/completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        throw new Error(`Error al realizar la solicitud: ${response.statusText}`);
      }

      const data = await response.json();
      setMessages(prev => [...prev, { text: text, type: 'user' }, { text: data.message.content, type: 'bot' }]);
      setText("");
    } catch (error) {
      console.error("Error al realizar la solicitud - error:", error);
    }
  };

  return (
    <div className="container p-3">
      <div className="border rounded p-3 bg-light" style={{ height: '500px', overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <div key={index} className={`d-flex ${msg.type === 'bot' ? 'justify-content-start' : 'justify-content-end'}`}>
            <div className={`rounded px-3 py-2 ${msg.type === 'bot' ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="input-group mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Pregunta algo..."
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyPress={e => e.key === 'Enter' ? getCompletion() : null}
        />
        <button className="btn btn-primary" onClick={getCompletion}>
         <span className="material-icons">send</span>
        </button>
      </div>
    </div>
  );
};

export default App;
