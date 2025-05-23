function Table({ children, sx = {}, style = {}, ...props }) {
  const defaultStyle = {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: 650,
    fontSize: 14,
    color: "#424242",
    ...sx,
    ...style,
  };
  return (
    <table style={defaultStyle} {...props}>
      {children}
    </table>
  );
}

export default Table;
