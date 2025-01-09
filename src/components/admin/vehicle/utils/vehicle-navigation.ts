import { useRouter, useSearchParams } from 'next/navigation'

export const useNavigation = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const params = new URLSearchParams(searchParams.toString())

  const handleNavigation = (isGet: boolean) => {
    if (isGet) {
      params.set('get', 'true')
    } else {
      params.delete('get')
    }
    router.push(`?${params.toString()}`)
  }

  return {
    searchParams,
    handleNavigation
  }
}
