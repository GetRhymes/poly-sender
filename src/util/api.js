//MAIN ADDRESS
// const API_ROOT = 'https://poly-sender.ru:4085'
const API_ROOT = 'http://localhost:4085'
const API_PREFIX = ''

//STUDENTS CONTROLLER
const STUDENTS = '/students'
const STUDENTS_ROOT = API_ROOT + API_PREFIX + STUDENTS

export const URL_getAllStudents = STUDENTS_ROOT + '/getAll'

//STAFF CONTROLLER
const STAFF = '/staff'
const STAFF_ROOT = API_ROOT + API_PREFIX + STAFF

export const URL_getAllStaff = STAFF_ROOT + '/getAll'
export const URL_changePassword = STAFF_ROOT + '/changePassword'
export const URL_changeAccess = STAFF_ROOT + '/changeAccess'
export const URL_getNotifications = STAFF_ROOT + '/getNotifications'
export const URL_acceptRequest = STAFF_ROOT + '/acceptRequest'
export const URL_rejectRequest = STAFF_ROOT + '/rejectRequest'

//ATTRIBUTES CONTROLLER
const ATTRIBUTES = '/attributes'
const ATTRIBUTES_ROOT = API_ROOT + API_PREFIX + ATTRIBUTES

export const URL_getGroupAttributes = ATTRIBUTES_ROOT + '/getGroupAttributes'
export const URL_getAttributes = ATTRIBUTES_ROOT + '/getAttributes'
export const URL_calculateAttribute = ATTRIBUTES_ROOT + '/calculate'
export const URL_deleteAttribute = ATTRIBUTES_ROOT + '/deleteAttribute'
export const URL_attributeShare = ATTRIBUTES_ROOT + '/share'
export const URL_createAttribute = ATTRIBUTES_ROOT + '/createAttribute'
export const URL_createGroupName = ATTRIBUTES_ROOT + '/createGroupName'
export const URL_updateAttribute = ATTRIBUTES_ROOT + '/updateAttribute'
export const URL_getGroupNamesCurrentStaff = ATTRIBUTES_ROOT + '/getGroupNamesCurrentStaff'
export const URL_getAttributeById = ATTRIBUTES_ROOT + '/getAttributeById'
export const URL_getAttributesCurrentStaff = ATTRIBUTES_ROOT + '/getAttributesCurrentStaff'
export const URL_deleteGroupAttribute = ATTRIBUTES_ROOT + '/deleteGroupAttribute'

//FILTERS CONTROLLER
const FILTERS = '/filters'
const FILTERS_ROOT = API_ROOT + API_PREFIX + FILTERS

export const URL_getFiltersShort = FILTERS_ROOT + '/getFiltersShort'
export const URL_getFilters = FILTERS_ROOT + '/getFilters'
export const URL_getFilterById = FILTERS_ROOT + '/getFilterById'
export const URL_deleteFilter = FILTERS_ROOT + '/deleteFilter'
export const URL_filterShare = FILTERS_ROOT + '/share'
export const URL_createFilter = FILTERS_ROOT + '/createFilter'
export const URL_updateFilter = FILTERS_ROOT + '/updateFilter'
export const URL_calculateFilter = FILTERS_ROOT + '/calculate'
export const URL_getEmails = FILTERS_ROOT + '/getEmails'

//AUTH CONTROLLER
const AUTH = '/login'
const AUTH_ROOT = API_ROOT + API_PREFIX + AUTH

export const URL_check = AUTH_ROOT + '/check'
export const URL_reset = AUTH_ROOT + '/reset'
export const URL_getAccess = AUTH_ROOT + '/getAccess'

//ADMIN CONTROLLER
const ADMIN = '/admin'
const ADMIN_ROOT = API_ROOT + API_PREFIX + ADMIN

export const URL_setup = ADMIN_ROOT + '/setup'
export const URL_change = ADMIN_ROOT + '/change'
export const URL_reject = ADMIN_ROOT + '/reject'
export const URL_getAccessList = ADMIN_ROOT + '/getAccessList'
export const URL_getRoles = ADMIN_ROOT + '/getRoles'
export const URL_update = ADMIN_ROOT + '/update'
export const URL_getUsers = ADMIN_ROOT + '/getUsers'
export const URL_changeRoles = ADMIN_ROOT + '/changeRoles'
export const URL_deleteUser = ADMIN_ROOT + '/deleteUser'

//HEADERS
export default function authHeader() {
    const token = localStorage.getItem('token')
    if (token) {
        return {Authorization: 'Bearer ' + token};
    } else {
        return {};
    }
}






