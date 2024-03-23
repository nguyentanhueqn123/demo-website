import React, { useState, useEffect } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

interface CheckBoxProps {
  id: string;
  className?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  className,
  checked = false,
  onChange,
  label,
  id,
  ...rest
}) => {
  const [value, setValue] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <div className={classnames("flex items-center my-1", className)}>
      <input
        {...rest}
        id={id}
        type="checkbox"
        value={value.toString()}
        checked={isChecked}
        className="custom-checkbox border-2 border-blue2 mr-2 rounded"
        onChange={(e) => {
          if (onChange) onChange(e.target.checked);
          setValue(e.target.checked);
        }}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

CheckBox.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
};

export default CheckBox;
