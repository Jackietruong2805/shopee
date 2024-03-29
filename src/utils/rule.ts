/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email is required'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email is not a correct format'
    },
    maxLength: {
      value: 160,
      message: 'Must be maximum length 160 characters'
    },
    minLength: {
      value: 5,
      message: 'Must be at least 5 characters'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password is required'
    },
    maxLength: {
      value: 160,
      message: 'Must be maximum length 160 characters'
    },
    minLength: {
      value: 6,
      message: 'Must be at least 6 characters'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Password is required'
    },
    maxLength: {
      value: 160,
      message: 'Must be maximum length 160 characters'
    },
    minLength: {
      value: 6,
      message: 'Must be at least 6 characters'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Refill password invalid'
        : undefined
  }
})

export const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 5 - 160 ký tự')
    .max(160, 'Độ dài từ 5 - 160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(100, 'Độ dài từ 6 - 160 ký tự'),
  confirm_password: yup
    .string()
    .required('Nhập lại Password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(100, 'Độ dài từ 6 - 160 ký tự')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp')
})

export type Schema = yup.InferType<typeof schema>
