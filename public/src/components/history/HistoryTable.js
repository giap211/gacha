import React, { useState, useEffect } from "react";
import { allChars } from "../../classes/Constants";
import { Table } from "reactstrap";
import axios from "axios";

const HistoryTable = ({ history, resize }) => {
  const [charData, setCharData] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get("http://localhost:3000/characters/", { cancelToken: source.token })
      .then((response) => {
        setCharData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      source.cancel();
    };
  }, []);

  const [weaponData, setWeaponData] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get("http://localhost:3000/weapons/", { cancelToken: source.token })
      .then((response) => {
        setWeaponData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      source.cancel();
    };
  }, []);

  const [typeData, setTypeData] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get("http://localhost:3000/types/", { cancelToken: source.token })
      .then((response) => {
        setTypeData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      source.cancel();
    };
  }, []);

  const getName = (item) => {
    let name = "";
    allChars.includes(item)
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

  const getType = (item) => {
    let typeId = "";
    allChars.includes(item)
      ? charData.map((datum) => {
          if (item === datum._id) typeId = datum.vision;
          return datum;
        })
      : weaponData.map((datum) => {
          if (item === datum._id) typeId = datum.type;
          return datum;
        });
    let type = "";
    typeData.map((datum) => {
      if (typeId === datum._id) type = datum.type;
      return datum;
    });
    return type;
  };

  const getStars = (item) => {
    let stars = "";
    allChars.includes(item)
      ? charData.map((datum) => {
          if (item === datum._id) stars = datum.rarity;
          return datum;
        })
      : weaponData.map((datum) => {
          if (item === datum._id) stars = datum.rarity;
          return datum;
        });
    return stars;
  };

  const fontSize =
    resize.windowWidth < 425
      ? undefined
      : { fontSize: `${resize.getWidth(16)}px` };

  const displayHistory = history.map((item, index) => {
    return (
      <tr key={item + index} style={fontSize}>
        <td>{getType(item.id)}</td>
        <td
          style={{
            color:
              getStars(item.id) === 4
                ? "rgb(162, 86, 225)"
                : getStars(item.id) === 5
                ? "rgb(189, 105, 50)"
                : undefined,
          }}
        >
          {getName(item.id) +
            (getStars(item.id) === 4
              ? " (4-Star)"
              : getStars(item.id) === 5
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
