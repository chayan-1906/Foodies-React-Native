import {Text, View} from 'react-native';
import {AddFoodModalProps} from '../../types';
import {useAppDispatch} from '@states/reduxHook.ts';
import {useStyles} from 'react-native-unistyles';
import {modalStyles} from '@unistyles/modalStyles.tsx';
import {useEffect, useState} from 'react';

function AddFoodModal({food, restaurant, onClose}: AddFoodModalProps) {
    const dispatch = useAppDispatch();
    const {styles} = useStyles(modalStyles);
    const [data, setData] = useState({
        quantity: 1,
        price: food.price,
        selectedOption: {} as Record<string, number>,
    });

    const calculatePrice = (quantity: number, selectedOption: Record<string, number>) => {
        const basePrice = food.price || 0;
        let customizationPrice = 0;

        Object.keys(selectedOption).forEach(type => {
            const optionIndex = selectedOption[type];
            const optionPrice = food.customizationOptions?.find((c: any) => c.type === type)?.options?.[optionIndex]?.price || 0;
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

    useEffect(() => {
        const defaultSelectedOption: Record<string, number> = {};
        let initialPrice = food.price || 0;
        food.customizationOptions?.forEach((customization: any) => {
            if (customization?.required) {
                const defaultOptionIndex = customization?.options?.findIndex((option: any) => option?.price === 0);
                if (defaultOptionIndex !== -1) {
                    defaultSelectedOption[customization.type] = defaultOptionIndex;
                    initialPrice += customization?.options[defaultOptionIndex]?.price || 0;
                }
            }
        });

        setData(prevData => ({
            ...prevData,
            selectedOption: defaultSelectedOption,
            price: initialPrice,
        }));
    }, [food]);

    return (
        <View>
            <Text>AddFoodModal</Text>
        </View>
    );
}

export default AddFoodModal;
