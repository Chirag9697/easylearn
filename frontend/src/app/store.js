import { configureStore } from '@reduxjs/toolkit'
// import stepperhandlerreducer from '../features/stepperHandling/stepperHandleSlice';
// import stepperformdatahandling from '../features/stepperHandling/stepperHandleData'
// import ProfileUpdateSlice from '../Pages/profileUpdate/profileUpdateSlice';
import rolesdatareducer from '../features/roles/rolesdata';
export const store = configureStore({
  reducer: {

    rolesdata:rolesdatareducer,
  },
})

