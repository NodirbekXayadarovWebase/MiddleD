import type { GlobalThemeOverrides } from 'naive-ui'

const inputOverrides = {
  borderRadius: '6px',
  borderHover: '1px solid #1F80F0',
  borderFocus: '1px solid #1F80F0',
  boxShadowFocus: '0 0 0 2px rgba(31, 128, 240, 0.2)',
}

export function useThemeOverrides() {
  const overrides: GlobalThemeOverrides = {
    common: {
      primaryColor: '#1F80F0',
      primaryColorHover: '#1F80F080',
      primaryColorPressed: '#1b1e2d',
      primaryColorSuppl: '#1F80F0',

      baseColor: '#ffffff',

      textColorBase: '#333333',
      textColor1: '#1a1a1a',
      textColor2: '#333333',
      textColor3: '#666666',

      bodyColor: '#f5f6fa',
      cardColor: '#f9fafc',
      modalColor: '#f9fafc',
      popoverColor: '#f9fafc',
      tableHeaderColor: '#f1f4f9',

      borderColor: '#e0e0e0',
      dividerColor: '#e0e0e0',
    },

    Button: {
      textColorPrimary: '#ffffff',
      colorPrimary: '#1F80F0',
      colorHoverPrimary: '#1F80F0CC',
      colorPressedPrimary: '#1F80F0B3',
      borderPrimary: '#1F80F0',
      borderHoverPrimary: '#1F80F0CC',
      borderPressedPrimary: '#1F80F0B3',

      borderRadiusLarge: '8px',
      borderRadiusMedium: '6px',
      borderRadiusSmall: '4px',
    },

    Card: {
      borderRadius: '16px',
      paddingMedium: '24px',
      color: '#f9fafc',
      borderColor: '#e4e8f1',
    },

    Layout: {
      color: 'var(--shell-content-bg)',
      siderColor: 'var(--shell-sider-bg)',
      headerColor: 'var(--shell-header-bg)',
    },

    Menu: {
      borderRadius: '8px',
      itemHeight: '44px',
      itemColorActive: '#1f80f0',
      itemColorActiveHover: '#1f80f0',
      itemTextColorActive: '#ffffff',
      itemTextColorActiveHover: '#ffffff',
      itemIconColorActive: '#ffffff',
      itemIconColorActiveHover: '#ffffff',
    },

    DataTable: {
      borderRadius: '8px',
      borderColor: 'rgba(185, 185, 185, 0.6)',
    },

    Pagination: {
      itemColorActive: '#1F80F0',
      itemColorActiveHover: '#1F80F0',
      itemTextColorActive: '#ffffff',
      itemSizeMedium: '32px',
      itemBorderRadius: '6px',
    },

    Input: inputOverrides,
  }

  return { overrides }
}
