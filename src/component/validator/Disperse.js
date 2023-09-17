import { useState } from "react";
import "./Disperse.css";
const Disperse = () => {
  const [Line, setLine] = useState([1]);
  const [rawdata, setRawData] = useState([]);
  const [data, setData] = useState([]);
  const handleKeyup = (e) => {
    handleInput(e);
    const numberofLine = e.target.value.split("\n").length;
    setLine(numberofLine);
  };

  const spanLine = [];
  for (let i = 1; i <= Line && i <= 10; i++) {
    spanLine.push(<span key={i}></span>);
  }
  const handleInput = (e) => {
    if (e.key === "Enter") {
      const currInput = e.target.value.split("\n");
      setRawData(currInput);
    }
  };
  const handleSubmit = () => {
    rawdata.map((item, idx) => {
      const arr = item.split(/[\s,= ]+/);
      const address = arr[0];
      const amount = +arr[1];
      console.log(amount);

      setData([...data, { addrss: address, amt: 45 }]);
    });
    console.log(data);
  };

  return (
    <div>
      <h1>hello</h1>

      <div className="editor">
        <div className="line-numbers">{spanLine}</div>
        <textarea onKeyUp={handleKeyup}></textarea>
      </div>
      <button onClick={handleSubmit}>click me</button>
    </div>
  );
};

export default Disperse;
