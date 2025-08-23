import React from "react";

function TableCell({
  children,
  align = "left",
  component = "td",
  scope,
  colSpan = 1,
  rowSpan = 1,
  sx = {},
  style = {},
  ...props
}) {
  const Component = component;
  const textAlign =
    align === "right" ? "right" : align === "center" ? "center" : "left";

  const defaultStyle = {
    ...style,
    padding: "10px 16px",
    textAlign,
    fontWeight: component === "th" ? 600 : 400,
    color: component === "th" ? "white" : "black",
    borderBottom: "1px solid #e0e0e0",
    ...sx,
  };

  return (
    <Component
      style={defaultStyle}
      scope={scope}
      colspan={colSpan.toString()}
      rowspan={rowSpan.toString()}
      {...props}
    >
      {children}
    </Component>
  );
}

export default TableCell;
