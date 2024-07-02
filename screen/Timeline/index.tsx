import React from 'react';
import { useState } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { FaCalendar, FaCalendarAlt } from 'react-icons/fa';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from 'axios';
import { BASE_URL } from '@/constants/AppConstants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '@/components/LoadingSpinner';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Dates {
  verificationStartDate: ValuePiece;
  verificationEndDate: ValuePiece;
  choiceFillingStartDate: ValuePiece;
  choiceFillingEndDate: ValuePiece;
}

const errorNotify = (msg: string) => {
  toast.error(msg, {
    position: 'top-right',
    autoClose: 2000,
  });
};

const successNotify = (msg: string) => {
  toast.success(msg, {
    position: 'top-right',
    autoClose: 2000,
  });
};

const infoNotify = (msg: string) => {
  toast.info(msg, {
    position: 'top-right',
    autoClose: 2000,
  });
};

export default function Timeline() {
  const [dates, setDates] = useState<any>({
    verificationStartDate: null,
    verificationEndDate: null,
    choiceFillingStartDate: null,
    choiceFillingEndDate: null,
  });

  const [loading, setLoading] = useState({
    resetLoading: false,
    submitLoading: false,
  });

  const submitDetails = async () => {
    if(!dates.verificationStartDate || !dates.verificationEndDate || !dates.choiceFillingStartDate || !dates.choiceFillingEndDate){
      errorNotify("Please fill all the fields");
      return;
    }
    const newDates = {
      startDate: dates.verificationStartDate.toISOString(),
      verificationEndDate: dates.verificationEndDate.toISOString(),
      choicefillingStartDate: dates.choiceFillingStartDate.toISOString(),
      choicefillingEndDate: dates.choiceFillingEndDate.toISOString(),
    };
    try {
      setLoading((prev) => ({ ...prev, submitLoading: true }));
      const response = await fetch(`${BASE_URL}/admin/timeline`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newDates),
        });

      const result = await response.json();
      console.log(result);
      console.log(response);
      if(response.status === 403){
        errorNotify(result.message);
      }
      else if(response.status === 201){
        successNotify("Timeline created successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prev) => ({ ...prev, submitLoading: false }));
    }
  }

  const resetHandler = async () => {
    setLoading((prev) => ({ ...prev, resetLoading: true }));
    try{
      const response = await axios.delete(`${BASE_URL}/admin/timeline`);
      console.log(response);
      if(response.status === 200){
        successNotify(response.data.message);
      }
    }catch(error){
      console.log(error);
    } finally {
      setLoading((prev) => ({ ...prev, resetLoading: false }));
    }
  }

  return (
    <div className="bg-white w-full min-h-screen flex justify-center">
      <div
        className="gap-4 flex flex-col items-center w-1/2"
        style={{
          margin: '50px',
        }}
      >
        <div className="flex items-center w-full justify-start flex-row gap-4">
          <p
          style={{
            fontSize: '15px',
            width: '100px',
          }} className="font-bold">Verification</p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              value={dates.verificationStartDate}
              onChange={(newValue) => setDates({ ...dates, verificationStartDate: newValue })}
              format='DD/MM/YYYY hh:mm a'
            />
          </LocalizationProvider>
          <p className="text-2xl font-bold">to</p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              value={dates.verificationEndDate}
              onChange={(newValue) => setDates({ ...dates, verificationEndDate: newValue })}
              format='DD/MM/YYYY hh:mm a'
            />
          </LocalizationProvider>
        </div>
        
        <div className="flex items-center w-full justify-end flex-row gap-4">
          <p style={{
            fontSize: '15px',
            width: '100px',
          }} className="text-2xl font-bold">Choice Filling</p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              value={dates.choiceFillingStartDate}
              onChange={(newValue) => setDates({ ...dates, choiceFillingStartDate: newValue })}
              format='DD/MM/YYYY hh:mm a'
            />
          </LocalizationProvider>
          <p className="text-2xl font-bold">to</p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              value={dates.choiceFillingEndDate}
              onChange={(newValue) => setDates({ ...dates, choiceFillingEndDate: newValue })}
              format='DD/MM/YYYY hh:mm a'
            />
          </LocalizationProvider>
        </div>
        <div
          style={{
            marginTop: '30px',
          }}
          className='flex gap-4 w-full justify-center items-center'
        >
          <button className="text-white px-4 py-2 rounded-md items-center flex justify-center"
            style={{
              backgroundColor: 'darkRed',
              width: '100px',
            }}
            onClick={resetHandler}
          >
            {
              loading.resetLoading ? <LoadingSpinner /> : "Reset"
            }
          </button>
          <button className="bg-[#1E293B] text-white px-4 py-2 rounded-md justify-center items-center flex"
            onClick={submitDetails}
            style={{
              width: '100px'
            }}
          >
            {
              loading.submitLoading ? <LoadingSpinner /> : "Submit"
            }
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
