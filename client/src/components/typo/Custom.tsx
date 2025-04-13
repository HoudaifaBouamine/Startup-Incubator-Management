import React, { JSX } from "react";
import {
Body1,
Body1Strong,
Body1Stronger,
Body2,
Caption1,
Caption1Strong,
Caption1Stronger,
Caption2,
Caption2Strong,
Display,
LargeTitle,
Subtitle1,
Subtitle2,
Subtitle2Stronger,
Title1,
Title2,
Title3,
typographyStyles,
} from "@fluentui/react-components";

type CustomTextProps = {
children: React.ReactNode;
className?: string;
as?: keyof JSX.IntrinsicElements;
};

// Define body2Strong style directly here
const body2StrongStyle = {
...typographyStyles.body2,
fontWeight: "600", // or "500" if you prefer
};

// Custom Body2Strong component
export const Body2Strong = ({ children, className, as = "span" }: CustomTextProps) => {
const Tag = as;
return (
    <Tag style={body2StrongStyle} className={className}>
    {children}
    </Tag>
);
};

// Export all Fluent components and Body2Strong
export {
Body1,
Body1Strong,
Body1Stronger,
Body2,
Caption1,
Caption1Strong,
Caption1Stronger,
Caption2,
Caption2Strong,
Display,
LargeTitle,
Subtitle1,
Subtitle2,
Subtitle2Stronger,
Title1,
Title2,
Title3,
};
