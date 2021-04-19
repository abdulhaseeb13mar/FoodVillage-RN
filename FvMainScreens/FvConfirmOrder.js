/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import WrapperScreen from '../FvFrequentUsage/FvWrapperScreen';
import {View, Text} from 'react-native';
import {H_W} from '../FvFrequentUsage/FvResponsive';
import {colors} from '../FvFrequentUsage/FvColor';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import NavigationRef from '../FvFrequentUsage/FvRefNavigation';
import {connect} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {FvresetCart} from '../FvStateManagement/FvActions';

function FvConfirmOrder(props) {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const ResetAndGoHome = () => {
    props.FvresetCart();
    NavigationRef.NavigateAndReset('FvHome');
  };
  return (
    <WrapperScreen
      statusColor={`rgba(${colors.rgb_Primary},0.9)`}
      style={{
        backgroundColor: `rgba(${colors.rgb_Primary},0.9)`,
      }}>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: -H_W.width * 0.06,
            height: HEIGHT * 0.02,
          },
          shadowOpacity: 1,
          shadowRadius: 14.78,
        }}>
        <LinearGradient
          style={{
            zIndex: -1,
            width: H_W.width * 1,
            height: H_W.width * 1,
            borderRadius: H_W.width * 0.6,
            position: 'absolute',
            top: HEIGHT * 0.2,
            left: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          colors={[
            `rgba(${colors.rgb_Primary},0.3)`,
            `rgba(${colors.rgb_Primary},0.3)`,
          ]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <View
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: -H_W.width * 0.06,
                height: HEIGHT * 0.02,
              },
              shadowOpacity: 0.1,
              shadowRadius: 14.78,
            }}>
            <LinearGradient
              style={{
                zIndex: -1,
                width: H_W.width * 0.9,
                height: H_W.width * 0.9,
                borderRadius: H_W.width * 0.6,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              colors={[
                `rgba(${colors.rgb_Primary},0.5)`,
                `rgba(${colors.rgb_Primary},0.5)`,
              ]}>
              <LinearGradient
                style={{
                  zIndex: -1,
                  width: H_W.width * 0.7,
                  height: H_W.width * 0.7,
                  borderRadius: H_W.width * 0.6,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                colors={[
                  `rgba(${colors.rgb_Primary},0.5)`,
                  `rgba(${colors.rgb_Primary},0.5)`,
                ]}
              />
            </LinearGradient>
          </View>
        </LinearGradient>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FontAwesome5 name="couch" size={H_W.width * 0.4} color="white" />
        <Text
          style={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: 30,
            textAlign: 'center',
            width: H_W.width * 0.9,
            marginTop: 15,
          }}>
          WE HAVE RECEIVED YOUR ORDER
        </Text>
        <Button
          onPress={ResetAndGoHome}
          title="Shop more"
          buttonStyle={{
            backgroundColor: 'white',
            width: H_W.width * 0.6,
            borderRadius: 10,
          }}
          icon={
            <FontAwesome
              name="chevron-right"
              color={colors.primary}
              size={19}
              style={{marginLeft: H_W.width * 0.02}}
            />
          }
          iconRight
          raised
          titleStyle={{
            fontSize: 20,
            fontWeight: 'bold',
            borderRadius: 10,
            color: colors.primary,
          }}
          containerStyle={{marginTop: 15, borderRadius: 10}}
        />
      </View>
    </WrapperScreen>
  );
}

export default connect(null, {FvresetCart})(React.memo(FvConfirmOrder));
