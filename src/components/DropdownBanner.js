import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, Tooltip } from "reactstrap";

const MiniTooltip = ({ miniBanners, activeMinis, onSelect }) => {
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
        const short = miniBanner.split("/").pop().split(".")[0];
        if (activeMinis.includes(miniBanner)) return null;
        return (
          <div key={miniBanner + index}>
            <img
              src={miniBanner}
              alt={miniBanner}
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
              {short}
            </Tooltip>
          </div>
        );
      })}
    </>
  );
};

const DropdownBanner = ({ miniBanners, changeBanner, index, activeMinis }) => {
  const [dropOpen, setDropOpen] = useState(false);

  const toggleDrop = (miniBanner) => {
    if (miniBanner) changeBanner(miniBanner, index);
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
            backgroundImage: "url(./img/misc/choose.png)",
            backgroundSize: "120px  30px",
            backgroundRepeat: "no-repeat",
          }}
        />
        <DropdownMenu style={{ backgroundColor: "rgba(222, 219, 208, 0.5)" }}>
          <MiniTooltip
            miniBanners={miniBanners}
            activeMinis={activeMinis}
            onSelect={toggleDrop}
          />
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropdownBanner;
