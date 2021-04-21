/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import WrapperScreen from '../FvFrequentUsage/FvWrapperScreen';
import {colors, textFont} from '../FvFrequentUsage/FvColor';
import {H_W} from '../FvFrequentUsage/FvResponsive';
import Data from '../FvData';
import Loop from '../FvFrequentUsage/FvFlatList';
import RefNavigation from '../FvFrequentUsage/FvRefNavigation';
import {connect} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  FvsetCurrentProductAction,
  FvremoveFavAction,
  FvsetFavAction,
} from '../FvStateManagement/FvActions';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import FvHeader from '../FvFrequentUsage/FvHeader';
import dp from '../FvAllAssets/Images/3.png';

function FvHome(props) {
  useEffect(() => {
    FvchangeTab(Data.category[0]);
  }, []);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [Fvcategories, setFvcategories] = useState(Data.category);
  const [FvcurrentCat, setFvCurrentCat] = useState(Data.category[0]);
  const [FvtabProducts, setFvTabProducts] = useState([]);

  const FvchangeTab = (tab) => {
    setFvCurrentCat(tab);
    const filteredProducts = Data.product.filter(
      (item) => item.category === tab.id,
    );
    setFvTabProducts(filteredProducts);
  };
  const FvGotoCart = () => RefNavigation.Navigate('FvContact');
  const FvGotoSearch = () => RefNavigation.Navigate('FvSearch');
  const FvGotoFav = () => RefNavigation.Navigate('FvFav');
  const FvGoToSingleProduct = (item) => {
    props.FvsetCurrentProductAction(item);
    RefNavigation.Navigate('FvSP');
  };

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <Loop
        ListHeaderComponent={
          <ScrollView bounces={false}>
            <FvHeader
              leftIcon={Fontisto}
              leftIconName="heart"
              leftIconColor={colors.primary}
              leftIconAction={FvGotoFav}
              rightIcon={Fontisto}
              rightIconName="opencart"
              rightIconColor={colors.primary}
              rightIconAction={FvGotoCart}
              Title={
                <Text style={{color: colors.primary, fontSize: 25}}>
                  Food<Text style={{color: colors.secondary}}>Village</Text>
                </Text>
              }
            />
            <View style={{alignItems: 'center', marginVertical: HEIGHT * 0.02}}>
              <TouchableOpacity
                onPress={FvGotoSearch}
                style={{
                  width: H_W.width * 0.85,
                  borderRadius: 10,
                  backgroundColor: colors.lightGrey2,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: H_W.width * 0.02,
                  paddingVertical: HEIGHT * 0.01,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: colors.lightGrey3,
                    fontSize: 15,
                  }}>
                  Search Here...
                </Text>
                <FontAwesome
                  name="search"
                  color={colors.lightGrey3}
                  size={16}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                marginLeft: H_W.width * 0.05,
                fontWeight: 'bold',
                fontSize: 20,
                marginBottom: HEIGHT * 0.01,
              }}>
              Category
            </Text>
            <Loop
              data={Fvcategories}
              renderItem={({item}) => (
                <TabList
                  item={item}
                  FvcurrentCat={FvcurrentCat}
                  FvchangeTab={FvchangeTab}
                />
              )}
            />
            <Loop
              data={FvtabProducts}
              renderItem={({item}) => (
                <FvVerticalTile
                  item={item}
                  FvGoToSingleProduct={FvGoToSingleProduct}
                />
              )}
            />
            <Text
              style={{
                marginLeft: H_W.width * 0.05,
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Popular {FvcurrentCat.category}
            </Text>
          </ScrollView>
        }
        data={FvtabProducts}
        horizontal={false}
        renderItem={({item}) => (
          <FvHorizontalTile
            item={item}
            FvFavs={props.FvFavs}
            FvsetFav={(Fv) => props.FvsetFavAction(Fv)}
            FvremoveFav={(Fv) => props.FvremoveFavAction(Fv)}
            FvGoToSingleProduct={FvGoToSingleProduct}
          />
        )}
      />
    </WrapperScreen>
  );
}

export const FvVerticalTile = ({item, FvGoToSingleProduct, FvCart}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  return (
    <TouchableOpacity
      onPress={() => FvGoToSingleProduct(item)}
      style={{width: H_W.width * 0.5, margin: 20}}>
      <View
        style={{
          width: '100%',
          borderRadius: H_W.width * 0.26,
          height: H_W.width * 0.5,
          backgroundColor: `rgba(${colors.rgb_Primary},1)`,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: colors.primary,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.72,
          shadowRadius: 5.46,
        }}>
        <FastImage
          source={item.image}
          style={{
            width: H_W.width * 0.5,
            height: H_W.width * 0.5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
          }}
          resizeMode="contain"
        />
      </View>
      <Text
        numberOfLines={2}
        style={{
          width: '100%',
          textAlign: 'center',
          marginTop: HEIGHT * 0.015,
          fontSize: 16,
          fontWeight: 'bold',
        }}>
        {item.name}
      </Text>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: H_W.width * 0.02,
          marginTop: HEIGHT * 0.005,
        }}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: colors.primary}}>
          ${item.price}
        </Text>
        <Text style={{fontSize: 14, fontWeight: 'bold'}}>
          <AntDesign name="star" color={colors.secondary} /> {item.rating}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const FvHorizontalTile = ({
  item,
  FvGoToSingleProduct,
  FvFavs,
  FvremoveFav,
  FvsetFav,
}) => {
  useEffect(() => {
    getTheCategory();
    checkIfFav();
  }, []);
  const [productCategory, setProductCategory] = useState('');
  const [fav, setFav] = useState(false);

  const getTheCategory = () => {
    for (let Fv = 0; Fv < Data.category.length; Fv++) {
      if (Data.category[Fv].id === item.category) {
        setProductCategory(Data.category[Fv].category);
        break;
      }
    }
  };

  const checkIfFav = () => {
    for (let Fv = 0; Fv < FvFavs.length; Fv++) {
      if (FvFavs[Fv].id === item.id) {
        setFav(true);
        break;
      }
    }
  };
  const toggleFav = () => {
    fav ? FvremoveFav(item.id) : FvsetFav(item);
    setFav(!fav);
  };
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <View
      style={{
        alignItems: 'center',
        marginVertical: HEIGHT * 0.02,
      }}>
      <TouchableOpacity
        onPress={() => FvGoToSingleProduct(item)}
        style={{
          overflow: 'visible',
          borderRadius: 17,
          backgroundColor: 'white',
          width: H_W.width * 0.9,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: HEIGHT * 0.004,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: H_W.width * 0.6,
            alignSelf: 'stretch',
            paddingTop: HEIGHT * 0.01,
            paddingLeft: H_W.width * 0.03,
            justifyContent: 'space-evenly',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 15.5}} numberOfLines={2}>
            {item.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: colors.darkGray,
                fontWeight: 'bold',
                fontSize: 14,
              }}>
              {productCategory}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                marginLeft: H_W.width * 0.02,
              }}>
              <AntDesign name="star" color={colors.secondary} />
              {item.rating}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={toggleFav}
              style={{
                paddingHorizontal: H_W.width * 0.02,
                paddingVertical: HEIGHT * 0.008,
                backgroundColor: colors.secondary,
                borderRadius: 8,
              }}>
              <FontAwesome
                name={fav ? 'heart' : 'heart-o'}
                color={colors.primary}
                size={16}
              />
            </TouchableOpacity>
            <Text
              style={{
                marginLeft: H_W.width * 0.05,
                fontSize: 18,
                fontWeight: 'bold',
                alignSelf: 'flex-end',
              }}>
              ${item.price}
            </Text>
          </View>
        </View>
        <FastImage
          source={item.image}
          style={{
            width: H_W.width * 0.29,
            height: H_W.width * 0.29,
            marginLeft: H_W.width * 0.04,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export const TabList = ({item, FvchangeTab, FvcurrentCat}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginHorizontal: H_W.width * 0.03,
        paddingHorizontal: H_W.width * 0.03,
        borderRadius: 20,
        backgroundColor:
          item.category === FvcurrentCat.category
            ? colors.primary
            : colors.secondary,
        borderWidth: 1,
        borderColor: colors.lightGrey3,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        height: HEIGHT * 0.2,
      }}
      onPress={() => FvchangeTab(item)}>
      <FastImage
        source={item.icon}
        style={{width: H_W.width * 0.15, height: HEIGHT * 0.08}}
        resizeMode="contain"
      />
      <Text
        style={{
          fontWeight: 'bold',
          color: item.category === FvcurrentCat.category ? 'white' : 'black',
          fontSize: item.category === FvcurrentCat.category ? 22 : 16,
          fontFamily: 'PingFangSC-Ultralight',
        }}>
        {item.category}
      </Text>
    </TouchableOpacity>
  );
};

const border = {
  // borderWidth: 1,
  borderColor: 'black',
};

const mapStateToProps = (state) => {
  return {
    FvtotalItems: state.FvCartReducer.totalItems,
    FvCart: state.FvCartReducer.items,
    FvFavs: state.FvToggleFav,
  };
};

export default connect(mapStateToProps, {
  FvsetCurrentProductAction,
  FvremoveFavAction,
  FvsetFavAction,
})(FvHome);
