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

/**
 * Function converts normal name to camel case with space Eg. james h to => James H
 * @param username 
 * @returns 
 */

export const prettyUserName = (username) => {
    let prettyName = '';
    if (username) {
        prettyName = username.split(' ').map(user => `${user[0].toUpperCase()}${user.slice(1).toLowerCase()}`).join(' ');
    }
    return prettyName;
}

/**
 *  Function used to check if loggedUser and current user is same
 *  @param loggedUser
 *  @param createdPostUser
 *  @returns 
*/

export const isUserCanEditOrDelete = (loggedUser, createdPostUser) => {

    let isUserCanEdit = false;

    if (!loggedUser) return isUserCanEdit;
    if (loggedUser && createdPostUser) {
        isUserCanEdit = (loggedUser._id === createdPostUser._id) ? true : false;
    }

    return isUserCanEdit;

}

/**
 * Return converted date to based on given type
 * Eg. type = "month" will reduce one month from the currentDate. currentDate = 26.06.2021 result = 26-05-2021 
 * function accepts one parameter type must be week, month, year
 * @param {*} type 
 * @returns 
*/

export const getCurrentDateByType = (type) => {

    let startDate = new Date();

    switch (type.toLowerCase()) {
        case 'week':
            startDate = startDate.setDate(startDate.getDate() - 6);
            break;
        case 'month':
            startDate = startDate.setMonth(startDate.getMonth() - 1);
            break;
        case 'year':
            startDate = startDate.setUTCFullYear(startDate.getUTCFullYear() - 1);
            break;
        default:
            startDate = "";
    };

    return new Date(startDate);

}
