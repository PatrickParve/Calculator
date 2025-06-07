import './Calculator.css';
import { useEffect, useRef, useState } from 'react';
import {evaluate} from 'mathjs'; 

const Calculator = () => {
  const [input, setInput] = useState("0");
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }
  }, [input]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleButtonClick = (e) => {
    const parts = input.split(/[\+\-\*\/]/)
    switch (e.target.value) {
      case 'AC':
        setInput("0")
        break;
      case '+/-':
        if (input[0] === "-") {
          setInput(input.slice(1))
        } else {
          setInput("-" + input)
        }
        break;
      case 'DEL':
        if (input.toString().length === 1)
          setInput("0")
        else if (input != 0) {
          setInput(input.slice(0, -1));
        }
        break;
      case '=':
        try {
          const result = evaluate(input);
          setInput(result.toString());
        } catch (error) {
          alert("NO calculation can be made!")
          break;
        }
        break;
      case '.':
        const currentNumber = parts[parts.length - 1]
        if (!currentNumber.includes(".")) {
          setInput(input + e.target.value)
        }
        break;
      default:        
        if (input === "0" && !isNaN(Number(e.target.value))) {
          setInput(e.target.value)
          break;
        } else if (!isNaN(Number(input[input.length - 1]))) {
            setInput(input + e.target.value);
            break;
        } else if (isNaN(Number(input[input.length - 1])) && isNaN(Number(e.target.value))) {
            setInput(input.slice(0, -1) + e.target.value)
            break;
        } else if (isNaN(Number(input[input.length - 1])) && !isNaN(Number(e.target.value))){
            setInput(input + e.target.value);
            break;
        }
    }
  };

  return (
    <div>
      <h1>Calculator</h1>
      <div className="calculator">
      <input type="Text" value={input} ref={inputRef} onChange={handleInputChange} />

      <div className="buttonGrid">
        <button value={"AC"} onClick={handleButtonClick}>AC</button>
        <button value={"+/-"} onClick={handleButtonClick}>+/-</button>
        <button value={"%"} onClick={handleButtonClick}>%</button>
        <button value={"/"} onClick={handleButtonClick}>/</button>

        <button value={7} onClick={handleButtonClick}>7</button>
        <button value={8} onClick={handleButtonClick}>8</button>
        <button value={9} onClick={handleButtonClick}>9</button>
        <button value={"*"} onClick={handleButtonClick}>*</button>

        <button value={4} onClick={handleButtonClick}>4</button>
        <button value={5} onClick={handleButtonClick}>5</button>
        <button value={6} onClick={handleButtonClick}>6</button>
        <button value={"-"} onClick={handleButtonClick}>-</button>

        <button value={1} onClick={handleButtonClick}>1</button>
        <button value={2} onClick={handleButtonClick}>2</button>
        <button value={3} onClick={handleButtonClick}>3</button>
        <button value={"+"} onClick={handleButtonClick}>+</button>

        <button value={"."} onClick={handleButtonClick}>,</button>
        <button value={0} onClick={handleButtonClick}>0</button>
        <button value={"DEL"} onClick={handleButtonClick}>DEL</button>
        <button value={"="} onClick={handleButtonClick}>=</button>
      </div>
    </div>

    </div>
  )
}

export default Calculator