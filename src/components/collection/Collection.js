import "../../css/collection.css";
import React, { useEffect, useState } from "react";
import {
  allWeapons,
  allChars,
  JSON as CustomJSON,
} from "../../classes/Constants";
import { Tooltip } from "reactstrap";
import Filter from "./Filter";

const Collections = () => {
  document.body.style.background = "rgb(235, 235, 235)";

  const [status, setStatus] = useState({
    showUnlocked: true,
    showLocked: false,
  });

  const [tooltip, setTooltip] = useState({});

  const toggleTooltip = (targetName) => {
    if (!tooltip[targetName]) {
      setTooltip({
        ...tooltip,
        [targetName]: {
          tooltipOpen: true,
        },
      });
    } else {
      setTooltip({
        ...tooltip,
        [targetName]: {
          tooltipOpen: !tooltip[targetName].tooltipOpen,
        },
      });
    }
  };

  const isToolTipOpen = (targetName) => {
    return tooltip[targetName] ? tooltip[targetName].tooltipOpen : false;
  };

  const unlocked = JSON.parse(sessionStorage.getItem("unlocked")) || [];

  const locked = allChars
    .concat(allWeapons)
    .filter((item) => !unlocked.includes(item));

  // const filtered = (type) => {
  //   switch (activeTab) {
  //     case 2:
  //       return type.filter((item) => CustomJSON.isChar(item));
  //     case 3:
  //       return type.filter((item) => !CustomJSON.isChar(item));
  //     default:
  //       return type.filter((item) => item);
  //   }
  // };

  const filters = {
    order: [],
    char: [],
    weapon: [],
    display: [status.showUnlocked, status.showLocked],
  };

  const filterChanges = {
    order: [],
    char: [],
    weapon: [],
    display: [
      () => setStatus({ ...status, showUnlocked: !status.showUnlocked }),
      () => setStatus({ ...status, showLocked: !status.showLocked }),
    ],
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const getWidth = (width) =>
    window.innerWidth > 1280 ? width : windowWidth / (1280 / width);

  const getHeight = (height, width) =>
    window.innerWidth > 1280 ? height : (getWidth(width) * height) / width;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const resize = {
    windowWidth,
    height: (window.innerHeight / window.innerWidth) * windowWidth,
    getWidth,
    getHeight,
  };

  return (
    <section className="content-section">
      <section id="collection-content">
        <div style={{ visibility: "hidden" }}>
          <Filter
            filters={filters}
            filterChanges={filterChanges}
            resize={resize}
          />
        </div>
        <section id="main-collection-section">
          {status.showUnlocked ? (
            unlocked
              .filter((item) => item)
              .map((item, index) => {
                return (
                  <div
                    className="unlocked"
                    key={item + index}
                    stars={CustomJSON.getStars(item)}
                    style={{ margin: `${resize.getWidth(4.75)}px` }}
                  >
                    <div
                      id={`tooltip-${index}`}
                      style={{
                        backgroundImage: `url(${CustomJSON.getThumb(item)})`,
                        height: `${resize.getWidth(106)}px`,
                        width: `${resize.getWidth(106)}px`,
                        backgroundSize: `${resize.getWidth(
                          106
                        )}px ${resize.getWidth(106)}px`,
                      }}
                      stars={CustomJSON.getStars(item)}
                    />
                    <Tooltip
                      placement="right"
                      isOpen={isToolTipOpen(`tooltip-${index}`)}
                      target={`tooltip-${index}`}
                      toggle={() => toggleTooltip(`tooltip-${index}`)}
                      style={{
                        backgroundColor: "#282c34",
                        color: "antiquewhite",
                      }}
                    >
                      {CustomJSON.getName(item)}
                    </Tooltip>
                  </div>
                );
              })
          ) : (
            <></>
          )}
          {status.showLocked ? (
            locked
              .filter((item) => item)
              .map((item, index) => {
                return (
                  <div
                    key={item + index}
                    style={{ margin: `${resize.getWidth(4.75)}px` }}
                  >
                    <div
                      id={`tooltip-${index + unlocked.length}`}
                      style={{
                        backgroundImage: `url(${CustomJSON.getThumb(item)})`,
                        height: `${resize.getWidth(106)}px`,
                        width: `${resize.getWidth(106)}px`,
                        backgroundSize: `${resize.getWidth(
                          106
                        )}px ${resize.getWidth(106)}px`,
                        filter: "brightness(0)",
                      }}
                    />
                    <Tooltip
                      placement="right"
                      isOpen={isToolTipOpen(
                        `tooltip-${index + unlocked.length}`
                      )}
                      target={`tooltip-${index + unlocked.length}`}
                      toggle={() =>
                        toggleTooltip(`tooltip-${index + unlocked.length}`)
                      }
                      style={{
                        backgroundColor: "#282c34",
                        color: "antiquewhite",
                      }}
                    >
                      {CustomJSON.getName(item)}
                    </Tooltip>
                  </div>
                );
              })
          ) : (
            <></>
          )}
        </section>
        <Filter
          filters={filters}
          filterChanges={filterChanges}
          resize={resize}
        />
      </section>
    </section>
  );
};

export default Collections;

/* <div className="collection locked">
        {locked.map((item, index) => {
          return (
            <div key={item + index}>
              <div
                style={{
                  backgroundImage: `url(${CustomJSON.getThumb(item)})`,
                  height: "106px",
                  width: "106px",
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="collection unlocked">
        {unlocked
          .filter((item) => CustomJSON.isChar(item))
          .map((char, index) => {
            return (
              <div key={char + index}>
                <div
                  style={{
                    backgroundImage: `url(${CustomJSON.getThumb(char)})`,
                    height: "106px",
                    width: "106px",
                  }}
                  stars={CustomJSON.getStars(char)}
                />
              </div>
            );
          })}
      </div>
      <div className="collection locked">
        {allChars
          .filter((char) => !unlocked.includes(char))
          .map((char, index) => {
            return (
              <div key={char + index}>
                <div
                  style={{
                    backgroundImage: `url(${CustomJSON.getThumb(char)})`,
                    height: "106px",
                    width: "106px",
                  }}
                />
              </div>
            );
          })}
      </div>

      <div className="collection unlocked">
        {unlocked
          .filter((item) => !CustomJSON.isChar(item))
          .map((weapon, index) => {
            return (
              <div key={weapon + index}>
                <div
                  style={{
                    backgroundImage: `url(${CustomJSON.getThumb(weapon)})`,
                    height: "106px",
                    width: "106px",
                  }}
                  stars={CustomJSON.getStars(weapon)}
                />
              </div>
            );
          })}
      </div>
      <div className="collection locked">
        {allWeapons
          .filter((weapon) => !unlocked.includes(weapon))
          .map((weapon, index) => {
            return (
              <div key={weapon + index}>
                <div
                  style={{
                    backgroundImage: `url(${CustomJSON.getThumb(weapon)})`,
                    height: "106px",
                    width: "106px",
                  }}
                />
              </div>
            );
          })}
      </div> */
