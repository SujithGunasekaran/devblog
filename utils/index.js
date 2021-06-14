import moment from 'moment';

/**
 *  Function Converts 12/06/2021 or any format To -> Jun 6 ( month, date ) 
*/

export const convertFullDateToShort = (date) => {
    return date ? moment(+date).format('MMM D') : null;
}
