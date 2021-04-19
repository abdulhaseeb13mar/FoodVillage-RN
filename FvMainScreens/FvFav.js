/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {Text, View, StyleSheet} from 'react-native';
import {
  FvremoveFavAction,
  FvsetFavAction,
  FvsetCurrentProductAction,
} from '../FvStateManagement/FvActions';
import FvHeader from '../FvFrequentUsage/FvHeader';
import {colors} from '../FvFrequentUsage/FvColor';
import WrapperScreen from '../FvFrequentUsage/FvWrapperScreen';
import Loop from '../FvFrequentUsage/FvFlatList';
import NavigationRef from '../FvFrequentUsage/FvRefNavigation';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {FvHorizontalTile} from './FvHome';

const FvFavourites = (props) => {
  const FvGoToSingleProduct = (item) => {
    props.FvsetCurrentProductAction(item);
    NavigationRef.Navigate('FvSP');
  };

  const FvGoBack = () => NavigationRef.Navigate('FvHome');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        <Loop
          horizontal={false}
          data={props.FvFavs}
          renderItem={({item}) => (
            <FvHorizontalTile
              item={item}
              FvGoToSingleProduct={FvGoToSingleProduct}
              FvFavs={props.FvFavs}
              FvsetFav={(Fv) => props.FvsetFavAction(Fv)}
              FvremoveFav={(Fv) => props.FvremoveFavAction(Fv)}
            />
          )}
          ListHeaderComponent={
            <FvHeader
              leftIcon={SimpleLineIcons}
              leftIconName="arrow-left"
              leftIconAction={FvGoBack}
              Title={<Text style={styles.FvFav2}>Favourites</Text>}
            />
          }
        />
      </View>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    FvCart: state.FvCartReducer.items,
    FvFavs: state.FvToggleFav,
  };
};

export default connect(mapStateToProps, {
  FvsetFavAction,
  FvsetCurrentProductAction,
  FvremoveFavAction,
})(FvFavourites);

const styles = StyleSheet.create({
  FvFav2: {
    color: colors.primary,
    fontSize: 22,
  },
});
