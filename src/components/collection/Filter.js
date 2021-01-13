import React from "react";
import Button from "../Button";
import Checkbox from "../Checkbox";

const SubFilter = ({ heading, tags, checked, onChange, resize }) => {
  return (
    <div className="subfilter">
      <div className="subfilter-heading">
        <h5 style={{ marginBottom: "1%" }}>{heading}</h5>
        <div className="clear-button" style={{ width: "85px", height: "25px" }}>
          <div
            className="trash-icon"
            style={{
              backgroundImage: "url(../assets/img/misc/trash.webp)",
              width: "20px",
              height: "20px",
            }}
          ></div>
          Clear
        </div>
      </div>
      <div className="subfilter-checkbox-container">
        {tags.map((tag, index) => {
          return (
            <Checkbox
              key={tag + index}
              text={tag}
              checked={checked ? checked[index] : undefined}
              id={tag + index}
              onChange={onChange ? onChange[index] : undefined}
              resize={resize}
            />
          );
        })}
      </div>
    </div>
  );
};

const Filter = ({ filters, filterChanges, resize }) => {
  return (
    <section id="collection-filter">
      <h3>Filter</h3>
      <section id="subfilter-section">
        <SubFilter
          heading="Order"
          tags={["Default", "Rarity", "A-Z"]}
          resize={resize}
        />
        <SubFilter
          heading="Characters"
          tags={["Anemo", "Cryo", "Electro", "Geo", "Hydro", "Pyro"]}
          resize={resize}
        />
        <SubFilter
          heading="Weapons"
          tags={["Sword", "Claymore", "Bow", "Polearm", "Catalyst"]}
          resize={resize}
        />
        <SubFilter
          heading="Quality"
          tags={["5-Star", "4-Star", "3-Star"]}
          resize={resize}
        />
        <SubFilter
          heading="Display"
          tags={["Unlocked", "Locked"]}
          checked={filters.display}
          onChange={filterChanges.display}
          resize={resize}
        />
        <Button
          size={{
            height: `${resize.getHeight(40, 75)}px`,
            width: `${resize.getWidth(75)}px`,
            backgroundImage: "url(../assets/img/misc/sort.webp)",
          }}
          resize={resize}
        />
      </section>
    </section>
  );
};

export default Filter;
