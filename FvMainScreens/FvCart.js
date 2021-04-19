/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {
  FvremoveCartAction,
  FvaddCartAction,
  FvsetCurrentProductAction,
  FvsetFavAction,
  FvremoveFavAction,
  FvresetCart,
} from '../FvStateManagement/FvActions';
import WrapperScreen from '../FvFrequentUsage/FvWrapperScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../FvFrequentUsage/FvColor';
import {H_W} from '../FvFrequentUsage/FvResponsive';
import RefNavigation from '../FvFrequentUsage/FvRefNavigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import Loop from '../FvFrequentUsage/FvFlatList';
import LinearGradient from 'react-native-linear-gradient';
import FvHeader from '../FvFrequentUsage/FvHeader';
import {FvVerticalTile} from './FvHome';
import ItemCounterWrapper from '../FvFrequentUsage/FvItemCounterWrapper';

export const Cart = (props) => {
  useEffect(() => {
    convertObjectToArray();
  }, [props.FvCart]);

  const [HorizontalCartArray, setHorizontalCartArray] = useState([]);

  const convertObjectToArray = () => {
    const CartArray = Object.keys(props.FvCart);
    let UsArr = [];
    CartArray.forEach((element) => {
      UsArr.push(props.FvCart[element]);
    });
    setHorizontalCartArray(UsArr);
  };

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const FvGoBack = () => RefNavigation.GoBack();

  const FvGoToSingleProduct = (item) => {
    props.FvsetCurrentProductAction(item);
    RefNavigation.Navigate('FvSP');
  };

  const FvinfoScreen = () => RefNavigation.Navigate('FvContact');

  return (
    <WrapperScreen
      statusColor={`rgba(${colors.rgb_Primary},0.2)`}
      style={{
        backgroundColor: `rgba(${colors.rgb_Primary},0.2)`,
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
          position: 'absolute',
          bottom: -HEIGHT * 0.1,
          left: -H_W.width * 0.4,
          zIndex: -1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LinearGradient
          style={{
            width: H_W.width * 1.2,
            height: H_W.width * 1.2,
            borderRadius: H_W.width * 0.6,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          colors={[
            `rgba(${colors.rgb_Primary},0.0)`,
            `rgba(${colors.rgb_Primary},0.1)`,
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
                width: H_W.width * 1.05,
                height: H_W.width * 1.05,
                borderRadius: H_W.width * 0.6,
                marginTop: H_W.width * 0.15,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              colors={[
                `rgba(${colors.rgb_Primary},0.0)`,
                `rgba(${colors.rgb_Primary},0.5)`,
              ]}>
              <LinearGradient
                style={{
                  zIndex: -1,
                  width: H_W.width * 0.9,
                  height: H_W.width * 0.9,
                  borderRadius: H_W.width * 0.6,
                  marginTop: H_W.width * 0.15,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                colors={[
                  `rgba(${colors.rgb_Primary},0.0)`,
                  `rgba(${colors.rgb_Primary},0.5)`,
                ]}
              />
            </LinearGradient>
          </View>
        </LinearGradient>
      </View>
      <FvHeader
        leftIcon={FontAwesome}
        leftIconName="chevron-left"
        leftIconColor={colors.primary}
        leftIconAction={FvGoBack}
        Title={<Text style={{fontSize: 22}}>Cart</Text>}
      />
      <Loop
        numColumns={2}
        horizontal={false}
        data={HorizontalCartArray}
        renderItem={({item}) => (
          <ItemCounterWrapper
            style={{marginVertical: HEIGHT * 0.025}}
            counterColor={colors.primary}
            counterContentColor="white"
            item={item}
            position="bottom"
            Counterlength={H_W.width * 0.2}>
            <FvVerticalTile
              item={item}
              FvGoToSingleProduct={FvGoToSingleProduct}
              FvCart={props.FvCart}
            />
          </ItemCounterWrapper>
        )}
      />
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: H_W.width * 0.05,
            paddingVertical: HEIGHT * 0.007,
            marginBottom: HEIGHT * 0.015,
            borderTopWidth: 1,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              paddingHorizontal: H_W.width * 0.02,
              paddingVertical: HEIGHT * 0.008,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
              }}>
              Total Price
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              paddingHorizontal: H_W.width * 0.02,
              paddingVertical: HEIGHT * 0.008,
              borderRadius: 10,
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              ${props.FvTotal}
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Button
            onPress={FvinfoScreen}
            disabled={props.FvTotalItems === 0}
            title="Checkout"
            buttonStyle={{
              backgroundColor: colors.primary,
              paddingVertical: HEIGHT * 0.015,
              borderRadius: 10,
            }}
            containerStyle={{width: '92%', borderRadius: 10}}
          />
        </View>
      </View>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => ({
  FvCart: state.FvCartReducer.items,
  FvTotal: state.FvCartReducer.totalAmount,
  FvFavs: state.FvToggleFav,
  FvTotalItems: state.FvCartReducer.totalItems,
});

export default connect(mapStateToProps, {
  FvremoveCartAction,
  FvaddCartAction,
  FvsetCurrentProductAction,
  FvsetFavAction,
  FvremoveFavAction,
  FvresetCart,
})(Cart);
