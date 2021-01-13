import React from "react";
import { JSON } from "../../classes/Constants";
import { Table } from "reactstrap";

const HistoryTable = ({ history, resize }) => {
  const fontSize =
    resize.windowWidth < 425
      ? undefined
      : { fontSize: `${resize.getWidth(16)}px` };

  const displayHistory = history.map((item, index) => {
    return (
      <tr key={item + index} style={fontSize}>
        <td>{item.type}</td>
        <td
          style={{
            color:
              JSON.getStars(item.name.toLowerCase()) === 4
                ? "rgb(162, 86, 225)"
                : JSON.getStars(item.name.toLowerCase()) === 5
                ? "rgb(189, 105, 50)"
                : undefined,
          }}
        >
          {item.name +
            (JSON.getStars(item.name.toLowerCase()) === 4
              ? " (4-Star)"
              : JSON.getStars(item.name.toLowerCase()) === 5
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
