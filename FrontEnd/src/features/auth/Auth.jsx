import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import {
  
// } from "./authSlice";


export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  
  return (
    <div>
      <div className={styles.row}>
        
      </div>
    </div>
  );
}
