import React, { ReactNode } from "react";
import classnames from "classnames";

interface AdminContainerProps {
  className?: string;
  children: ReactNode;
}

const AdminContainer: React.FC<AdminContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={classnames("w-full md:pl-[271px] min-h-screen", className)}>
      <div className="py-25 max-w-screen-2xl mt-[70px]">{children}</div>
    </div>
  );
};

export default AdminContainer;
