import { useState } from "react";

import "./Disperse.css";
const Disperse = () => {
  const [Line, setLine] = useState([1]);
  const [data, setData] = useState([]);
  const [onlyAdd, setOnlyAdd] = useState([]);
  const [duplicateAdd, setDuplicateAdd] = useState([]);
  const wrongAmtIDx = [];

  if (data) {
    data.forEach((element, index) => {
      if (!Number(+element.amount) && +element.amount !== 0) {
        wrongAmtIDx.push(index + 1);
      }
    });
  }

  //   handling when key is pressed
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
      const val = [];

      currInput.forEach((item, idx) => {
        if (idx !== currInput.length - 1 && item !== "") {
          const arr = item.split(/[\s,= ]+/);

          const address = arr[0];
          const amount = arr[1];

          if (onlyAdd.indexOf(address) >= 0) {
            const previdx = onlyAdd.indexOf(address);

            if (previdx !== idx && previdx !== -1)
              if (
                !duplicateAdd.find(
                  (o, i) => o[0] === previdx + 1 && o[1] === idx + 1
                )
              )
                setDuplicateAdd([...duplicateAdd, [previdx + 1, idx + 1]]);
          }

          setOnlyAdd([...onlyAdd, address]);
          // console.log(address);

          const temp = { address, amount };
          val.push(temp);
        }
      });
      setData(val);
    }
  };

  return (
    <>
      <div>
        <h1>hello</h1>

        <div className="editor">
          <div className="line-numbers">{spanLine}</div>
          <textarea onKeyUp={handleKeyup}></textarea>
        </div>
      </div>
      {wrongAmtIDx.length !== 0 ? (
        <span className="error">
          <p>Line {wrongAmtIDx[0]} wrong amount</p>
        </span>
      ) : (
        ""
      )}

      {duplicateAdd.length !== 0 ? (
        <p>
          {duplicateAdd.map((item, idx) => {
            return (
              <li key={idx}>
                Address {onlyAdd[item[0] - 1]} encounter duplicate in Line:{" "}
                {item[0]},{item[1]}
              </li>
            );
          })}
        </p>
      ) : (
        ""
      )}
    </>
  );
};

export default Disperse;
