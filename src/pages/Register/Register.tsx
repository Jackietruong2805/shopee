import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useMutation } from 'react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import Input from 'src/components/Input'
import { schema, Schema } from 'src/utils/rule'
import { registerAccount } from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ResponseApi } from 'src/types/utils.type'

type FormData = Schema

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, 'confirm_password')
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
          // if (formError?.email) {
          //   setError('email', {
          //     message: formError.email,
          //     type: 'Server'
          //   })
          // }
          // if (formError?.password) {
          //   setError('password', {
          //     message: formError.password,
          //     type: 'Server'
          //   })
          // }
        }
      }
    })
  })
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 bg-white rounded shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
                autoComplete='on'
              />
              <Input
                name='password'
                register={register}
                type='password'
                className='mt-2'
                errorMessage={errors.password?.message}
                placeholder='Password'
                autoComplete='on'
              />
              <Input
                name='confirm_password'
                register={register}
                type='password'
                className='mt-2'
                errorMessage={errors.confirm_password?.message}
                placeholder='Confirm Password'
                autoComplete='on'
              />
              <div className='mt-2'>
                <button className='w-full px-2 py-4 text-sm text-center text-white uppercase bg-red-500 hover:bg-red-600'>
                  Đăng ký
                </button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-300'>Bạn đã có tài khoản?</span>
                <Link className='ml-1 text-red-400' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
