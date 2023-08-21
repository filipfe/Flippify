import React from "react";
import { Text, TextProps } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../../const/styles";

const GradientText = (props: TextProps) => {
  return (
    <MaskedView maskElement={<Text {...props}>{props.children}</Text>}>
      <LinearGradient
        colors={linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text {...props} style={[props.style, { opacity: 0 }]}>
          {props.children}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
