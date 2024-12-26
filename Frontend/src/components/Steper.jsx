import { Box, Stepper, Step, StepLabel } from '@mui/material';

const steps = ['add basic information', 'setup password', 'OTP verification'];

export default function Steper({pnum}) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={pnum} alternativeLabel sx={{
          '& .MuiStepLabel-root.Mui-active': {
            color: '#00dc82', 
          },
          '& .MuiStepLabel-root.Mui-completed': {
            color: '#00dc82', 
          },
          '& .MuiStepIcon-root.Mui-active': {
            color: '#00dc82', 
          },
          '& .MuiStepIcon-root.Mui-completed': {
            color: '#00dc82', 
          },
        }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>
               <span className='text-white text-sm'>{label}</span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
