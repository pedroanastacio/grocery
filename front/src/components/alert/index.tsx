import React, { memo, useCallback } from 'react';
import { Snackbar, Alert as MuiAlert, AlertColor, Slide, SlideProps } from '@mui/material';

type Props = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>, 
    severity: AlertColor,
    message: string
}

type TransitionProps = Omit<SlideProps, 'direction'>;

const Transition = (props: TransitionProps) => {
	return <Slide {...props} direction='left' />;
};

const Alert: React.FC<Props> = ({ open, setOpen, severity, message }) => {
	
	const handleClose = useCallback((event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') return;    
		setOpen(false);
	}, []);

	return (
		<Snackbar 
			open={open} 
			autoHideDuration={6000}
			onClose={handleClose}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			TransitionComponent={Transition}
		>
			<MuiAlert 
				onClose={handleClose}
				severity={severity}
			>
				{message}
			</MuiAlert>
		</Snackbar>
	);
};

export default memo(Alert);