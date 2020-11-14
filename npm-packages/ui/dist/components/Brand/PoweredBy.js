import React from 'react';
import { Typography } from '@material-ui/core';
import { Trans, useTranslation } from 'react-i18next';
import { favicon32 } from '../Images';
import { createStyles, makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => createStyles({
    logo: {
        width: 16,
        height: 16,
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(0.5),
    }
}));
const PoweredBy = (props) => {
    var _a;
    const { t } = useTranslation();
    const classes = useStyles();
    const link = (_a = props.link) !== null && _a !== void 0 ? _a : 'https://openwork.shop/about/powered-by';
    function renderIcon() {
        return React.createElement("img", { className: classes.logo, alt: t('OpenWorkShop icon'), src: favicon32.base64 });
    }
    return (React.createElement("div", null,
        React.createElement(Typography, { variant: "subtitle2" },
            React.createElement(Trans, null,
                props.productName,
                " is powered by"),
            renderIcon(),
            React.createElement("a", { href: link, title: t('About OpenWorkShop'), target: "_blank" }, "OpenWorkShop"))));
};
export default PoweredBy;
//# sourceMappingURL=PoweredBy.js.map