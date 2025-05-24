import React from "react";
import PropTypes from "prop-types";

function Dialog({ open, onClose, title, children, actions, maxWidth = 500 }) {
  if (!open) return null;

  const backdropStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const dialogStyle = {
    backgroundColor: "#fff",
    borderRadius: 8,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    maxWidth: maxWidth,
    width: "90%",
    padding: "1.5rem",
    zIndex: 1001,
    position: "relative",
  };

  const titleStyle = {
    fontSize: "1.25rem",
    fontWeight: 600,
    marginBottom: "1rem",
    color: "#333",
  };

  const contentStyle = {
    marginBottom: "1rem",
    fontSize: "1rem",
    color: "#555",
  };

  const actionsStyle = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.5rem",
    marginTop: "1rem",
  };

  return (
    <div style={backdropStyle} onClick={onClose}>
      <div style={dialogStyle} onClick={(e) => e.stopPropagation()}>
        {title && <div style={titleStyle}>{title}</div>}
        <div style={contentStyle}>{children}</div>
        {actions && <div style={actionsStyle}>{actions}</div>}
      </div>
    </div>
  );
}

Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  actions: PropTypes.node,
  maxWidth: PropTypes.number,
};

export default Dialog;
