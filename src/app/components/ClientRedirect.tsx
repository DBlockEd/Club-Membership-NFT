'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'
import { adminAddress } from '../../constants'

const ClientRedirect = () => {
  const { address, isConnected } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (isConnected) {
      if (address === adminAddress) {
        router.push('/admin')
      } else {
        router.push('/member')
      }
    }
    else {
      router.push('/')
    }
  }, [address, isConnected, router])

  return null
}

export default ClientRedirect
