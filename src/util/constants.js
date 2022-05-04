const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
};

const CONVERT = {
  WEEK_TO_SECONDS: 604800,
};

const USER_ATTRIBUTES = [
  'id',
  'token',
  'email',
  'emailVerified',
  'publicName',
  'username',
  'pictureUrl',
  'newUser',
];

const POST_AUTH_ENDPOINT = '/auth';
const POST_LOGOUT_ENDPOINT = '/logout';

const MUTATE_USER_ENDPOINT = '/user';

const GET_WORKOUTS_ENDPOINT = '/workouts/get';
const MUTATE_WORKOUTS_ENDPOINT = '/workouts';

const MUTATE_CLIENT_ENDPOINT = '/client';
const GET_CLIENT_ENDPOINT = '/client/get';

const MUTATE_PT_ENDPOINT = '/pt'
const GET_PT_ENDPOINT = '/pt/get'
const SEARCH_PT_ENDPOINT = '/pt/search';
const POST_REQUEST_ENDPOINT = '/pt/request';
const GET_REQUESTS_ENDPOINT = '/pt/getrequests';
const ACCEPT_REQUEST_ENDPOINT = '/pt/acceptrequest';
const DELETE_REQUEST_ENDPOINT = '/pt/deleterequest';

const DAYS_OF_WEEK = [
  { label: 'Monday', value: 'MON' },
  { label: 'Tuesday', value: 'TUE' },
  { label: 'Wednesday', value: 'WED' },
  { label: 'Thursday', value: 'THU' },
  { label: 'Friday', value: 'FRI' },
  { label: 'Saturday', value: 'SAT' },
  { label: 'Sunday', value: 'SUN' },
];

const SPECIALTIES = [
  { label: 'Free Weights', value: 'Free Weights' },
  { label: 'Jogging', value: 'Jogging' },
  { label: 'Yoga', value: 'Yoga' },
];

const LANGUAGES = [
  { label: 'English', value: 'English' },
  { label: 'Spanish', value: 'Spanish' },
  { label: 'French', value: 'French' },
];

export {
  STATUS_CODES,
  CONVERT,
  USER_ATTRIBUTES,
  POST_AUTH_ENDPOINT,
  POST_LOGOUT_ENDPOINT,
  MUTATE_USER_ENDPOINT,
  GET_WORKOUTS_ENDPOINT,
  MUTATE_WORKOUTS_ENDPOINT,
  GET_PT_ENDPOINT,
  MUTATE_PT_ENDPOINT,
  SEARCH_PT_ENDPOINT,
  MUTATE_CLIENT_ENDPOINT,
  GET_CLIENT_ENDPOINT,
  DAYS_OF_WEEK,
  SPECIALTIES,
  LANGUAGES,
  POST_REQUEST_ENDPOINT,
  GET_REQUESTS_ENDPOINT,
  ACCEPT_REQUEST_ENDPOINT,
  DELETE_REQUEST_ENDPOINT,
};
