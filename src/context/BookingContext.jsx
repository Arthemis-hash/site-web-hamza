// src/context/BookingContext.jsx
import { createContext, useContext, useReducer } from 'react';

const BookingContext = createContext();

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SERVICE':
      return {
        ...state,
        selectedService: action.payload,
      };
    case 'SET_EXPERT':
      return {
        ...state,
        selectedExpert: action.payload,
      };
    case 'SET_BOOKING_DATA':
      return {
        ...state,
        bookingData: { ...state.bookingData, ...action.payload },
      };
    case 'RESET_BOOKING':
      return initialState;
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  selectedService: null,
  selectedExpert: null,
  bookingData: {
    date: '',
    time: '',
    address: '',
    phone: '',
    description: '',
  },
  currentStep: 1,
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const setService = (service) => {
    dispatch({ type: 'SET_SERVICE', payload: service });
  };

  const setExpert = (expert) => {
    dispatch({ type: 'SET_EXPERT', payload: expert });
  };

  const updateBookingData = (data) => {
    dispatch({ type: 'SET_BOOKING_DATA', payload: data });
  };

  const setStep = (step) => {
    dispatch({ type: 'SET_STEP', payload: step });
  };

  const resetBooking = () => {
    dispatch({ type: 'RESET_BOOKING' });
  };

  const createBooking = async () => {
    try {
      // Simuler un appel API
      const booking = {
        id: Date.now(),
        ...state.bookingData,
        service: state.selectedService,
        expert: state.selectedExpert,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      
      // Sauvegarder localement
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      bookings.push(booking);
      localStorage.setItem('bookings', JSON.stringify(bookings));
      
      return { success: true, booking };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <BookingContext.Provider value={{
      ...state,
      setService,
      setExpert,
      updateBookingData,
      setStep,
      resetBooking,
      createBooking,
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};