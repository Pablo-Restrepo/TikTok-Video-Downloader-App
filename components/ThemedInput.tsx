import React from 'react';
import { TextInput, type TextInputProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ColorValue } from 'react-native';

function makeColorMoreTransparent(color: ColorValue, alpha: number) {
  const hex = typeof color === 'string' ? color.replace('#', '') : '000000';
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export type ThemedInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedInput({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'border');
  const placeholderColor = makeColorMoreTransparent(color, 0.5);

  return (
    <TextInput
      style={[
        { color },
        styles.default,
        { borderColor },
        style,
      ]}
      placeholderTextColor={placeholderColor}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    textAlign: 'center',
  },
});
