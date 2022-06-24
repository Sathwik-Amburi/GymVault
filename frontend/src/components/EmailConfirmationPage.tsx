import { FC } from "react";
import { useParams } from "react-router-dom";

const EmailConfirmationPage: FC = () => {
  const { email } = useParams();
  return (
    <div>
      <h1> Please check your email to verify your account !</h1>
    </div>
  );
};

export default EmailConfirmationPage;
