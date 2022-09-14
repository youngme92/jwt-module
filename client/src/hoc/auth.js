import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";

export default function (ComposedClass, reload, adminRoute = null) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(async response => {
                if (await !response.payload.isAuth) {
                    // isAuth 가 false 인 상태 -> 로그인 안된 상태
                    if (reload) {
                        props.history.push('/login')
                    }
                } else {
                    // isAuth 가 true 인 상태 -> 로그인 된 상태
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    }
                    else {
                        // isAuth 가 true 이나, reload가 false면 '/' 경로로 이동
                        if (reload === false) {
                            props.history.push('/')
                        }
                    }
                }
            })
            
        }, [dispatch, props.history, user.googleAuth])

        return (
            <ComposedClass {...props} user={user} />
        )
    }
    return AuthenticationCheck
}


