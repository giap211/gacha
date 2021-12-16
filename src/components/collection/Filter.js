import React from "react";
import Button from "../Button";
import Checkbox from "../Checkbox";

const AllButton = ({ onClick, resize }) => {
  return (
    <div
      className="all-button"
      onClick={onClick}
      style={{
        width: `${resize.getWidth(85)}px`,
        height: `${resize.getHeight(25, 85)}px`,
        fontSize: `${resize.getWidth(14)}px`,
      }}
    >
      All
    </div>
  );
};

const ClearButton = ({ onClick, resize }) => {
  return (
    <div
      className="clear-button"
      onClick={onClick}
      style={{
        width: `${resize.getWidth(85)}px`,
        height: `${resize.getHeight(25, 85)}px`,
        fontSize: `${resize.getWidth(14)}px`,
      }}
    >
      <div
        className="trash-icon"
        style={{
          backgroundImage: "url(../assets/img/misc/trash.webp)",
          width: `${resize.getWidth(20)}px`,
          height: `${resize.getWidth(20)}px`,
          backgroundSize: `${resize.getWidth(10)}px ${resize.getWidth(10)}px`,
        }}
      ></div>
      Clear
    </div>
  );
};

const SubFilter = ({
  heading,
  tags,
  checked,
  onChange,
  sideButton,
  resize,
}) => {
  return (
    <div className="subfilter">
      <div className="subfilter-heading" style={{ marginBottom: "1%" }}>
        <h5>{heading}</h5>
        {sideButton}
      </div>
      <div className="subfilter-checkbox-container">
        {tags.map((tag, index) => {
          return (
            <Checkbox
              key={tag + index}
              text={tag}
              checked={checked ? checked.includes(tag) : false}
              id={tag}
              onChange={onChange ? onChange : false}
              resize={resize}
            />
          );
        })}
      </div>
    </div>
  );
};

const Filter = ({
  activeFilters,
  setActiveFilters,
  sortOrder,
  setSortOrder,
  setSearchItem,
  resize,
}) => {
  const handleCheckbox = (e) => {
    let activeFiltersClone = [...activeFilters];
    const target = e.target.id;
    if (activeFiltersClone.includes(target)) {
      activeFiltersClone = activeFiltersClone.filter(
        (filter) => filter !== target
      );
    } else activeFiltersClone.push(target);
    setActiveFilters(activeFiltersClone);
  };

  const handleUnique = (e, filters) => {
    let activeFiltersClone = [...activeFilters];
    const target = e.target.id;
    activeFiltersClone = activeFiltersClone.filter(
      (filter) => !filters.includes(filter)
    );
    activeFiltersClone.push(target);
    setActiveFilters(activeFiltersClone);
  };

  const checked = (tags) =>
    activeFilters.filter((filter) => tags.includes(filter));

  const handleAll = (tags) => {
    let activeFiltersClone = [...activeFilters];
    tags.map((tag) => {
      if (!activeFiltersClone.includes(tag)) activeFiltersClone.push(tag);
      return tag;
    });
    setActiveFilters(activeFiltersClone);
  };

  const handleClear = (tags) => {
    let activeFiltersClone = [...activeFilters];
    activeFiltersClone = activeFiltersClone.filter(
      (filter) => !tags.includes(filter)
    );
    setActiveFilters(activeFiltersClone);
  };

  const handleSearch = (item) => {
    setSearchItem(item);
  };

  return (
    <section id="collection-filter">
      <section id="collection-filter-top">
        <h3>Filter</h3>
        <div>
          <input
            type="search"
            id="item-search"
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </section>
      <section id="subfilter-section">
        <SubFilter
          heading="Order"
          tags={["Default", "By Rarity", "By Count"]}
          checked={checked(["Default", "By Rarity", "By Count"])}
          onChange={(e) =>
            handleUnique(e, ["Default", "By Rarity", "By Count"])
          }
          sideButton={
            <Button
              size={{
                height: `${resize.getHeight(30, 75)}px`,
                width: `${resize.getWidth(55)}px`,
              }}
              onClick={() => setSortOrder(!sortOrder)}
              context={
                <div
                  style={{
                    height: `${resize.getHeight(30, 75)}px`,
                    width: `${resize.getWidth(55)}px`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundImage: "url(../assets/img/misc/sort.webp)",
                  }}
                />
              }
              resize={resize}
            />
          }
          resize={resize}
        />
        <SubFilter
          heading="Characters"
          tags={["Anemo", "Cryo", "Electro", "Geo", "Hydro", "Pyro"]}
          checked={checked([
            "Anemo",
            "Cryo",
            "Electro",
            "Geo",
            "Hydro",
            "Pyro",
          ])}
          onChange={handleCheckbox}
          sideButton={
            <section className="filter-button-pair">
              <AllButton
                onClick={() =>
                  handleAll([
                    "Anemo",
                    "Cryo",
                    "Electro",
                    "Geo",
                    "Hydro",
                    "Pyro",
                  ])
                }
                resize={resize}
              />
              <ClearButton
                onClick={() =>
                  handleClear([
                    "Anemo",
                    "Cryo",
                    "Electro",
                    "Geo",
                    "Hydro",
                    "Pyro",
                  ])
                }
                resize={resize}
              />
            </section>
          }
          resize={resize}
        />
        <SubFilter
          heading="Weapons"
          tags={["Sword", "Claymore", "Bow", "Polearm", "Catalyst"]}
          checked={checked(["Sword", "Claymore", "Bow", "Polearm", "Catalyst"])}
          onChange={handleCheckbox}
          sideButton={
            <section className="filter-button-pair">
              <AllButton
                onClick={() =>
                  handleAll(["Sword", "Claymore", "Bow", "Polearm", "Catalyst"])
                }
                resize={resize}
              />
              <ClearButton
                onClick={() =>
                  handleClear([
                    "Sword",
                    "Claymore",
                    "Bow",
                    "Polearm",
                    "Catalyst",
                  ])
                }
                resize={resize}
              />
            </section>
          }
          resize={resize}
        />
        <SubFilter
          heading="Quality"
          tags={["5-Star", "4-Star", "3-Star"]}
          checked={checked(["5-Star", "4-Star", "3-Star"])}
          onChange={handleCheckbox}
          sideButton={
            <section className="filter-button-pair">
              <AllButton
                onClick={() => handleAll(["5-Star", "4-Star", "3-Star"])}
                resize={resize}
              />
              <ClearButton
                onClick={() => handleClear(["5-Star", "4-Star", "3-Star"])}
                resize={resize}
              />
            </section>
          }
          resize={resize}
        />
        <SubFilter
          heading="Display"
          tags={["Unlocked", "Locked", "Count"]}
          checked={checked(["Unlocked", "Locked", "Count"])}
          onChange={handleCheckbox}
          sideButton={
            <section className="filter-button-pair">
              <AllButton
                onClick={() => handleAll(["Unlocked", "Locked", "Count"])}
                resize={resize}
              />
              <ClearButton
                onClick={() => handleClear(["Unlocked", "Locked", "Count"])}
                resize={resize}
              />
            </section>
          }
          resize={resize}
        />
      </section>
    </section>
  );
};

export default Filter;
