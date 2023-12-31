import type { RegisterOptions } from 'react-hook-form'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
export const rules: Rules = {
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
    }
  }
}
