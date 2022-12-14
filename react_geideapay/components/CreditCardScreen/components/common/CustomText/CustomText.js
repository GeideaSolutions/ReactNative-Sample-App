import React from "react";
import { Text } from "react-native";

const CustomText = ({
  style,
  bold = false,
  light = false,
  children,
  onPress,
  selectable = false,
}) => {

  return (
    <Text
      style={[style]}
      onPress={onPress}
      selectable={selectable}
    >
      {children}
    </Text>
  );
};

export default CustomText;
