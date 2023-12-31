import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const MyDatePicker = ({ date, handleDate, label }) => {

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={date}
          onChange={handleDate}
        />
      </LocalizationProvider>
    </>
  );
};

export default MyDatePicker;
