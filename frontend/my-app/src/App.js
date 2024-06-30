import React, { useState } from 'react';
import './App.css'; // Make sure you have this CSS file or create it with some basic styling

function App() {
  // State to manage the code input and result
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle code submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Send the code to the backend
      const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      // Check if the response is ok
      if (response.ok) {
        const data = await response.json();
        setResult(data.result);  // Assuming the backend sends `{ result: "compiled code" }`
      } else {
        setResult('Error compiling code');
      }
    } catch (error) {
      console.error('Error:', error);
      setResult('Error compiling code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Compiler App</h1>
        <form onSubmit={handleSubmit} className="compiler-form">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your code here..."
            rows="10"
            cols="50"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Compiling...' : 'Compile Code'}
          </button>
        </form>
        {result && (
          <div className="result">
            <h2>Result:</h2>
            <pre>{result}</pre>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

