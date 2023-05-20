import React from 'react'
import { SECURITY_END_POINT } from '../constants'
import post from '../helpers/api_helper'
export const test1 = () => {
    const login = ()=>
    {
        const loginuser = post(SECURITY_END_POINT.login(), {userid:'01999999999',password:'asd123'});
        console.log(loginuser);
    }
  return (
    <div>test1</div>
  )
}
