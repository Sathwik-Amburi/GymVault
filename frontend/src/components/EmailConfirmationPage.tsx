import { FC } from "react";
import { useParams } from "react-router-dom";

const EmailConfirmationPage: FC = () => {
  const { email } = useParams();
  return (
    <div>
      <h1>
        We have sent you an email at {email}. Please check your email to verify
        your account !
      </h1>
    </div>
  );
};

export default EmailConfirmationPage;
