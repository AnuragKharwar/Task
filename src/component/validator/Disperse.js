import { useState } from "react";

import "./Disperse.css";
const Disperse = () => {
  const [Line, setLine] = useState([1]);
  const [data, setData] = useState([]);
  const [onlyAdd, setOnlyAdd] = useState([]);
  const [Value, setValue] = useState("");

  const wrongAmtIDx = [];
  const dupicateAddressIdx = [];

  if (data) {
    data.forEach((element, index) => {
      if (!Number(+element.amount) && +element.amount !== 0) {
        wrongAmtIDx.push(index + 1);
      }
    });
  }

  if (onlyAdd.length >= 1) {
    onlyAdd.forEach((element, index) => {
      // console.log(element);
      const idx = onlyAdd.indexOf(element);
      if (idx !== index) {
        dupicateAddressIdx.push([idx + 1, index + 1, element]);
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
    const currInput = e.target.value.split("\n");
    if (e.key === "Enter") {
      const val = [];
      const tempaddress = [];

      currInput.forEach((item, idx) => {
        if (idx !== currInput.length - 1 && item !== "") {
          const arr = item.split(/[\s,= ]+/);

          const address = arr[0];
          const amount = arr[1];

          const temp = { address, amount };

          tempaddress.push(address);
          val.push(temp);
        }
      });

      setData(val);
      setOnlyAdd(tempaddress);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const keepFirst = () => {
    for (let i = 0; i < data.length; i++) {
      var currEleAdd = data[i].address;
      for (let j = i + 1; j < data.length; j++) {
        var dubAdd = data[j].address;
        if (currEleAdd === dubAdd) {
          data.splice(j, 1);
        }
      }
    }
    ShowChanges(data);
  };

  const combineBalane = () => {
    for (let i = 0; i < data.length; i++) {
      var currEleAdd = data[i].address;
      var currEleAmt = data[i].amount;

      for (let j = i + 1; j < data.length; j++) {
        var dubAdd = data[j].address;
        var dubamt = data[j].amount;

        if (currEleAdd === dubAdd) {
          data[i].amount = parseInt(dubamt) + parseInt(currEleAmt);
          data.splice(j, 1);
        }
      }
    }
    ShowChanges(data);
  };

  const ShowChanges = (data) => {
    var val = "";
    data.forEach((item) => {
      val += item.address + " " + item.amount + "\n";
    });
    // console.log(val);
    setValue(val);
    // console.log(data);
  };

  return (
    <>
      <div>
        <div className="editor">
          <div className="line-numbers">{spanLine}</div>
          <textarea
            onKeyUp={handleKeyup}
            onChange={handleChange}
            value={Value}
          ></textarea>
        </div>
      </div>
      {wrongAmtIDx.length !== 0 ? (
        <span>
          <p>Line {wrongAmtIDx[0]} wrong amount</p>
        </span>
      ) : (
        ""
      )}

      {dupicateAddressIdx.length !== 0 && wrongAmtIDx.length === 0 ? (
        <div>
          <span className={"btn"} onClick={keepFirst}>
            Keep the first one
          </span>{" "}
          |{" "}
          <span className={"btn"} onClick={combineBalane}>
            {" "}
            combine Balance
          </span>
          <p>
            {dupicateAddressIdx.map((item, idx) => {
              return (
                <li key={idx}>
                  Address {onlyAdd[item[0] - 1]} encounter duplicate in Line:{" "}
                  {item[0]},{item[1]}
                </li>
              );
            })}
          </p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Disperse;
