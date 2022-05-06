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

const MUTATE_PT_ENDPOINT = '/pt';
const GET_PT_ENDPOINT = '/pt/get';
const SEARCH_PT_ENDPOINT = '/pt/search';
const POST_REQUEST_ENDPOINT = '/pt/request';
const GET_REQUESTS_ENDPOINT = '/pt/getrequests';
const ACCEPT_REQUEST_ENDPOINT = '/pt/acceptrequest';
const DELETE_REQUEST_ENDPOINT = '/pt/deleterequest';
const CREATE_HEALTH_DATA_ENDPOINT = '/healthdata/create';
const GET_WEEKLY_HEALTH_DATA_ENDPOINT = '/healthdata/getweeklydata';
const GET_MONTHLY_HEALTH_DATA_ENDPOINT = '/healthdata/getmonthlydata';
const GET_DAILY_HEALTH_DATA_ENDPOINT = '/healthdata/getdailydata';

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
  { label: 'Free Weights', value: 'FREE WEIGHTS' },
  { label: 'Jogging', value: 'JOGGING' },
  { label: 'Yoga', value: 'YOGA' },
];

const LANGUAGES = [
  { label: 'English', value: 'ENGLISH' },
  { label: 'Spanish', value: 'SPANISH' },
  { label: 'French', value: 'FRENCH' },
  { label: 'Portuguese', value: 'PORTUGUESE' },
  { label: 'Hindi', value: 'HINDI' },
  { label: 'Javascript', value: 'JAVASCRIPT' },
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
  GET_REQUESTS_ENDPOINT,
  ACCEPT_REQUEST_ENDPOINT,
  DELETE_REQUEST_ENDPOINT,
  CREATE_HEALTH_DATA_ENDPOINT,
  GET_WEEKLY_HEALTH_DATA_ENDPOINT,
  GET_MONTHLY_HEALTH_DATA_ENDPOINT,
  GET_DAILY_HEALTH_DATA_ENDPOINT,
  POST_REQUEST_ENDPOINT,
  SPECIALTIES,
  LANGUAGES,
};
