import React from "react";

const sizeClasses = {
  txtPoppinsRegular10: "font-normal font-poppins",
  txtPoppinsBold16: "font-bold font-poppins",
  txtPoppinsBold8: "font-bold font-poppins",
  txtPoppinsRegular14: "font-normal font-poppins",
  txtPoppinsRegular16: "font-normal font-poppins",
};

const Text = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
