import React from "react";
import { allChars, json } from "../../classes/Constants";
import { Table } from "reactstrap";

const DetailsTable = ({ banner, rateUp = [], resize }) => {
  const isChar = (item) => allChars.includes(item);

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
                  {json.getName(banner[index * 2])}
                </>
              ) : (
                json.getName(banner[index * 2])
              )}
            </td>
            <td>
              {banner[index * 2 + 1] == null
                ? ""
                : isChar(banner[index * 2 + 1])
                ? "Character"
                : "Weapon"}
            </td>
            <td>
              {rateUp.includes(banner[index * 2 + 1]) ? (
                <>
                  <img src="../assets/img/misc/uparrow.png" />
                  {json.getName(banner[index * 2 + 1])}
                </>
              ) : banner[index * 2 + 1] == null ? (
                ""
              ) : (
                json.getName(banner[index * 2 + 1])
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
