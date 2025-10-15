export const NAV_LINKS = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Market', href: '/market' },
  { label: 'Watchlist', href: '/watchlist' },
];

export const MARKET_DATA_CONFIG = {
  colorTheme: 'dark',
  locale: 'en',
  largeChartUrl: '',
  isTransparent: false,
  showSymbolLogo: true,
  backgroundColor: '#0F0F0F',
  support_host: 'https://www.tradingview.com',
  width: '100%',
  height: '100%',
  symbolsGroups: [
    {
      name: 'Indices',
      symbols: [
        {
          name: 'FOREXCOM:SPXUSD',
          displayName: 'S&P 500 Index',
        },
        {
          name: 'FOREXCOM:NSXUSD',
          displayName: 'US 100 Cash CFD',
        },
        {
          name: 'FOREXCOM:DJI',
          displayName: 'Dow Jones Industrial Average Index',
        },
        {
          name: 'INDEX:NKY',
          displayName: 'Japan 225',
        },
        {
          name: 'INDEX:DEU40',
          displayName: 'DAX Index',
        },
        {
          name: 'FOREXCOM:UKXGBP',
          displayName: 'FTSE 100 Index',
        },
      ],
    },
    {
      name: 'Futures',
      symbols: [
        {
          name: 'BMFBOVESPA:ISP1!',
          displayName: 'S&P 500',
        },
        {
          name: 'BMFBOVESPA:EUR1!',
          displayName: 'Euro',
        },
        {
          name: 'CMCMARKETS:GOLD',
          displayName: 'Gold',
        },
        {
          name: 'PYTH:WTI3!',
          displayName: 'WTI Crude Oil',
        },
        {
          name: 'BMFBOVESPA:CCM1!',
          displayName: 'Corn',
        },
      ],
    },
    {
      name: 'Bonds',
      symbols: [
        {
          name: 'EUREX:FGBL1!',
          displayName: 'Euro Bund',
        },
        {
          name: 'EUREX:FBTP1!',
          displayName: 'Euro BTP',
        },
        {
          name: 'EUREX:FGBM1!',
          displayName: 'Euro BOBL',
        },
      ],
    },
    {
      name: 'Forex',
      symbols: [
        {
          name: 'FX:EURUSD',
          displayName: 'EUR to USD',
        },
        {
          name: 'FX:GBPUSD',
          displayName: 'GBP to USD',
        },
        {
          name: 'FX:USDJPY',
          displayName: 'USD to JPY',
        },
        {
          name: 'FX:USDCHF',
          displayName: 'USD to CHF',
        },
        {
          name: 'FX:AUDUSD',
          displayName: 'AUD to USD',
        },
        {
          name: 'FX:USDCAD',
          displayName: 'USD to CAD',
        },
      ],
    },
  ],
};

export const NEWS_DATA_CONFIG = {
  displayMode: 'regular',
  feedMode: 'all_symbols',
  colorTheme: 'dark',
  isTransparent: false,
  locale: 'en',
  width: '100%',
  height: '100%',
};

export const HEATMAP_CONFIG = {
  dataSource: 'SPX500',
  blockSize: 'market_cap_basic',
  blockColor: 'change',
  grouping: 'sector',
  isTransparent: true,
  locale: 'en',
  symbolUrl: '',
  colorTheme: 'dark',
  exchanges: [],
  hasTopBar: false,
  isDataSetEnabled: false,
  isZoomEnabled: true,
  hasSymbolTooltip: true,
  isMonoSize: false,
  width: '100%',
  height: '100%',
};

export const GAINERS_CONFIG = {
  exchange: 'US',
  colorTheme: 'dark',
  dateRange: '12M',
  showChart: true,
  locale: 'en',
  largeChartUrl: '',
  isTransparent: false,
  showSymbolLogo: false,
  showFloatingTooltip: false,
  plotLineColorGrowing: 'rgba(41, 98, 255, 1)',
  plotLineColorFalling: 'rgba(41, 98, 255, 1)',
  gridLineColor: 'rgba(240, 243, 250, 0)',
  scaleFontColor: '#DBDBDB',
  belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)',
  belowLineFillColorFalling: 'rgba(41, 98, 255, 0.12)',
  belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
  belowLineFillColorFallingBottom: 'rgba(41, 98, 255, 0)',
  symbolActiveColor: 'rgba(41, 98, 255, 0.12)',
  width: '100%',
  height: '100%',
};
