import React, { useState } from 'react';

function CompilerForm() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleCompile = async () => {
    try {
      const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: input }),
      });
      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="compiler-form">
      <h2>Compiler</h2>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your code here"
      />
      <button onClick={handleCompile}>Compile</button>
      <pre>{output}</pre>
    </div>
  );
}

export default CompilerForm;
