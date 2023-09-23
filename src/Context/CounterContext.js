import { useState } from "react";
import { createContext } from "react";

export let counterContext = createContext();

export function CounterContextProvider (props){

const [userName, setUserName] = useState('')


return<>

<CounterContextProvider value={userName} >
{props.children}

</CounterContextProvider>


</>

}