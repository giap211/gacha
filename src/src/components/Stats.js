import React, { useState } from "react";
import { Tooltip } from "reactstrap";

const Stats = ({ primos, resize }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);
  return (
    <div id="stats">
      <div
        className="stat primo-stat-container"
        style={{
          height: `${resize.getHeight(40, 120)}px`,
          width: `${resize.getWidth(120)}px`,
          padding: `${resize.getWidth(3)}px`,
        }}
      >
        <img
          src="./assets/img/misc/primogem.webp"
          alt="primo"
          height={`${resize.getHeight(32, 30)}`}
          width={`${resize.getWidth(30)}`}
        />
        <h6
          id="primo-stat"
          style={{
            fontSize: `${resize.getWidth(16)}px`,
          }}
        >
          {primos}
        </h6>
        <Tooltip
          placement="bottom"
          isOpen={tooltipOpen}
          target="primo-stat"
          toggle={toggle}
          style={{ backgroundColor: "#282c34", color: "antiquewhite" }}
        >
          {`${primos / 160} total wishes`}
        </Tooltip>
      </div>
      <div
        className="stat money-stat-container"
        style={{
          height: `${resize.getHeight(40, 150)}px`,
          width: `${resize.getWidth(150)}px`,
          padding: `${resize.getWidth(3)}px`,
        }}
      >
        <img
          src="./assets/img/misc/money.webp"
          alt="money"
          height={`${resize.getHeight(32, 42)}`}
          width={`${resize.getWidth(42)}`}
        />
        <h6
          id="money-stat"
          style={{
            fontSize: `${resize.getWidth(16)}px`,
          }}
        >
          ${Math.round(primos * 0.012376237 * 100) / 100}
        </h6>
      </div>
    </div>
  );
};

export default Stats;
