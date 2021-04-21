/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import WrapperScreen from '../FvFrequentUsage/FvWrapperScreen';
import {H_W} from '../FvFrequentUsage/FvResponsive';
import NavigationRef from '../FvFrequentUsage/FvRefNavigation';
import {colors} from '../FvFrequentUsage/FvColor';
import Data from '../FvData';
import Loop from '../FvFrequentUsage/FvFlatList';
import {connect} from 'react-redux';
import {
  FvsetCurrentProductAction,
  FvsetFavAction,
  FvremoveFavAction,
} from '../FvStateManagement/FvActions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FvHeader from '../FvFrequentUsage/FvHeader';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {FvHorizontalTile} from './FvHome';
import {ViewComponent} from 'react-native';

function Search(props) {
  const [searchText, setSearchText] = useState('');

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const RenderSearchedResult = () => {
    var SearchedItems = Data.product.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    return SearchedItems.length === 0 ? (
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
        Nothing Found...
      </Text>
    ) : (
      CardRender(SearchedItems)
    );
  };

  const FvGoToSingleProduct = (item) => {
    props.FvsetCurrentProductAction(item);
    NavigationRef.Navigate('FvSP');
  };

  const CardRender = (Arr) => {
    return (
      <Loop
        horizontal={false}
        data={Arr}
        renderItem={({item}) => (
          <FvHorizontalTile
            item={item}
            FvGoToSingleProduct={FvGoToSingleProduct}
            FvFavs={props.FvFavs}
            FvsetFav={(Fv) => props.FvsetFavAction(Fv)}
            FvremoveFav={(Fv) => props.FvremoveFavAction(Fv)}
          />
        )}
      />
    );
  };
  const FvGoBack = () => NavigationRef.GoBack();

  const FvchangeSearchText = (t) => setSearchText(t);
  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <FvHeader
        leftIcon={SimpleLineIcons}
        leftIconName="arrow-left"
        leftIconColor={colors.primary}
        leftIconAction={FvGoBack}
        Title={<Text style={styles.FvSearch2}>Search</Text>}
      />
      <View style={{paddingHorizontal: H_W.width * 0.06}}>
        <View
          style={{
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            borderRadius: 7,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: HEIGHT * 0.05,
              paddingLeft: H_W.width * 0.03,
              backgroundColor: colors.lightGrey2,
              borderRadius: 7,
            }}>
            <Fontisto name="search" size={18} color={colors.primary} />
            <TextInput
              style={{
                width: '80%',
                fontWeight: 'bold',
                fontSize: 15,
                color: 'black',
                marginLeft: H_W.width * 0.02,
              }}
              placeholderTextColor={colors.darkGray}
              placeholder="Search Here..."
              onChangeText={FvchangeSearchText}
            />
          </View>
        </View>
      </View>
      <View style={{marginTop: HEIGHT * 0.01, flex: 1}}>
        {searchText !== '' ? RenderSearchedResult() : CardRender(Data.product)}
      </View>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => ({
  FvCart: state.FvCartReducer.items,
  FvFavs: state.FvToggleFav,
});

export default connect(mapStateToProps, {
  FvsetCurrentProductAction,
  FvsetFavAction,
  FvremoveFavAction,
})(Search);

const styles = StyleSheet.create({
  FvSearch2: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  FvSearch3: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  FvSearch4: {
    width: '85%',
  },
});
