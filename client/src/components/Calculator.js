import React, { useState, useEffect } from 'react';
import History from './History';
import { FaHistory, FaSun, FaMoon } from 'react-icons/fa';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [theme, setTheme] = useState('dark');

  const handleButtonClick = (value) => {
    const operators = /[+\-*/^%]/;
    const lastChar = input.slice(-1);

    if (result) {
      if (operators.test(value)) {
        setInput(result + value);
      } else {
        setInput(value);
      }
      setResult('');
    } else {
      if (operators.test(value) && operators.test(lastChar)) {
        setInput(input.slice(0, -1) + value);
      } else if (input === '' && operators.test(value) && value !== '-') {
        // Do nothing if input is empty and value is an operator (unless it's a minus sign)
        return;
      } else {
        setInput(input + value);
      }
    }
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleBackspace = () => {
    setInput(input.slice(0, -1));
  };

  const handleCalculate = async () => {
    try {
      const response = await fetch('http://localhost:5000/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression: input }),
      });
      const data = await response.json();
      if (response.ok) {
        setResult(data.result);
        setHistory([...history, { expression: input, result: data.result }]);
      } else {
        setResult(data.error || 'Error');
      }
    } catch (error) {
      setResult(error.message || 'Error');
    }
  };

  const handleHistorySelect = (item) => {
    setInput(item.expression);
    setResult(item.result);
    setShowHistory(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key, shiftKey } = event;
      if (/[0-9]/.test(key)) {
        handleButtonClick(key);
      } else if (/[+\-*/^%]/.test(key)) {
        handleButtonClick(key);
      } else if (key === 'Enter') {
        handleCalculate();
      } else if (key === 'Backspace') {
        handleBackspace();
      } else if (key === 'Escape') {
        handleClear();
      } else if (shiftKey && key === '+') {
        handleButtonClick('+');
      } else if (shiftKey && key === '*') {
        handleButtonClick('*');
      } else if (key === '(') {
        handleButtonClick('(');
      } else if (key === ')') {
        handleButtonClick(')');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [input, result, history]);

  return (
    <div className={`calculator ${theme}`}>
      <div className="header">
        <button className="theme-switcher" onClick={toggleTheme}>
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>
        <button className="history-button" onClick={() => setShowHistory(!showHistory)}>
          <FaHistory />
        </button>
      </div>
      {showHistory && (
        <History
          history={history}
          onSelect={handleHistorySelect}
          onClose={() => setShowHistory(false)}
        />
      )}
      <div className="display">
        <input type="text" value={input} readOnly />
        <div className="result">{result}</div>
      </div>
      <div className="buttons">
        <button className="operator" onClick={() => handleButtonClick('sqrt(')}>√</button>
        <button className="operator" onClick={() => handleButtonClick('^')}>^</button>
        <button className="operator" onClick={() => handleButtonClick('(')}>(</button>
        <button className="operator" onClick={() => handleButtonClick(')')}>)</button>
        <button className="operator" onClick={handleClear}>AC</button>
        <button className="operator" onClick={handleBackspace}>C</button>
        <button className="operator" onClick={() => handleButtonClick('%')}>%</button>
        <button className="operator" onClick={() => handleButtonClick('/')}>÷</button>
        <button onClick={() => handleButtonClick('7')}>7</button>
        <button onClick={() => handleButtonClick('8')}>8</button>
        <button onClick={() => handleButtonClick('9')}>9</button>
        <button className="operator" onClick={() => handleButtonClick('*')}>×</button>
        <button onClick={() => handleButtonClick('4')}>4</button>
        <button onClick={() => handleButtonClick('5')}>5</button>
        <button onClick={() => handleButtonClick('6')}>6</button>
        <button className="operator" onClick={() => handleButtonClick('-')}>-</button>
        <button onClick={() => handleButtonClick('1')}>1</button>
        <button onClick={() => handleButtonClick('2')}>2</button>
        <button onClick={() => handleButtonClick('3')}>3</button>
        <button className="operator" onClick={() => handleButtonClick('+')}>+</button>
        <button onClick={() => handleButtonClick('0')}>0</button>
        <button onClick={() => handleButtonClick('.')}>.</button>
        <button className="equals" onClick={handleCalculate}>=</button>
      </div>
    </div>
  );
};

export default Calculator;