import React, { useContext } from 'react'
import { AuthContext } from './AuthContainer'


//I want a thing, where I click and it sets the data downchannel instead of 
//inside that other file





export const OnLoad = async () => {
      const rawResponse = await fetch('/onLoad');
      const content = await rawResponse.json();
      
}

export const onClick = async () => {
      console.log('hey')
      const rawResponse  = await fetch('/onClick');
      const content = await rawResponse.json();
      console.log(await content)
}







