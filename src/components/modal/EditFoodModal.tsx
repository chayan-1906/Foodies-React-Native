import {Image, SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import {EditFoodModalProps, ICustomization} from '../../types';
import {useAppDispatch} from '@states/reduxHook.ts';
import {useStyles} from 'react-native-unistyles';
import {modalStyles} from '@unistyles/modalStyles.tsx';
import {useEffect, useState} from 'react';
import {updateCustomizableItem} from '@states/reducers/cartSlice.ts';
import CustomText from '@components/global/CustomText.tsx';
import {Colors, Fonts} from '@unistyles/Constants.tsx';
import Icon from '@components/global/Icon.tsx';
import DottedLine from '@components/ui/DottedLine.tsx';
import ScalePress from '@components/ui/ScalePress.tsx';
import {RFValue} from 'react-native-responsive-fontsize';
import AnimatedNumbers from 'react-native-animated-numbers';

function transformSelectedOptions(selectedOption: any, customizationOptions: any) {
    return Object.entries(selectedOption).map(([type, index]) => {
        const customization = customizationOptions?.find((option: any) => option.type === type);
        if (!customization || !customization?.options[index as number]) {
            throw new Error(`Invalid customization type of index for ${type}`);
        }
        return {
            type,
            selectedOption: customization?.options[index as number],
        };
    });
}

function EditFoodModal({item, customization, restaurant, onClose}: EditFoodModalProps) {
    const dispatch = useAppDispatch();
    const {styles} = useStyles(modalStyles);
    const [data, setData] = useState({
        quantity: customization.quantity,
        price: customization.price,
        selectedOption: {} as Record<string, number>,
    });

    const calculatePrice = (quantity: number, selectedOption: Record<string, number>) => {
        const basePrice = item.price || 0;
        let customizationPrice = 0;

        Object.keys(selectedOption).forEach(type => {
            const optionIndex = selectedOption[type];
            const optionPrice = item.customizationOptions?.find((c: any) => c.type === type)?.options?.[optionIndex]?.price || 0;
            customizationPrice += optionPrice;
        });

        return (basePrice + customizationPrice) * quantity;
    };

    const selectOptionHandler = (type: string, index: number) => {
        setData(prevData => {
            const updatedSelectedOption = {...prevData.selectedOption, [type]: index};
            const updatedPrice = calculatePrice(prevData?.quantity, updatedSelectedOption);

            return {
                ...prevData,
                selectedOption: updatedSelectedOption,
                price: updatedPrice,
            };
        });
    };

    const addCartHandler = () => {
        setData(prevData => ({
            ...prevData,
            quantity: prevData?.quantity + 1,
            price: calculatePrice(prevData?.quantity + 1, prevData?.selectedOption),
        }));
    };

    const removeCartHandler = () => {
        if (data?.quantity > 1) {
            setData(prevData => ({
                ...prevData,
                quantity: prevData?.quantity - 1,
                price: calculatePrice(prevData?.quantity - 1, prevData?.selectedOption),
            }));
        } else {
            onClose();
        }
    };

    const updateItemIntoToCart = () => {
        const customizationOptions = transformSelectedOptions(data?.selectedOption, item?.customizationOptions).sort((a, b) => a.type.localeCompare(b.type));

        const customizedData = {
            restaurantId: restaurant.id,
            cartItemId: item.id,
            customizationId: customization.id,
            newCustomization: {
                quantity: data?.quantity,
                price: data?.price,
                customizationOptions,
            } as ICustomization,
        };

        dispatch(updateCustomizableItem(customizedData));
        onClose();
    };

    useEffect(() => {
        const defaultSelectedOption: Record<string, number> = {};
        customization.customizationOptions?.forEach((customizationOption: any) => {
            const itemCustomization = item?.customizationOptions.find((option: any) => option.type === customizationOption.type);

            if (itemCustomization) {
                const selectedIndex = itemCustomization.options.findIndex((option: any) => option?.name === customizationOption.selectedIndex?.name);
                if (selectedIndex !== 1) {
                    defaultSelectedOption[customizationOption.type] = selectedIndex;
                }
            }
        });

        setData(prevData => ({
            ...prevData,
            selectedOption: defaultSelectedOption,
        }));
    }, [customization, item]);

    return (
        <View>
            <View style={styles.headerContainer}>
                <View style={styles.flexRowGap}>
                    <Image source={{uri: item?.image}} style={styles.headerImage} />
                    <View>
                        <CustomText fontFamily={'Okra-Medium'} fontSize={12}>
                            {item?.name}
                        </CustomText>
                        <CustomText fontFamily={'Okra-Medium'} fontSize={9}>
                            Edit
                        </CustomText>
                    </View>
                </View>

                <View style={styles.flexRowGap}>
                    <TouchableOpacity style={styles.icon}>
                        <Icon size={16} name={'bookmark-outline'} iconFamily={'Ionicons'} color={Colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                        <Icon size={16} name={'share-outline'} iconFamily={'Ionicons'} color={Colors.primary} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {item?.customizationOptions?.map((customization: any, index: number) => (
                    <View key={index} style={styles.subContainer}>
                        <CustomText fontFamily={Fonts.Medium}>{customization?.type}</CustomText>
                        <CustomText fontFamily={Fonts.Medium} variant={'h7'} color={'#888'}>
                            {customization?.required ? 'Required • Select any 1 option' : `Add on your ${customization?.type}`}
                        </CustomText>
                        <DottedLine />

                        {customization?.options?.map((option: any, i: number) => (
                            <TouchableOpacity key={i} style={styles.optionContainer} onPress={() => selectOptionHandler(customization?.type, i)}>
                                <CustomText fontFamily={Fonts.Medium} fontSize={11}>
                                    {option?.name}
                                </CustomText>
                                <View style={styles.flexRowGap}>
                                    <CustomText fontFamily={Fonts.Medium} fontSize={11}>
                                        {option?.price}
                                    </CustomText>
                                    <Icon size={16} name={data?.selectedOption[customization.type] === i ? 'radiobox-marked' : 'radiobox-blank'} iconFamily={'MaterialCommunityIcons'} color={data?.selectedOption[customization.type] === i ? Colors.active : '#888'} />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </ScrollView>

            <View style={styles.footerContainer}>
                <View style={styles.selectedContainer}>
                    <ScalePress onPress={removeCartHandler}>
                        <Icon size={RFValue(13)} name={'minus-thick'} iconFamily={'MaterialCommunityIcons'} color={Colors.active} />
                    </ScalePress>
                    <AnimatedNumbers includeComma={false} animationDuration={300} animateToNumber={data?.quantity} fontStyle={styles.animatedCount} />
                    <ScalePress onPress={addCartHandler}>
                        <Icon size={RFValue(13)} name={'plus-thick'} iconFamily={'MaterialCommunityIcons'} color={Colors.active} />
                    </ScalePress>
                </View>
                <TouchableOpacity style={styles.addButtonContainer} onPress={updateItemIntoToCart}>
                    <CustomText color={'#FFF'} fontFamily={Fonts.Medium} variant={'h5'}>
                        Update Item - ₹{data?.price}
                    </CustomText>
                </TouchableOpacity>
            </View>
            <SafeAreaView />
        </View>
    );
}

export default EditFoodModal;
