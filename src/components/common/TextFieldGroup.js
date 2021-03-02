import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

function TextFieldGroup({
  name,
  placeholder,
  value,
  type,
  label,
  error,
  info,
  onChange,
  disabled,
  checked,
}) {
  return type === "hidden" ? (
    <input type={type} name={name} value={value} onChange={onChange} />
  ) : (
    <div className="form-group">
      {label === "" ? "" : <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": { error },
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.string,
  checked: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TextFieldGroup.defaultProps = {
  type: "text",
};

export default TextFieldGroup;
