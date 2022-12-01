import { useEffect, useRef } from "react";
import { eventEmitter } from "../services/eventEmitter.js";

export const InputForm = ({ selected }) => {
  let lastNameRef = useRef(null);
  let firstNameRef = useRef(null);
  let sureNameRef = useRef(null);
  let balanceRef = useRef(null);

  useEffect(() => {
    lastNameRef.current.value = selected.lastName ?? null
    firstNameRef.current.value = selected.firstName ?? null
    sureNameRef.current.value = selected.sureName ?? null
    balanceRef.current.value = selected.balance ?? null
  }, [selected])

  const buildObject = () => ({
    ...selected,
    lastName: lastNameRef.current.value,
    firstName: firstNameRef.current.value,
    sureName: sureNameRef.current.value,
    balance: balanceRef.current.value,
  });

  return (
    <div style={ { marginTop: 100 } }>
      <input type="text" ref={ lastNameRef }/>
      <input type="text" ref={ firstNameRef }/>
      <input type="text" ref={ sureNameRef }/>
      <input type="number" ref={ balanceRef }/>
      <button onClick={ () => eventEmitter.emit("save", buildObject()) }>
        Сохранить
      </button>
    </div>
  );
};


      
