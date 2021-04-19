/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {H_W} from '../FvFrequentUsage/FvResponsive';
import WrapperScreen from '../FvFrequentUsage/FvWrapperScreen';
import {connect} from 'react-redux';
import {colors} from '../FvFrequentUsage/FvColor';
import NavigationRef from '../FvFrequentUsage/FvRefNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  FvremoveFavAction,
  FvsetFavAction,
  FvaddCartAction,
  FvremoveCartAction,
  FvsetCurrentProductAction,
} from '../FvStateManagement/FvActions';
import Data from '../FvData';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FastImage from 'react-native-fast-image';
import FvHeader from '../FvFrequentUsage/FvHeader';

function SingleProduct(props) {
  useEffect(() => {
    getTheCategory();
    checkIfFav();
  }, []);
  const FvProduct = props.FvProduct;
  const [fav, setFav] = useState(false);
  const [productCategory, setProductCategory] = useState('');
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const getTheCategory = () => {
    for (let Fv = 0; Fv < Data.Category.length; Fv++) {
      if (Data.Category[Fv].id === FvProduct.categoryid) {
        setProductCategory(Data.Category[Fv].category);
        break;
      }
    }
  };

  const checkIfFav = () => {
    for (let Fv = 0; Fv < props.FvFavs.length; Fv++) {
      if (props.FvFavs[Fv].id === FvProduct.id) {
        setFav(true);
        break;
      }
    }
  };

  const toggleFav = () => {
    fav
      ? props.FvremoveFavAction(FvProduct.id)
      : props.FvsetFavAction(FvProduct);
    setFav(!fav);
  };

  const FvAddToCart = () => {
    props.FvaddCartAction({...FvProduct});
  };

  const FvRemoveFromCart = () => {
    props.FvCart[FvProduct.id] !== undefined &&
      props.FvremoveCartAction(FvProduct);
  };

  const FvGotoCart = () => NavigationRef.Navigate('FvContact');
  const FvGoBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen
      style={{backgroundColor: `rgba(${colors.rgb_Primary},0.45)`}}
      statusColor={`rgba(${colors.rgb_Primary},0.45)`}>
      <FvHeader
        leftIcon={SimpleLineIcons}
        leftIconName="arrow-left"
        leftIconAction={FvGoBack}
        rightIcon={SimpleLineIcons}
        rightIconAction={FvGotoCart}
        rightIconName="handbag"
      />
      <View
        style={{
          flex: 1,
          marginTop: HEIGHT * 0.25,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          backgroundColor: 'rgba(255,255,255,0.7)',
          marginBottom: -insets.bottom,
          paddingBottom: insets.bottom,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{alignItems: 'center'}}>
          <FastImage
            source={FvProduct.image}
            style={{
              width: H_W.width * 0.8,
              height: HEIGHT * 0.4,
              marginTop: -HEIGHT * 0.24,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.44,
              shadowRadius: 6.27,
              overflow: 'visible',
            }}
            resizeMode="contain"
          />
          <View
            style={{
              width: H_W.width,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: H_W.width * 0.05,
              marginTop: HEIGHT * 0.01,
            }}>
            <Text
              style={{
                fontFamily: 'GillSans-Light',
                fontSize: 13.5,
                paddingHorizontal: H_W.width * 0.01,
              }}>
              {productCategory.toUpperCase()}
            </Text>
            <Text>Price</Text>
          </View>
          <View
            style={{
              width: H_W.width,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: H_W.width * 0.05,
              marginTop: HEIGHT * 0.005,
            }}>
            <Text
              style={{
                fontFamily: 'DamascusMedium',
                fontSize: 23,
                width: H_W.width * 0.65,
              }}>
              {FvProduct.name.toUpperCase()}
            </Text>
            <Text
              style={{
                fontFamily: 'DamascusMedium',
                fontSize: 20,
              }}>
              ${FvProduct.price}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'DamascusLight',
              fontSize: 15,
              marginTop: HEIGHT * 0.02,
              paddingHorizontal: H_W.width * 0.05,
            }}>
            {FvProduct.dis}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: H_W.width,
            paddingHorizontal: H_W.width * 0.06,
          }}>
          <TouchableOpacity
            onPress={toggleFav}
            style={{
              borderWidth: 1,
              borderColor: colors.darkGray,
              paddingHorizontal: H_W.width * 0.03,
              paddingVertical: HEIGHT * 0.01,
              borderRadius: 10,
            }}>
            <AntDesign
              name={fav ? 'heart' : 'hearto'}
              size={30}
              color={colors.primary}
            />
          </TouchableOpacity>
          {props.FvCart[FvProduct.id] !== undefined ? (
            <View
              style={{
                width: H_W.width * 0.65,
                height: HEIGHT * 0.063,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'space-evenly',
                flexDirection: 'row',
                backgroundColor: `rgba(${colors.rgb_Primary},0.7)`,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,
              }}>
              <TouchableOpacity
                onPress={FvRemoveFromCart}
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: H_W.width * 0.015,
                  paddingVertical: HEIGHT * 0.004,
                  borderRadius: 8,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.27,
                  shadowRadius: 4.65,
                }}>
                <AntDesign name="minus" size={22} />
              </TouchableOpacity>
              <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
                {props.FvCart[FvProduct.id].added}
              </Text>
              <TouchableOpacity
                onPress={FvAddToCart}
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: H_W.width * 0.015,
                  paddingVertical: HEIGHT * 0.004,
                  borderRadius: 8,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.27,
                  shadowRadius: 4.65,
                }}>
                <AntDesign name="plus" size={22} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={FvAddToCart}
              style={{
                width: H_W.width * 0.65,
                height: HEIGHT * 0.059,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: `rgba(${colors.rgb_Primary},0.7)`,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                Add to cart
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => {
  return {
    FvProduct: state.FvCrntPrdtReducer,
    FvFavs: state.FvToggleFav,
    totalItems: state.FvCartReducer.totalItems,
    FvCart: state.FvCartReducer.items,
  };
};

export default connect(mapStateToProps, {
  FvsetFavAction,
  FvremoveFavAction,
  FvremoveCartAction,
  FvsetCurrentProductAction,
  FvaddCartAction,
})(React.memo(SingleProduct));
