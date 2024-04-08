const BASE_URL = 'http://localhost:8080';

export const PRODUCTS_URL = BASE_URL + '/products';
export const PRODUCT_BY_ID_IRL = PRODUCTS_URL + '/';
export const USER_LOGIN_URL = BASE_URL + '/login';
export const USER_REGISTER_URL = BASE_URL + '/newUser'
export const STORE_REGISTER_URL = BASE_URL + '/newStore'
export const STOREFRONT_BY_SELLERID_URL = BASE_URL + '/storefrontlist/';
export const STOREFRONT_BY_ID_URL = BASE_URL + '/storefront/';
export const PRODUCTS_BY_STORE_ID_URL = BASE_URL + '/productsbystore/';
export const PRODUCT_REGISTER_URL = BASE_URL + '/newProduct'
export const ORDER_REGISTER_URL = BASE_URL + '/newOrder'
export const ORDER_BY_USER_URL = BASE_URL + '/ordersbyuser/'
export const ORDER_BY_STORE_URL = BASE_URL + '/ordersbystore/'
export const ORDER_MODIFY_URL = BASE_URL + '/updateOrder'
export const PRODUCT_MODIFY_URL = BASE_URL + '/editProduct'
export const PRODUCT_DELETE_URL = BASE_URL + '/deleteProduct/'