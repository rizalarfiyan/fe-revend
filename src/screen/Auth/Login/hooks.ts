import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { API_BASE_URL } from '@/constants'

import schema from './schema'
import { sendOtp } from '../service'

const useLogin = () => {
  const router = useRouter()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      phone_number: '',
    },
  })

  const otp = useMutation({
    mutationFn: sendOtp,
    onSuccess: ({ data }) => {
      //! navigate to halaman verify, send otp success, create user
      console.log('onSuccess: ', data)
      router.replace('/verification', {
        query: {
          token: data.token,
        },
      })
    },
    onError: (error) => {
      //! update with toastr
      console.log('onError: ', error.message)
    },
  })

  const { isDirty, isValid } = form.formState
  const onSubmit = async (data: z.infer<typeof schema>) => {
    await otp.mutateAsync({
      phone_number: data.phone_number,
    })
  }

  const [isDisableGoogle, setIsDisableGoogle] = useState(false)
  const onGoogleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setIsDisableGoogle(true)
    window.location.assign(API_BASE_URL + '/auth/google')
  }

  return {
    form,
    isDisable: !isDirty || !isValid,
    isLoading: otp.isPending,
    onSubmit,
    onGoogleLogin,
    isDisableGoogle,
  }
}

export default useLogin
