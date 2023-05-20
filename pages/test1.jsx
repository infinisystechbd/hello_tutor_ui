import React from 'react'
import { TEST_1 } from '../constants'
import post from '../helpers/api_helper'
export const test1 = () => {
    const login = ()=>
    {
        const loginuser = post(TEST_1.test1(), {userid:'01999999999',password:'asd123'});
        console.log(loginuser);
    }
  return (
    <div>test1</div>
  )
}
