import React, { useState } from "react";
import { allBannersAbbr, json } from "../classes/Constants";
import { Dropdown, DropdownToggle, DropdownMenu, Tooltip } from "reactstrap";

const MiniTooltip = ({ miniBanners, bannersActive, onSelect, dropOpen }) => {
  const [toolTip, setToolTip] = useState({});

  const toggle = (targetName) => {
    if (!toolTip[targetName]) {
      setToolTip({
        ...toolTip,
        [targetName]: {
          tooltipOpen: true,
        },
      });
    } else {
      setToolTip({
        ...toolTip,
        [targetName]: {
          tooltipOpen: !toolTip[targetName].tooltipOpen,
        },
      });
    }
  };

  const isToolTipOpen = (targetName) => {
    return toolTip[targetName] ? toolTip[targetName].tooltipOpen : false;
  };

  return (
    <>
      {miniBanners.map((miniBanner, index) => {
        if (bannersActive.includes(miniBanner)) return null;
        return (
          <div key={miniBanner + index}>
            <img
              src={dropOpen ? json.getMini(miniBanner) : ""}
              alt={miniBanner + "-mini-banner"}
              id={`mini-${index}`}
              onClick={() => onSelect(miniBanner)}
            />
            <Tooltip
              placement="right"
              isOpen={isToolTipOpen(`mini-${index}`)}
              target={`mini-${index}`}
              toggle={() => toggle(`mini-${index}`)}
              style={{ backgroundColor: "#282c34" }}
            >
              {json.getTitle(miniBanner)}
            </Tooltip>
          </div>
        );
      })}
    </>
  );
};

const DropdownBanner = ({ changeBanner, bannersActive }) => {
  const [dropOpen, setDropOpen] = useState(false);

  const toggleDrop = (miniBanner) => {
    if (miniBanner) changeBanner(miniBanner);
    setDropOpen((prevState) => !prevState);
  };

  return (
    <div className="drop-down">
      <Dropdown isOpen={dropOpen} toggle={() => toggleDrop(null)} size="sm">
        <DropdownToggle
          tag="div"
          data-toggle="dropdown"
          aria-expanded={dropOpen}
          className="custom-drop"
          style={{
            height: "30px",
            width: "120px",
            backgroundImage: "url(./assets/img/misc/theme.webp)",
            backgroundSize: "120px  30px",
            backgroundRepeat: "no-repeat",
          }}
        />
        <DropdownMenu style={{ backgroundColor: "rgba(50, 50, 50, 0.5)" }}>
          <MiniTooltip
            miniBanners={allBannersAbbr.filter((banner) => {
              return !banner.includes("_ei");
            })}
            onSelect={toggleDrop}
            bannersActive={bannersActive}
            dropOpen={dropOpen}
          />
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropdownBanner;
