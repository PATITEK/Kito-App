import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

export const API_URL = new InjectionToken<string>('apiUrl');

export const APICONFIG = {
  BASEPOINT: environment.apiUrl,
  AUTH: {
    LOGIN: '/app/auth/login',
    SIGNUP: `/app/auth/signup`,
    TYPE_OF_USER: `/app/auth/users/profile`,
    RESET_PASSWORD_EMAIL: `/app/reset_password/send_code`,
    CHECK_CODE_RESET: `/app/reset_password/check_code`,
    RESET_PASSWORD: `/app/reset_password/reset_password`,
    COUNTRY_CODE: `/app/country_codes`,
    UPDATE_AVATAR: `/app/app_users/update_avatar`
  },
  ACCOUNT: {
    PROFILE_USER: `/app/app_users/profile`,
    UPDATE_PROFILE: `/app/app_users/update_profile`,
    UPDATE_PASS: `/app/users/update_password`,
    GETDETAIL: (id) => `/app/users/${id}`,
    EDIT: (id) => `/app/users/${id}`,
    DELETE: (id) => `/app/users/${id}`,
    UPDATE_PREMIUM: (id) => `/app/users/request_upgrade`,
    CONTACT_ADMIN: `/app/interact_email/submit`
  },
  DIOCESE: {
    GET: `/app/dioceses`,
    GET_DETAIL: id => `/app/dioceses/${id}`
  },
  PARISHES: {
    GET_ALL_WITH_DIOCESE_ID: `/app/parishes`,
    GETNEWS: `/app/parish_news`,
    GET_ALL: `app/parishes/all_parishes`,
    GET_DETAIL: id => `/app/parishes/${id}`
  },
  EVENTS: {
    GET: `/app/events`,
    GET_DETAIL: (id) => `/app/events/${id}`,
  },
  CALENDARS: {
    GET_BY_MONTH: `/app/calendars/month`,
    GET_BY_WEEK: `/app/calendars/week`,
    GET_BY_DAY: `/app/calendars/day`,
  },
  DONATES: {
    DONATE: `/app/donation_logs`
  },
  HISTORY: {
    GET_SERVICES: `/app/attention_logs/service_history`,
    GET_EVENTS: `/app/attention_logs/event_history`
  },
  ORDER: {
    GET_ALL: `/app/orders`,
    GET_DETAIL: (id) => `/app/orders/${id}`,
    CREATE: `/app/orders`,
    DELETE: (id) => `/app/orders/${id}`,
  },
  VATICAN: {
    GET: `/app/vatican_news`,
    GET_DETAIL: id => `/app/vatican_news/${id}`
  },
  POPE: {
    GET: `/app/pope_infos`,
    GET_DETAIL: id => `/app/pope_infos/${id}`
  },
  BISHOP: {
    GET: `/app/bishop_infos`,
    GET_DETAIL: id => `/app/bishop_infos/${id}`
  },
  DIOCESE_NEWS: {
    GET: `/app/diocese_news`,
    GET_DETAIL: id => `/app/diocese_news/${id}`
  },
  STORE: {
    GET_ALL_CATEGORIES: `/app/categories`,
    GET_ALL_PRODUCTS: `/app/products`,
    GET_DETAIL_PRODUCT: id => `/app/products/${id}`
  },
  QUESTIONARES: {
    GET_TOPIC: `/app/questions/topics`,
    GET_LEVEL: `/app/questions/levels`,
    GET_QUES_TOPIC: topic => `/app/questions/by_topic?topic=${topic}`,
    GET_QUES_LEVEL: level => `/app/questions/by_level?level=${level}`,
    CHECK_ANSWER: answerKey => `/${answerKey}`,
  },
  COURSE: {
    GET_COURSE_GROUP: `/app/course_groups`,
    GET_COURSE_ID: `/app/courses`
  }
};

