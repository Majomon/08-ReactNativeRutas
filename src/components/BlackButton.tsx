import React from 'react';
import {
  Text,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
} from 'react-native';

interface Props {
  title: string;
  onPres: () => void;
  style?: StyleProp<ViewStyle>;
}

export const BlackButton = ({title, onPres, style = {}}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPres}
      style={{...(style as any), ...styles.blackButton}}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  blackButton: {
    width: 200,
    height: 45,
    backgroundColor: 'black',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    //Sombras
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    elevation: 10,
    marginVertical:5
  },
  btnText: {
    color: 'white',
    fontSize: 18,
  },
});
