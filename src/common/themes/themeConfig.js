export const appColors = {
  primary: "#8E7CC3",
  primaryHover: "#A898D6",
  primaryPressed: "#6F5FA0",
  primarySoftBg: "#F4F1FA",

  errorColor: "#E88080",
  errorColorHover: "#DB6A6A",
  errorColorPressed: "#C74F4F",
  errorColorSuppl: "#F2B1B1",

  successColor: "#6CC688",
  successColorHover: "#55B174",
  successColorPressed: "#3E955F",
  successColorSuppl: "#A4DEB8",
};

export const RADIUS = {
  sm: "8px",
  md: "10px",
  lg: "12px",
  xl: "16px",
};

export const themeConfig = (PALETTE) => ({
  common: {
    primaryColor: appColors.primary,
    primaryColorHover: appColors.primaryHover,
    primaryColorPressed: appColors.primaryPressed,
    primaryColorSuppl: appColors.primary,

    errorColor: appColors.errorColor,
    errorColorHover: appColors.errorColorHover,
    errorColorPressed: appColors.errorColorPressed,
    errorColorSuppl: appColors.errorColorSuppl,

    successColor: appColors.successColor,
    successColorHover: appColors.successColorHover,
    successColorPressed: appColors.successColorPressed,
    successColorSuppl: appColors.successColorSuppl,

    baseColor: PALETTE.base,
    bodyColor: PALETTE.base,
    textColorBase: PALETTE.text0,
    textColor1: PALETTE.text1,
    textColor2: PALETTE.text2,
    textColor3: PALETTE.text3,
    cardColor: PALETTE.base,
    modalColor: PALETTE.base,
    popoverColor: PALETTE.base,
    borderColor: PALETTE.border,
    tableHeaderColor: PALETTE.base,
    tableColorHover: PALETTE.subtle ?? PALETTE.hoverBg,
    fontWeightStrong: "600",
    borderRadius: RADIUS.md,
  },
  Layout: {
    siderColor: PALETTE.surface ?? "transparent",
    color: PALETTE.base,
    headerColor: "transparent",
    footerColor: "transparent",
    siderBorderColor: PALETTE.border,
    headerBorderColor: PALETTE.border,
    footerBorderColor: PALETTE.border,
  },
  Card: {
    color: PALETTE.base,
    colorEmbedded: "transparent",
    borderRadius: RADIUS.lg,
    borderColor: PALETTE.border,
    actionColor: "transparent",
  },
  Button: {
    borderRadius: RADIUS.md,
    rippleDuration: "0ms",
    textColor: PALETTE.text1,
    colorHoverPrimary: appColors.primaryHover,
    colorPressedPrimary: appColors.primaryPressed,
    colorFocusPrimary: appColors.primary,
    waveOpacity: "0.06",
  },
  Input: {
    borderRadius: RADIUS.md,
    color: PALETTE.surface ?? PALETTE.add ?? PALETTE.base,
    colorFocus: PALETTE.surface ?? PALETTE.add ?? PALETTE.base,
    caretColor: appColors.primary,
    border: `1px solid ${PALETTE.border}`,
    borderHover: `1px solid ${PALETTE.border}`,
    borderFocus: `1px solid ${appColors.primary}`,
    boxShadowFocus: "none",
  },
  Select: {
    borderRadius: RADIUS.md,
    peers: {
      InternalSelection: {
        color: PALETTE.surface,
        border: `1px solid ${PALETTE.border}`,
        borderActive: `1px solid ${appColors.primary}`,
        colorActive: PALETTE.surface,
        boxShadowFocus: "none",
        boxShadowHover: "none",
        boxShadowActive: "none",
        colorFocus: PALETTE.surface,
      },
      InternalSelectMenu: {
        color: PALETTE.surface,
        borderRadius: "8px",
        boxShadowFocus: "none",
        optionTextColorActive: appColors.primary,
      },
    },
  },
  AutoComplete: {
    borderRadius: RADIUS.md,
  },
  Tag: {
    borderRadius: RADIUS.md,
    color: PALETTE.surface ?? PALETTE.base,
    border: `1px solid ${PALETTE.border}`,
    textColor: PALETTE.text2,
  },
  Tabs: {
    tabPaddingMedium: "8px 10px",
    tabGapMediumBar: "10px",
    tabColor: "transparent",
    barColor: PALETTE.border,
  },
  Table: {
    borderColor: PALETTE.border,
    thColor: PALETTE.base,
    tdColor: PALETTE.base,
    tdColorHover: PALETTE.subtle ?? PALETTE.hoverBg,
  },
  Message: {
    borderRadius: RADIUS.md,
    padding: "10px 12px",
    colorSuccess: appColors.primarySoftBg ?? appColors.primary,
    textColorSuccess: PALETTE.text1,
  },
  Notification: {
    borderRadius: RADIUS.lg,
  },
  Modal: {
    borderRadius: RADIUS.lg,
  },
  Popover: {
    borderRadius: RADIUS.lg,
  },
  Divider: {
    color: PALETTE.surface,
  },
  Typography: {
    pMargin: "0",
  },
});
