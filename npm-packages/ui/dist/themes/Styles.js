import { backgroundImage, getImageUrl } from '../components/Images';
export const headerBar = (theme) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    fontWeight: 'bold',
    backgroundImage: getImageUrl(backgroundImage.base64),
});
//# sourceMappingURL=Styles.js.map