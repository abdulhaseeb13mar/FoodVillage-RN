/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {connect} from 'react-redux';
import WrapperScreen from '../FvFrequentUsage/FvWrapperScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {H_W} from '../FvFrequentUsage/FvResponsive';
import {colors} from '../FvFrequentUsage/FvColor';
import {Button, Overlay} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {isFormValid} from '../FvFrequentUsage/Fvvalidation';
import NavPointer from '../FvFrequentUsage/FvRefNavigation';
import {
  FvUserAction,
  FvresetCart,
  FvsetCurrentProductAction,
} from '../FvStateManagement/FvActions';
import UseHeader from '../FvFrequentUsage/FvHeader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Loop from '../FvFrequentUsage/FvFlatList';
import ItemCounterWrapper from '../FvFrequentUsage/FvItemCounterWrapper';
import {FvVerticalTile} from './FvHome';

const ConfirmOrder = (props) => {
  useEffect(() => {
    convertObjectToArray();
  }, [props.FvCart]);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [HorizontalCartArray, setHorizontalCartArray] = useState([]);
  const [firstNameErrMsg, setFirstNameErrMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [email, setEmail] = useState('');
  const [phoneErrMsg, setPhoneErrMsg] = useState('');
  const [addressErrMsg, setAddressErrMsg] = useState('');
  const [phone, setPhone] = useState('');

  const convertObjectToArray = () => {
    const CartArray = Object.keys(props.FvCart);
    let UsArr = [];
    CartArray.forEach((element) => {
      UsArr.push(props.FvCart[element]);
    });
    setHorizontalCartArray(UsArr);
  };

  const FvConfirm = () => {
    const formValidResponse = isFormValid(firstName, email, phone, address);
    if (!formValidResponse.status) {
      errorMsgHandler(formValidResponse.errCategory, formValidResponse.errMsg);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        MoveToConfirmOrder();
      }, 2000);
      props.FvUserAction({
        email: email,
        firstName: firstName,
        phone: phone,
        address: address,
      });
    }
  };

  // const CallApi = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch(
  //       'https://reactnativeapps.herokuapp.com/customers',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           firstname: firstName,
  //           address: address,
  //           phonenumber: phone,
  //           email: email,
  //           appname: 'BountiFul Bags',
  //         }),
  //       },
  //     );
  //     const response = await res.json();
  //     setLoading(false);
  //     response.status ? setShowModal(true) : ShowToast('Some error occurred');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const errorMsgHandler = (errCategory, errMsg) => {
    if (errCategory === 'email') {
      setEmailErrMsg(errMsg);
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'firstname') {
      setEmailErrMsg('');
      setFirstNameErrMsg(errMsg);
      setPhoneErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'phone') {
      setPhoneErrMsg(errMsg);
      setEmailErrMsg('');
      setFirstNameErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'address') {
      setAddressErrMsg(errMsg);
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
      setEmailErrMsg('');
    }
  };

  const MoveToConfirmOrder = () => {
    props.FvresetCart();
    NavPointer.Push('FvConfirmOrder');
  };

  const closeModal = () => {
    setShowModal(false);
    props.FvresetCart();
    NavPointer.NavigateAndReset('FvHome');
  };
  const FvGoToSingleProduct = (item) => {
    props.FvsetCurrentProductAction(item);
    NavPointer.Navigate('FvSP');
  };

  const changePhone = (t) => setPhone(t);
  const changeAddress = (t) => setAddress(t);
  const changeEmail = (t) => setEmail(t);
  const FvGoBack = () => NavPointer.GoBack();
  const changeFirstName = (t) => setFirstName(t);

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <KeyboardAwareScrollView style={styles.container} bounces={false}>
        <UseHeader
          leftIcon={Feather}
          leftIconName="corner-up-left"
          leftIconColor={colors.primary}
          leftIconAction={FvGoBack}
          Title={<Text style={styles.FvContact2}>Checkout</Text>}
        />
        <Loop
          data={HorizontalCartArray}
          renderItem={({item}) => (
            <ItemCounterWrapper
              style={{marginVertical: HEIGHT * 0.025}}
              counterColor={colors.secondary}
              counterContentColor={colors.primary}
              item={item}
              position="top"
              Counterlength={H_W.width * 0.2}>
              <FvVerticalTile
                item={item}
                FvGoToSingleProduct={FvGoToSingleProduct}
              />
            </ItemCounterWrapper>
          )}
        />
        <View
          style={{
            paddingHorizontal: H_W.width * 0.035,
            paddingTop: HEIGHT * 0.03,
            marginBottom: HEIGHT * 0.04,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 17, fontWeight: 'bold', color: 'black'}}>
              Total Price
            </Text>
            <Text style={{fontSize: 17, fontWeight: 'bold', color: 'black'}}>
              $ {props.total}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: HEIGHT * 0.01,
              paddingBottom: HEIGHT * 0.03,
              borderBottomWidth: 1,
            }}>
            <Text style={{color: 'black'}}>Payment Method</Text>
            <Text style={{color: 'black'}}>Cash on Delivery</Text>
          </View>
        </View>
        <View style={styles.FvPersonalInfoWrapper}>
          <View style={styles.FvSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.FvPersonalInfoHeadingName,
                color: firstNameErrMsg ? 'red' : 'black',
              }}>
              NAME <Text> {firstNameErrMsg}</Text>
            </Text>
            <View style={styles.FvPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Your Name"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeFirstName}
                placeholderTextColor={colors.darkGray}
              />
            </View>
          </View>
          <View style={styles.FvSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.FvPersonalInfoHeadingName,
                color: emailErrMsg ? 'red' : 'black',
              }}>
              EMAIL<Text> {emailErrMsg}</Text>
            </Text>
            <View style={styles.FvPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Email"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeEmail}
                placeholderTextColor={colors.darkGray}
              />
            </View>
          </View>
          <View style={styles.FvSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.FvPersonalInfoHeadingName,
                color: phoneErrMsg ? 'red' : 'black',
              }}>
              CONTACT NUMBER<Text> {phoneErrMsg}</Text>
            </Text>
            <View style={styles.FvPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Contact Number"
                keyboardType="number-pad"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changePhone}
                placeholderTextColor={colors.darkGray}
              />
            </View>
          </View>
          <View style={styles.FvSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.FvPersonalInfoHeadingName,
                color: addressErrMsg ? 'red' : 'black',
              }}>
              DELIVERY ADDRESS<Text> {addressErrMsg}</Text>
            </Text>
            <View style={styles.FvPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Address"
                style={{...styles.Input, height: HEIGHT * 0.13}}
                onChangeText={changeAddress}
                multiline
                placeholderTextColor={colors.darkGray}
              />
            </View>
          </View>
        </View>
        <Overlay
          onBackdropPress={closeModal}
          isVisible={showModal}
          animationType="fade">
          <View
            style={{
              ...styles.FvModalWrapper,
              paddingVertical: HEIGHT * 0.04,
            }}>
            <MaterialCommunityIcons
              name="bottle-tonic-outline"
              size={H_W.width * 0.25}
              color="white"
            />
            <Text style={styles.FvModalHeadText}>
              YOUR ORDER HAS BEEN CONFIRMED!
            </Text>
          </View>
        </Overlay>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 20,
          }}>
          <Button
            raised
            loading={loading}
            onPress={FvConfirm}
            disabled={props.FvTotalItems === 0}
            title="CONFIRM ORDER"
            titleStyle={{fontWeight: 'bold', fontSize: 20}}
            containerStyle={{width: '95%'}}
            buttonStyle={{
              paddingVertical: HEIGHT * 0.02,
              backgroundColor: colors.primary,
              shadowColor: colors.primary,
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.46,
              shadowRadius: 11.14,
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    total: state.FvCartReducer.totalAmount,
    FvCart: state.FvCartReducer.items,
    FvTotalItems: state.FvCartReducer.totalItems,
  };
};

export default connect(mapStateToProps, {
  FvUserAction,
  FvresetCart,
  FvsetCurrentProductAction,
})(React.memo(ConfirmOrder));

const styles = StyleSheet.create({
  FvContact2: {
    color: colors.primary,
    fontSize: 22,
  },
  FvModalHeadText: {
    fontSize: H_W.width * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  FvModalWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: H_W.width * 0.8,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  Input: {
    width: H_W.width * 0.81,
    color: colors.primary,
    fontWeight: 'bold',
  },
  FvInputIcon: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: H_W.width * 0.09,
    color: colors.secondary,
  },
  FvPersonalInfoInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: H_W.width * 0.02,
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 1.5,
    backgroundColor: colors.secondary,
  },
  FvPersonalInfoHeadingName: {
    fontSize: 13,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  FvSinglePersonalInfoWrapper: {
    marginVertical: 10,
  },
  FvPersonalInfoWrapper: {
    marginHorizontal: H_W.width * 0.035,
  },
  container: {flex: 1},
});
