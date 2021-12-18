import React from "react";
import { json } from "../../classes/Constants";
import { Table } from "reactstrap";

const HistoryTable = ({ history, resize }) => {
  const fontSize =
    resize.windowWidth < 425
      ? undefined
      : { fontSize: `${resize.getWidth(16)}px` };

  const displayHistory = history.map((item, index) => {
    return (
      <tr key={item + index} style={fontSize}>
        <td>{json.getType(item.id)}</td>
        <td
          style={{
            color:
              json.getStars(item.id) === 4
                ? "rgb(162, 86, 225)"
                : json.getStars(item.id) === 5
                ? "rgb(189, 105, 50)"
                : undefined,
          }}
        >
          {json.getName(item.id) +
            (json.getStars(item.id) === 4
              ? " (4-Star)"
              : json.getStars(item.id) === 5
              ? " (5-Star)"
              : "")}
        </td>
        <td>{new Date(item.time).toLocaleString()}</td>
      </tr>
    );
  });

  return (
    <section id="history-table">
      <Table hover>
        <thead style={fontSize}>
          <tr>
            <th>Item Type</th>
            <th>Item Name</th>
            <th>Time Received</th>
          </tr>
        </thead>
        <tbody>{displayHistory}</tbody>
      </Table>
    </section>
  );
};

export default HistoryTable;
