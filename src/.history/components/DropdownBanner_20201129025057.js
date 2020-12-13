import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

const DropdownBanner = ({ miniBanners, changeBanner }) => {
  const [dropOpen, setDropOpen] = useState(false);

  const toggleDrop = (miniBanner) => {
    if (miniBanner) changeBanner(miniBanner);
    setDropOpen((prevState) => !prevState);
  };

  return (
    <div className="drop-down">
      <Dropdown isOpen={dropOpen} toggle={() => toggleDrop(null)}>
        <DropdownToggle caret color="info">
          Choose another:
        </DropdownToggle>
        <DropdownMenu>
          {miniBanners.map((miniBanner, index) => {
            return (
              <img
                src={miniBanner}
                alt={miniBanner}
                key={miniBanner + index}
                onClick={() => toggleDrop(miniBanner)}
              />
            );
          })}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropdownBanner;
