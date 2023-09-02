import React from 'react';
import {Text} from '../../components';
import {colors} from '../../constants';
import {ScreenContainer} from '../../wrappers';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet} from 'react-native';
import {NetworkProps} from '../../navigation';

export default function Network({navigation, route}: NetworkProps) {
  return (
    <ScreenContainer style={styles.container}>
      <Icon
        style={styles.icon}
        name="wifi-off"
        size={150}
        color={colors.gray}
      />
      <Text size={32} color={colors.black} center style={styles.title}>
        Ağ Bağlantısı Yok
      </Text>
      <Text size={24} color={colors.black} center>
        Lütfen internet bağlantınızı kontrol ediniz.
      </Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {justifyContent: 'center', alignItems: 'center'},
  icon: {alignSelf: 'center'},
  title: {marginBottom: 20},
});
