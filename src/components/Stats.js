import React from "react";

const Stats = ({ primos }) => {
  return (
    <div id="stats">
      <div className="stat" style={{ width: "120px" }}>
        <img
          src="./img/misc/primogem.png"
          alt="primo"
          height="32px"
          style={{ marginLeft: "5px" }}
        />
        <h6 style={{ margin: "0 0 0 10px" }}>{primos}</h6>
      </div>
      <div
        className="stat"
        style={{
          width: "150px",
          marginLeft: "30px",
        }}
      >
        <img
          src="./img/misc/money.png"
          alt="money"
          height="32px"
          style={{ marginLeft: "10px" }}
        />
        <h6 style={{ margin: "0 0 0 20px" }}>
          ${Math.round(primos * 0.012376237 * 100) / 100}
        </h6>
      </div>
    </div>
  );
};

export default Stats;
