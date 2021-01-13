import React from "react";

const Checkbox = ({ checked, id, text, onChange, resize }) => {
  return (
    <label
      className={`checkbox ${checked ? "active" : ""}`}
      style={{
        width:
          resize.windowWidth <= 425 ? undefined : `${resize.getWidth(140)}px`,
        height:
          resize.windowWidth <= 425
            ? undefined
            : `${resize.getHeight(50, 140)}px`,
      }}
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        style={{
          width:
            resize.windowWidth <= 425
              ? undefined
              : `${checked ? resize.getWidth(10) : resize.getWidth(20)}px`,
          height:
            resize.windowWidth <= 425
              ? undefined
              : `${checked ? resize.getWidth(18) : resize.getWidth(20)}px`,
        }}
      />
      <p
        style={{
          fontSize:
            resize.windowWidth <= 425 ? undefined : `${resize.getWidth(16)}px`,
          marginLeft: `${
            checked ? resize.getWidth(9.6) : resize.getWidth(6.4)
          }px`,
        }}
      >
        {text}
      </p>
    </label>
  );
};

export default Checkbox;
