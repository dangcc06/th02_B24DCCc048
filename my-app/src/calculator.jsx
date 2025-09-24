import React, { useState, useEffect } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [operator, setOperator] = useState(null);
  const [firstValue, setFirstValue] = useState(null);
  const [waitingForSecond, setWaitingForSecond] = useState(false);

  const toNumber = (val) => (val === "" ? 0 : Number(val));

  function inputDigit(digit) {
    if (waitingForSecond) {
      setDisplay(String(digit));
      setWaitingForSecond(false);
    } else {
      setDisplay((prev) => (prev === "0" ? String(digit) : prev + digit));
    }
  }

  function inputDot() {
    if (waitingForSecond) {
      setDisplay("0.");
      setWaitingForSecond(false);
      return;
    }
    if (!display.includes(".")) setDisplay((prev) => prev + ".");
  }

  function clearAll() {
    setDisplay("0");
    setOperator(null);
    setFirstValue(null);
    setWaitingForSecond(false);
  }

  function toggleSign() {
    setDisplay((prev) =>
      prev === "0" ? prev : prev.startsWith("-") ? prev.slice(1) : "-" + prev
    );
  }

  function percent() {
    setDisplay((prev) => String(toNumber(prev) / 100));
  }

  function calculate(a, b, op) {
    const x = Number(a);
    const y = Number(b);
    if (op === "+") return x + y;
    if (op === "-") return x - y;
    if (op === "*") return x * y;
    if (op === "/") return y === 0 ? "Error" : x / y;
    return y;
  }

  function handleOperator(nextOp) {
    const inputValue = display;
    if (firstValue == null) {
      setFirstValue(inputValue);
    } else if (operator) {
      const result = calculate(firstValue, inputValue, operator);
      setDisplay(String(result));
      setFirstValue(String(result));
    }
    setWaitingForSecond(true);
    setOperator(nextOp);
  }

  function handleEquals() {
    if (operator && firstValue != null && !waitingForSecond) {
      const result = calculate(firstValue, display, operator);
      setDisplay(String(result));
      setFirstValue(null);
      setOperator(null);
      setWaitingForSecond(false);
    }
  }

  useEffect(() => {
    function onKey(e) {
      const key = e.key;
      if (/^[0-9]$/.test(key)) return inputDigit(Number(key));
      if (key === ".") return inputDot();
      if (key === "Enter" || key === "=") {
        e.preventDefault();
        return handleEquals();
      }
      if (["+", "-", "*", "/"].includes(key)) return handleOperator(key);
      if (key === "Backspace")
        return setDisplay((prev) => (prev.length <= 1 ? "0" : prev.slice(0, -1)));
      if (key.toLowerCase() === "c") return clearAll();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [display, firstValue, operator, waitingForSecond]);

  const Btn = ({ children, onClick, wide }) => (
    <button
      onClick={onClick}
      className={`rounded-2xl shadow-md p-4 text-lg font-medium focus:outline-none transform active:scale-95 select-none
        ${wide ? "col-span-2" : "col-span-1"}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="w-[360px] bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-slate-500">Máy tính cầm tay — React</div>
          <div className="text-xs text-slate-400">(Hỗ trợ phím bấm, % , +/-, AC)</div>
        </div>

        <div className="bg-black text-white rounded-2xl p-4 mb-4 text-right">
          <div className="text-2xl font-semibold truncate">{display}</div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <Btn onClick={clearAll}>AC</Btn>
          <Btn onClick={toggleSign}>+/-</Btn>
          <Btn onClick={percent}>%</Btn>
          <Btn onClick={() => handleOperator("/")}>÷</Btn>

          <Btn onClick={() => inputDigit(7)}>7</Btn>
          <Btn onClick={() => inputDigit(8)}>8</Btn>
          <Btn onClick={() => inputDigit(9)}>9</Btn>
          <Btn onClick={() => handleOperator("*")}>×</Btn>

          <Btn onClick={() => inputDigit(4)}>4</Btn>
          <Btn onClick={() => inputDigit(5)}>5</Btn>
          <Btn onClick={() => inputDigit(6)}>6</Btn>
          <Btn onClick={() => handleOperator("-")}>−</Btn>

          <Btn onClick={() => inputDigit(1)}>1</Btn>
          <Btn onClick={() => inputDigit(2)}>2</Btn>
          <Btn onClick={() => inputDigit(3)}>3</Btn>
          <Btn onClick={() => handleOperator("+")}>+</Btn>

          <Btn wide onClick={() => inputDigit(0)}>0</Btn>
          <Btn onClick={inputDot}>.</Btn>
          <Btn onClick={handleEquals}>=</Btn>
        </div>

        <div className="mt-4 text-xs text-slate-500">
          Ghi chú: Kết quả \"Error\" xuất hiện khi chia cho 0. Để reset dùng AC.
        </div>
      </div>
    </div>
  );
}
