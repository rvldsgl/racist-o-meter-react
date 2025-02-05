import { useState } from "react";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [infoVisible, setInfoVisible] = useState(false);
  const [infoText, setInfoText] = useState("");

  const handleSubmit = async () => {
    if (!inputText.trim()) {
      setResult("Error");
      setInfoText("Please enter a sentence to analyze.");
      return;
    }
  
    try {
      const response = await fetch("https://racist-o-meter-fastapi-production.up.railway.app/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setResult(data.classification);
        setInfoText(data.explanation);
      } else {
        setResult("Error");
        setInfoText("There was an issue with the API.");
      }
    } catch (error) {
      setResult("Error");
      setInfoText("There was an issue with the network.");
    }
  };
  

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Racist-O-Meter</h1>

        <textarea
          className="input-box"
          placeholder="Type here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>

        <button className="submit-btn" onClick={handleSubmit}>
          Check
        </button>

        {result && (
          <div className="result-container">
            <p className="result">{result}</p>
            <span className="info-icon" onClick={() => setInfoVisible(!infoVisible)}>ℹ️</span>
          </div>
        )}

        {infoVisible && <p className="info-text">{infoText}</p>}
      </div>
    </div>
  );
}

export default App;
