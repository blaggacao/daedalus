import orderBy from 'lodash/orderBy';
import humanizeDuration from 'humanize-duration';

export const SELECTED_EPOCH_OPTIONS = {
  CURRENT_EPOCH: 'currentEpoch',
  PREVIOUS_EPOCH: 'previousEpoch',
};

export const getTableHeadersForCurrentEpoch = (intl, messages) => [
  {
    name: 'pool',
    title: intl.formatMessage(messages.tableHeaderPool),
  },
  {
    name: 'slotsElected',
    title: intl.formatMessage(messages.tableHeaderSlotsElected),
  },
];

export const getTableHeadersForPreviousEpoch = (intl, messages) => [
  {
    name: 'pool',
    title: intl.formatMessage(messages.tableHeaderPool),
  },
  {
    name: 'slotsElected',
    title: intl.formatMessage(messages.tableHeaderSlotsElected),
  },
  {
    name: 'performance',
    title: intl.formatMessage(messages.tableHeaderPerformance),
  },
  {
    name: 'sharedRewards',
    title: intl.formatMessage(messages.tableHeaderSharedRewards),
  },
];

export const noDataExisting = (isLoading, data) =>
  !isLoading && ((data && !data.length) || !data);

export const hasDataExisting = (isLoading, data) =>
  data && data.length > 0 && !isLoading;

export const sortData = (data, order, sortBy) =>
  orderBy(data, sortBy === 'pool' ? 'pool.title' : sortBy, order);

export const humanizeDurationToShort = (currentLocale, dateTime) => {
  let humanizedDurationLanguage = null;

  switch (currentLocale) {
    case 'ja-JP':
      humanizedDurationLanguage = 'ja';
      break;
    case 'zh-CN':
      humanizedDurationLanguage = 'zh_CN';
      break;
    case 'ko-KR':
      humanizedDurationLanguage = 'ko';
      break;
    case 'de-DE':
      humanizedDurationLanguage = 'de';
      break;
    default:
      humanizedDurationLanguage = 'shortEn';
  }

  return humanizeDuration
    .humanizer({
      languages: {
        shortEn: {
          y: () => 'y',
          mo: () => 'mo',
          w: () => 'w',
          d: () => 'd',
          h: () => 'h',
          m: () => 'm',
          s: () => 's',
          ms: () => 'ms',
        },
      },
    })(Math.max(0, new Date(dateTime).getTime() - new Date().getTime()), {
      round: true,
      language: humanizedDurationLanguage,
    })
    .replace(/\s/g, '')
    .replace(/,/g, ' ');
};
