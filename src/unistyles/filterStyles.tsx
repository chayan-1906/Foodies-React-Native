import {createStyleSheet} from 'react-native-unistyles';

export const filterStyles = createStyleSheet(({colors, device, border}) => ({
  filterBar: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    padding: 5,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.1,
    elevation: 5,
    borderRadius: 8,
    shadowRadius: 1.5,
    shadowColor: colors.lightText,
    borderColor: colors.border,
    backgroundColor: colors.background,
    borderWidth: 1,
    marginRight: 10,
  },
}));
