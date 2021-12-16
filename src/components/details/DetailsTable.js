import React from "react";
import { allChars } from "../../classes/Constants";
import { Table } from "reactstrap";

const DetailsTable = ({
  banner,
  rateUp = [],
  charData,
  weaponData,
  resize,
}) => {
  const isChar = (item) => allChars.includes(item);

  const getName = (item) => {
    let name = "";
    isChar(item)
      ? charData.map((datum) => {
          if (item === datum._id) name = datum.name;
          return datum;
        })
      : weaponData.map((datum) => {
          if (item === datum._id) name = datum.name;
          return datum;
        });
    return name;
  };

  console.log(banner);

  const fontSize =
    resize.windowWidth < 425
      ? undefined
      : { fontSize: `${resize.getWidth(16)}px` };

  const tableItem = banner.map((item, index) => {
    return (
      <tr key={item + index} style={fontSize}>
        {index < Math.ceil(banner.length / 2) ? (
          <>
            <td>{isChar(banner[index * 2]) ? "Character" : "Weapon"}</td>
            <td>
              {rateUp.includes(banner[index * 2]) ? (
                <>
                  <img src="../assets/img/misc/uparrow.png" />
                  {getName(banner[index * 2])}
                </>
              ) : (
                getName(banner[index * 2])
              )}
            </td>
            <td>{isChar(banner[index * 2 + 1]) ? "Character" : "Weapon"}</td>
            <td>
              {rateUp.includes(banner[index * 2 + 1]) ? (
                <>
                  <img src="../assets/img/misc/uparrow.png" />
                  {getName(banner[index * 2 + 1])}
                </>
              ) : (
                getName(banner[index * 2 + 1])
              )}
            </td>
          </>
        ) : (
          <></>
        )}
      </tr>
    );
  });

  return (
    <section className="details-table">
      <Table>
        <thead style={fontSize}>
          <tr>
            <th>Item Type</th>
            <th>Item Name</th>
            <th>Item Type</th>
            <th>Item Name</th>
          </tr>
        </thead>
        <tbody>{tableItem}</tbody>
      </Table>
    </section>
  );
};

export default DetailsTable;
