import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setWidgetConfig = (symbol: string) => {
  return {
    lineWidth: 2,
    lineType: 0,
    chartType: 'area',
    fontColor: 'rgb(106, 109, 120)',
    gridLineColor: 'rgba(242, 242, 242, 0.06)',
    volumeUpColor: 'rgba(34, 171, 148, 0.5)',
    volumeDownColor: 'rgba(247, 82, 95, 0.5)',
    backgroundColor: '#0F0F0F',
    widgetFontColor: '#DBDBDB',
    upColor: '#22ab94',
    downColor: '#f7525f',
    borderUpColor: '#22ab94',
    borderDownColor: '#f7525f',
    wickUpColor: '#22ab94',
    wickDownColor: '#f7525f',
    colorTheme: 'dark',
    isTransparent: false,
    locale: 'en',
    chartOnly: false,
    scalePosition: 'right',
    scaleMode: 'Normal',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif',
    valuesTracking: '1',
    changeMode: 'price-and-percent',
    symbols: [[`${symbol}`, `NASDAQ:${symbol}|1D`]],
    dateRanges: ['1d|1', '1m|30', '3m|60', '12m|1D', '60m|1W', 'all|1M'],
    fontSize: '10',
    headerFontSize: 'medium',
    autosize: true,
    width: '100%',
    height: '100%',
    noTimeScale: false,
    hideDateRanges: false,
    hideMarketStatus: false,
    hideSymbolLogo: false,
  };
};

export const setDetailsWidget = (symbol: string) => {
  return {
    symbol: `NASDAQ:${symbol}`,
    colorTheme: 'dark',
    isTransparent: false,
    locale: 'en',
    width: '100%',
    height: '100%',
  };
};

export const setAdvancedWidget = (symbol: string) => {
  return {
    allow_symbol_change: true,
    calendar: false,
    details: false,
    hide_side_toolbar: true,
    hide_top_toolbar: false,
    hide_legend: false,
    hide_volume: false,
    hotlist: false,
    interval: 'D',
    locale: 'en',
    save_image: true,
    style: '1',
    symbol: `NASDAQ:${symbol}`,
    theme: 'dark',
    timezone: 'Etc/UTC',
    backgroundColor: '#0F0F0F',
    gridColor: 'rgba(242, 242, 242, 0.06)',
    watchlist: [],
    withdateranges: false,
    compareSymbols: [],
    studies: [],
    autosize: true,
  };
};

export const setFinancialsWidget = (symbol: string) => {
  return {
    symbol: `NASDAQ:${symbol}`,
    colorTheme: 'dark',
    displayMode: 'regular',
    isTransparent: false,
    locale: 'en',
    width: '100%',
    height: 650,
  };
};

export const setTechAnalysisWidget = (symbol: string) => {
  return {
    colorTheme: 'dark',
    displayMode: 'single',
    isTransparent: false,
    locale: 'en',
    interval: '1m',
    disableInterval: false,
    width: '100%',
    height: 400,
    symbol: `NASDAQ:${symbol}`,
    showIntervalTabs: true,
  };
};

export const setProfileWidget = (symbol: string) => {
  return {
    symbol: `NASDAQ:${symbol}`,
    colorTheme: 'dark',
    isTransparent: false,
    locale: 'en',
    width: '100%',
    height: 400,
  };
};
