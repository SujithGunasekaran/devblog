import moment from 'moment';

/**
 *  Function Converts 12/06/2021 or any format To -> Jun 6 ( month, date ) 
 *  @param {*} date
 *  @returns
*/

export const convertFullDateToShort = (date) => {
    return date ? moment(+date).format('MMM D') : '';
}

/**
 * Function Converts 12/06/2021 or any format to -> Jun 6, 2021 ( month, date, year )
 * @param {*} date 
 * @returns 
*/

export const convertFullDateToLong = (date) => {
    return date ? moment(+date).format('ll') : ''
}
