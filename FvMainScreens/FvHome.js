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
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import FvHeader from '../FvFrequentUsage/FvHeader';

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
      (item) => item.categoryid === tab.id,
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

  return <WrapperScreen style={{backgroundColor: 'white'}}></WrapperScreen>;
}

export const FvVerticalTile = ({item, FvGoToSingleProduct, FvCart}) => {
  useEffect(() => {
    getTheCategory();
  }, []);

  const [productCategory, setProductCategory] = useState('');

  const getTheCategory = () => {
    for (let Fv = 0; Fv < Data.Category.length; Fv++) {
      if (Data.Category[Fv].id === item.categoryid) {
        setProductCategory(Data.Category[Fv].category);
        break;
      }
    }
  };

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  return (
    <TouchableOpacity
      onPress={() => FvGoToSingleProduct(item)}
      style={{
        width: H_W.width * 0.57,
        marginHorizontal: H_W.width * 0.05,
      }}>
      <View style={{zIndex: -1, position: 'absolute'}}>
        <HomeSvg width={H_W.width * 0.57} height={HEIGHT * 0.29} />
      </View>
      <LinearGradient
        style={{
          width: H_W.width * 0.57,
          height: HEIGHT * 0.29,
          position: 'absolute',
          zIndex: -1,
        }}
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
        locations={[0.1, 1]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
      />
      <FastImage
        source={item.image}
        style={{
          width: '100%',
          height: HEIGHT * 0.24,
          marginTop: HEIGHT * 0.02,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.64,
          shadowRadius: 10.27,
        }}
        resizeMode="contain"
      />
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'GillSans-Light',
          fontSize: 12,
          paddingHorizontal: H_W.width * 0.01,
        }}
        numberOfLines={2}>
        {productCategory.toUpperCase()}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'DamascusMedium',
          marginTop: HEIGHT * 0.01,
          fontSize: 16,
          paddingHorizontal: H_W.width * 0.007,
        }}
        numberOfLines={2}>
        {item.name.toUpperCase()}
      </Text>
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
    checkIfFav();
  }, []);
  const [fav, setFav] = useState(false);

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
    <TouchableOpacity
      onPress={() => FvGoToSingleProduct(item)}
      style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: H_W.width * 0.85,
        }}>
        <LinearGradient
          style={{
            width: H_W.width * 0.2,
            height: H_W.width * 0.2,
            borderRadius: 13,
          }}
          colors={[`rgba(${colors.rgb_Primary},0.7)`, 'rgba(255,255,255,1)']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          <FastImage
            source={item.image}
            style={{
              width: H_W.width * 0.2,
              height: H_W.width * 0.2,
              borderRadius: 13,
            }}
            resizeMode="contain"
          />
        </LinearGradient>
        <View
          style={{
            width: H_W.width * 0.6,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              numberOfLines={2}
              style={{
                color: 'black',
                width: H_W.width * 0.35,
                fontFamily: textFont.FuturaMedium,
                fontSize: 15.5,
              }}>
              {item.name}
            </Text>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                alignSelf: 'flex-start',
                marginTop: HEIGHT * 0.015,
              }}>
              <Text style={{fontSize: 18}}>${item.price}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={toggleFav}>
            <Ionicons
              name="heart-circle"
              size={37}
              color={fav ? 'red' : 'black'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
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
        justifyContent: 'center',
        marginHorizontal: H_W.width * 0.03,
        paddingHorizontal: H_W.width * 0.03,
        paddingVertical: HEIGHT * 0.005,
        borderRadius: 10,
        backgroundColor:
          item.category === FvcurrentCat.category ? 'black' : null,
        borderWidth: 1,
        borderColor: colors.lightGrey3,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
      }}
      onPress={() => FvchangeTab(item)}>
      <Text
        style={{
          fontWeight: 'bold',
          color:
            item.category === FvcurrentCat.category ? 'white' : colors.primary,
          fontSize: item.category === FvcurrentCat.category ? 25 : 20,
          fontFamily: 'PingFangSC-Ultralight',
        }}>
        {item.category}
      </Text>
    </TouchableOpacity>
  );
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
