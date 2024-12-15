import React from 'react'
import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';

const Button = (props: any) => {
    const filledBgColor = props.color || "#ffde86";
    const outlinedColor = "#222222";
    const bgColor = props.filled ? filledBgColor : outlinedColor;
    const textColor =props.filled ? "#222222" : "#FFFFFF";

    return (
      <TouchableOpacity style={{
        ...styles.button,
        ...{backgroundColor: bgColor},
        ...props.style
      }} onPress={props.onPress}>
        <Text style={{fontSize: 18, ...{color: textColor}, fontWeight: 'bold'}}>
            {props.title}
        </Text>
      </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button:{
        paddingBottom: 16,
        paddingVertical: 10,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Button;