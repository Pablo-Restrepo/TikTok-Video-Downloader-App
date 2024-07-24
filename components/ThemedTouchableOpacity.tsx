import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTouchableOpacityProps = TouchableOpacityProps & {
    lightColor?: string;
    darkColor?: string;
};

export function ThemedTouchableOpacity({
    style,
    lightColor,
    darkColor,
    ...rest
}: ThemedTouchableOpacityProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

    return (
        <TouchableOpacity
            style={[
                { backgroundColor },
                styles.default,
                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        backgroundColor: '#007BFF',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
});
