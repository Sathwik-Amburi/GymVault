import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DiscountsContent from './DiscountsContent';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '5px solid #3d5894',
    boxShadow: 24,
    p: 4,
    borderRadius: "15px 50px 30px",
};

export default function DiscountsModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant="outlined" onClick={handleOpen}><i style={{ fontSize: '27px', padding: "4px" }} className="fa fa-percent" aria-hidden="true"></i> Discounts</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <DiscountsContent />
                </Box>
            </Modal>
        </div>
    );
}
