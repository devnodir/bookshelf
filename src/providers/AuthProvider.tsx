import { MY_SELF } from '@/constans/api.const'
import { USER_KEY, USER_SECRET } from '@/constans/general.const'
import useApi from '@/hooks/useApi'
import useAppSelector from '@/hooks/useAppSelector'
import { IChildren } from '@/types/helper.type'
import { setIsAuth, setUserData } from '@/utils/dispatch'
import { getLocalStorage, removeLocalStorage } from '@/utils/localStorage'
import React from 'react'

interface Props {
	render: (isAuth: boolean) => IChildren
}

const key = getLocalStorage(USER_KEY)
const secret = getLocalStorage(USER_SECRET)

const AuthProvider: React.FC<Props> = ({ render }) => {


	const { isAuth } = useAppSelector(({ auth }) => auth)
	useApi(MY_SELF, { onSuccess, onError, enabled: Boolean(key && secret), suspense: true })

	function onSuccess(res: any) {
		setUserData(res.data)
		setIsAuth(true)
	}

	function onError() {
		removeLocalStorage(USER_KEY)
		removeLocalStorage(USER_SECRET)
	}

	return <>{render(isAuth)}</>
}

export default AuthProvider