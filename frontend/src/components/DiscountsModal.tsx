import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import DiscountsContent from "./DiscountsContent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SubscriptionTypes } from "../models/allModels";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "5px solid #d91c1f",
  boxShadow: 24,
  p: 4,
  borderRadius: "15px 50px 30px",
};

interface subscriptionOffer {
  subscriptionType: SubscriptionTypes;
  subscriptionPrice: number;
  discount: number;
}

export default function DiscountsModal() {
  const [open, setOpen] = React.useState(false);
  const [subscriptionOffers, setSubscriptionOffers] = React.useState<
    subscriptionOffer[]
  >([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const getSubscriptionOffers = async () => {
    const headers = { "x-access-token": String(localStorage.getItem("token")) };
    const { data } = await axios.get(`gyms/get-gym-by-owner`, { headers });
    const subscriptionOffers: subscriptionOffer[] = data.gym.subscriptionOffers;
    setSubscriptionOffers(subscriptionOffers);
    console.log(subscriptionOffers);
  };

  const editSubscriptionOffers = async (
    subscriptionOffers: subscriptionOffer[]
  ) => {
    const headers = { "x-access-token": String(localStorage.getItem("token")) };
    const { data } = await axios.patch(
      `gyms/edit-subscriptions-discounts`,
      { subscriptionOffers },
      { headers }
    );
    await getSubscriptionOffers();
    handleClose();
  };

  React.useEffect(() => {
    getSubscriptionOffers();
  }, []);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        <i
          style={{ fontSize: "27px", padding: "4px" }}
          className="fa fa-percent"
          aria-hidden="true"
        ></i>{" "}
        Discounts
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DiscountsContent
            editSubscriptionOffers={editSubscriptionOffers}
            subscriptionOffers={subscriptionOffers}
          />
        </Box>
      </Modal>
    </div>
  );
}
