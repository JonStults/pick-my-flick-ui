import moment from 'moment-timezone';

export const formatYYYYMMDD = (value: any) => value ? moment(value).format('YYYYMMDD') : '';
export const formatMMDD = (value: any) => value ? moment(value).format('MM/DD') : '';
export const formatMMDDYYYYwithSlash = (value: any) => value ? moment(value).format('MM/DD YYYY') : '';
export const formatMMDDYYYYWithDashes = (value: any) => value ? moment(value).format('MM-DD-YYYY') : '';
export const formatMDYYYY = (value: any) => value ? moment(value).format('M/D/YYYY') : '';
export const formatMMDDYYYY = (value: any) => (value === '- -' || !value) ? '- -' : moment(value).format('MM/DD/YYYY');
export const formatMMDDYYYYHH = (value: any) => (value === '- -' || !value) ? '- -' : moment(value).format('MM/DD/YYYY h:mm a z');
export const formatMMDDYYYYHHMM = (value: any) => (value === '- -' || !value) ? '- -' : moment(value).format('MM/DD/YYYY HH:mm');
export const formatMMDDYYYYHHMMUTC = (value: any) => (value === '- -' || !value) ? '- -' : moment.utc(value).format('MM/DD/YYYY HH:mm');
export const formatMMMDYYYY = (value: any) => value ? moment(value).format('MMM D, YYYY') : '';
export const formatYYYY = (value: any) => value ? moment(value).format('YYYY') : '';
export const formatMM = (value: any) => value ? moment(value).format('MM') : '';
export const getEndOfTheDay = (value: any, format = '') => value ? moment(value).endOf('day').format(format) : '';
export const getStartOfTheDay = (value: any, format = '') => value ? moment(value).startOf('day').format(format) : '';
export const getStartOfTheYear = (value: any) => value ? moment(value).startOf('year').format('') : ''
export const getEndOfTheYear = (value: any) => value ? moment(value).endOf('year').format('') : ''
export const getEndOfTheDayUTC = (value: any, format = '') => value ? moment.utc(value).endOf('day').format(format) : '';
export const getStartOfTheDayUTC = (value: any, format = '') => value ? moment.utc(value).startOf('day').format(format) : '';
