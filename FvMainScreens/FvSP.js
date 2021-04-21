/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {H_W} from '../FvFrequentUsage/FvResponsive';
import WrapperScreen from '../FvFrequentUsage/FvWrapperScreen';
import {connect} from 'react-redux';
import {colors} from '../FvFrequentUsage/FvColor';
import NavigationRef from '../FvFrequentUsage/FvRefNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  FvremoveFavAction,
  FvsetFavAction,
  FvaddCartAction,
  FvremoveCartAction,
  FvsetCurrentProductAction,
} from '../FvStateManagement/FvActions';
import Data from '../FvData';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import FvHeader from '../FvFrequentUsage/FvHeader';
import StarRating from '../starRating';

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
    for (let Fv = 0; Fv < Data.category.length; Fv++) {
      if (Data.category[Fv].id === FvProduct.category) {
        setProductCategory(Data.category[Fv].category);
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
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <ScrollView bounces={false}>
        <FvHeader
          leftIcon={Feather}
          leftIconName="corner-up-left"
          leftIconAction={FvGoBack}
        />
        <View style={{alignItems: 'center'}}>
          <FastImage
            source={FvProduct.image}
            style={{
              width: H_W.width * 0.8,
              height: HEIGHT * 0.35,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 4.65,
            }}
            resizeMode="contain"
          />
        </View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 23,
            marginLeft: H_W.width * 0.04,
            width: H_W.width * 0.8,
            marginTop: HEIGHT * 0.02,
          }}>
          {FvProduct.name}
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 17,
            color: colors.lightGrey3,
            marginLeft: H_W.width * 0.04,
            width: H_W.width * 0.8,
            marginTop: HEIGHT * 0.01,
          }}>
          {productCategory}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: H_W.width * 0.04,
            marginTop: HEIGHT * 0.01,
          }}>
          <StarRating rating={FvProduct.rating} size={H_W.width * 0.22} />
          <Text
            style={{
              marginLeft: H_W.width * 0.05,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {FvProduct.rating}
          </Text>
        </View>
        <Text
          style={{
            marginLeft: H_W.width * 0.04,
            marginTop: HEIGHT * 0.02,
            fontSize: 15.5,
            width: H_W.width * 0.9,
          }}>
          {FvProduct.description}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: H_W.width * 0.04,
            marginTop: HEIGHT * 0.02,
          }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: H_W.width * 0.027,
              borderRadius: 15,
              paddingVertical: HEIGHT * 0.015,
              backgroundColor: colors.secondary,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}>
            <FontAwesome
              name={fav ? 'heart' : 'heart-o'}
              color={colors.primary}
              size={27}
            />
          </TouchableOpacity>
          <View
            style={{
              width: H_W.width * 0.45,
              height: HEIGHT * 0.063,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              // onPress={FnRemoveFromCart}
              style={{
                backgroundColor: colors.secondary,
                paddingHorizontal: H_W.width * 0.015,
                paddingVertical: HEIGHT * 0.007,
                borderRadius: 8,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
              }}>
              <AntDesign name="minus" size={22} color={colors.primary} />
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', fontSize: 24, color: 'black'}}>
              {/* {props.FnCart[FvProduct.id].added} */}
              10
            </Text>
            <TouchableOpacity
              // onPress={FnAddToCart}
              style={{
                backgroundColor: colors.secondary,
                paddingHorizontal: H_W.width * 0.015,
                paddingVertical: HEIGHT * 0.007,
                borderRadius: 8,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
              }}>
              <AntDesign name="plus" size={22} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: HEIGHT * 0.03,
            marginBottom: HEIGHT * 0.02,
            overflow: 'visible',
          }}>
          <View
            style={{
              width: H_W.width * 0.28,
              height: H_W.width * 0.28,
              backgroundColor: colors.secondary,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: H_W.width * 0.02,
              paddingVertical: HEIGHT * 0.01,
              borderRadius: H_W.width * 0.16,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.37,
              shadowRadius: 7.49,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: colors.primary,
                textAlign: 'center',
                fontSize: 23,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
              }}>
              Add to Cart!
            </Text>
          </View>
        </View>
      </ScrollView>
    </WrapperScreen>
  );
}

const border = {
  borderWidth: 1,
  borderColor: 'black',
};

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
