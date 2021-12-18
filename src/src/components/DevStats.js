import React from "react";

const DevStats = ({ currentBanner }) => {
  return (
    <div className="stats" style={{ marginTop: "10px" }}>
      <h2>
        Banner Five Star Pity: {currentBanner.pityFive}
        {", "}
        Guarantee: {currentBanner.guaranteeFive ? "Yes" : "No"}
      </h2>
      <h2>
        Banner Four Star Pity: {currentBanner.pityFour}
        {", "}
        Guarantee: {currentBanner.guaranteeFour ? "Yes" : "No"}
      </h2>
    </div>
  );
};

export default DevStats;
