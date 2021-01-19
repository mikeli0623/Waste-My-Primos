import "../../css/collection.css";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import Info from "./Info";
import CollectionIcons from "./CollectionIcons";

const Collections = () => {
  document.body.style.background = "rgb(235, 235, 235)";

  const [stash, setStash] = useState(
    JSON.parse(sessionStorage.getItem("stash")) || []
  );

  const [sortOrder, setSortOrder] = useState(true);

  const [searchItem, setSearchItem] = useState("");

  const [activeFilters, setActiveFilters] = useState([
    "Default",
    "Anemo",
    "Cryo",
    "Electro",
    "Geo",
    "Hydro",
    "Pyro",
    "Sword",
    "Claymore",
    "Bow",
    "Polearm",
    "Catalyst",
    "5-Star",
    "4-Star",
    "3-Star",
  ]);

  const [activeItem, setActiveItem] = useState(
    stash.filter((item) => item.count > 0).length !== 0
      ? stash.filter((item) => item.count > 0)[0]
      : stash[0]
  );

  useEffect(() => {
    let filtersClone = [...activeFilters];
    let empty = true;
    for (const item of stash) {
      if (item.count !== 0) {
        empty = false;
        break;
      }
    }
    if (empty) filtersClone.push("Locked");
    else filtersClone.push("Unlocked");
    setActiveFilters([...filtersClone]);
  }, []);

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
        <Info item={activeItem} resize={resize} />
        <CollectionIcons
          activeFilters={activeFilters}
          stash={stash}
          setStash={setStash}
          sortOrder={sortOrder}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          searchItem={searchItem}
          resize={resize}
        />
        <Filter
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          setSearchItem={setSearchItem}
          resize={resize}
        />
      </section>
    </section>
  );
};

export default Collections;
