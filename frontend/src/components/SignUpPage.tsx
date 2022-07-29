import { FC, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ApiCalls from "../api/apiCalls";
import { useNavigate } from "react-router";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { setAuthentication } from "../store/slices/authenticationSlice";
import * as yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
} from "@mui/material";
import style from "../css/google.module.css";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { NavLink } from "react-router-dom";
import * as React from "react";
const theme = createTheme();

export interface ValidationState {
  status: "" | "success" | "warning" | "error" | "validating";
  message: string;
}

const SignUpPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      if (passwordValidation.status !=="success"){
          return
      }
      const data = new FormData(event.currentTarget);
    const email = data.get("email");
    ApiCalls.registerUser(
      data.get("firstName"),
      data.get("lastName"),
      data.get("phoneNumber"),
      data.get("email"),
      data.get("password")
    )
      .then(() => {
        navigate(`/user/confirmation/${email}`);
      })
      .catch((error) => {
        if (error.response.data.error.type === "DUPLICATE_EMAIL") {
          setRegistrationValidation({
            status: "error",
            message: "This email is already in use.",
          });
        }
      });
  };

  const [tosPopupOpen, setTosPopupOpen] = useState(false);
  const [passwordValidation,setPasswordValidation] = useState<ValidationState>({
      status: "",
      message: "",
  });
  const[password,setPassword] = useState("")

    const [passRegex,setPassRegex] = useState(true)


    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        let decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if (!event.target.value.match(decimal)){
            setPasswordValidation({
                status: "warning",
                message: "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
            })
            setPassRegex(false)
        }
        else{
            setPassRegex(true)
            setPasswordValidation({
                status: "validating",
                message: "passwords match regex",
            })
        }
            setPassword(event.target.value);


    };

    const handleConfirmPassword = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {

        if (event.target.value !== password){
            setPasswordValidation({
                status: "error",
                message: "passwords don't match",
            })
            return  false
        }else {
            if(passRegex){
                setPasswordValidation({
                    status: "success",
                    message: "passwords match",
                })
            }
            else{
                setPasswordValidation({
                    status: "validating",
                    message: "passwords match but does not match regex",
                })
            }
        }
    };

  const [registrationValidation, setRegistrationValidation] =
    useState<ValidationState>({
      status: "",
      message: "",
    });

  const googleSignUp = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      let response = await axios.post("oauth/google", {
        token: tokenResponse,
        flow: "auth",
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", "user");
        dispatch(setAuthentication({ isAuthenticated: true, role: "user" }));
        navigate("/");
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
            noValidate={false}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  id="email"
                  error={
                    registrationValidation.status === "error" ? true : false
                  }
                  helperText={
                    registrationValidation.status === "error"
                      ? registrationValidation.message
                      : null
                  }
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phone_number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handlePasswordChange}
                  value={password}
                  error={passRegex ===false}
                  helperText={passRegex ===false?"Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character":null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirm-password"
                  onChange={handleConfirmPassword}
                  error={
                      passwordValidation.status === "error"
                  }
                  helperText={ passwordValidation.status ==="error" ?"Passwords don't Match":null}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="TC" color="primary" required={true} />
                  }
                  label={
                    <span>
                      I have read the{" "}
                      <Link onClick={() => setTosPopupOpen(true)}>
                        Terms and Conditions
                      </Link>{" "}
                      and agree to them.{" "}
                    </span>
                  }
                />
                <BootstrapDialog
                  open={tosPopupOpen}
                  onClose={() => setTosPopupOpen(false)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={() => setTosPopupOpen(false)}
                  >
                    GymVault Terms and Conditions
                  </BootstrapDialogTitle>
                  <DialogContent dividers sx={{ width: 500 }}>
                    {getTermsOfService()}
                  </DialogContent>
                </BootstrapDialog>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>

            <button
              type="button"
              onClick={() => googleSignUp()}
              className={style.google}
            >
              Google Sign Up
            </button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/user/login" style={{ color: "blue" }}>
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

const getTermsOfService = () => {
  return (
    <>
      <h2>
        <strong>Terms and Conditions</strong>
      </h2>

      <p>Welcome to GymVault!</p>

      <p>
        These terms and conditions outline the rules and regulations for the use
        of GymVault's Website, located at https://www.gymvault.eu.
      </p>

      <p>
        By accessing this website we assume you accept these terms and
        conditions. Do not continue to use GymVault if you do not agree to take
        all of the terms and conditions stated on this page.
      </p>

      <p>
        The following terminology applies to these Terms and Conditions, Privacy
        Statement and Disclaimer Notice and all Agreements: "Client", "You" and
        "Your" refers to you, the person log on this website and compliant to
        the Company’s terms and conditions. "The Company", "Ourselves", "We",
        "Our" and "Us", refers to our Company. "Party", "Parties", or "Us",
        refers to both the Client and ourselves. All terms refer to the offer,
        acceptance and consideration of payment necessary to undertake the
        process of our assistance to the Client in the most appropriate manner
        for the express purpose of meeting the Client’s needs in respect of
        provision of the Company’s stated services, in accordance with and
        subject to, prevailing law of Netherlands. Any use of the above
        terminology or other words in the singular, plural, capitalization
        and/or he/she or they, are taken as interchangeable and therefore as
        referring to same.
      </p>

      <h3>
        <strong>Cookies</strong>
      </h3>

      <p>
        We employ the use of cookies. By accessing GymVault, you agreed to use
        cookies in agreement with the GymVault's Privacy Policy.{" "}
      </p>

      <p>
        Most interactive websites use cookies to let us retrieve the user’s
        details for each visit. Cookies are used by our website to enable the
        functionality of certain areas to make it easier for people visiting our
        website. Some of our affiliate/advertising partners may also use
        cookies.
      </p>

      <h3>
        <strong>License</strong>
      </h3>

      <p>
        Unless otherwise stated, GymVault and/or its licensors own the
        intellectual property rights for all material on GymVault. All
        intellectual property rights are reserved. You may access this from
        GymVault for your own personal use subjected to restrictions set in
        these terms and conditions.
      </p>

      <p>You must not:</p>
      <ul>
        <li>Republish material from GymVault</li>
        <li>Sell, rent or sub-license material from GymVault</li>
        <li>Reproduce, duplicate or copy material from GymVault</li>
        <li>Redistribute content from GymVault</li>
      </ul>

      <p>
        This Agreement shall begin on the date hereof. Our Terms and Conditions
        were created with the help of the{" "}
        <a href="https://www.termsfeed.com/terms-conditions-generator/">
          TermsFeed Free Terms and Conditions Generator
        </a>
        .
      </p>

      <p>
        Parts of this website offer an opportunity for users to post and
        exchange opinions and information in certain areas of the website.
        GymVault does not filter, edit, publish or review Comments prior to
        their presence on the website. Comments do not reflect the views and
        opinions of GymVault,its agents and/or affiliates. Comments reflect the
        views and opinions of the person who post their views and opinions. To
        the extent permitted by applicable laws, GymVault shall not be liable
        for the Comments or for any liability, damages or expenses caused and/or
        suffered as a result of any use of and/or posting of and/or appearance
        of the Comments on this website.
      </p>

      <p>
        GymVault reserves the right to monitor all Comments and to remove any
        Comments which can be considered inappropriate, offensive or causes
        breach of these Terms and Conditions.
      </p>

      <p>You warrant and represent that:</p>

      <ul>
        <li>
          You are entitled to post the Comments on our website and have all
          necessary licenses and consents to do so;
        </li>
        <li>
          The Comments do not invade any intellectual property right, including
          without limitation copyright, patent or trademark of any third party;
        </li>
        <li>
          The Comments do not contain any defamatory, libelous, offensive,
          indecent or otherwise unlawful material which is an invasion of
          privacy
        </li>
        <li>
          The Comments will not be used to solicit or promote business or custom
          or present commercial activities or unlawful activity.
        </li>
      </ul>

      <p>
        You hereby grant GymVault a non-exclusive license to use, reproduce,
        edit and authorize others to use, reproduce and edit any of your
        Comments in any and all forms, formats or media.
      </p>

      <h3>
        <strong>Hyperlinking to our Content</strong>
      </h3>

      <p>
        The following organizations may link to our Website without prior
        written approval:
      </p>

      <ul>
        <li>Government agencies;</li>
        <li>Search engines;</li>
        <li>News organizations;</li>
        <li>
          Online directory distributors may link to our Website in the same
          manner as they hyperlink to the Websites of other listed businesses;
          and
        </li>
        <li>
          System wide Accredited Businesses except soliciting non-profit
          organizations, charity shopping malls, and charity fundraising groups
          which may not hyperlink to our Web site.
        </li>
      </ul>

      <p>
        These organizations may link to our home page, to publications or to
        other Website information so long as the link: (a) is not in any way
        deceptive; (b) does not falsely imply sponsorship, endorsement or
        approval of the linking party and its products and/or services; and (c)
        fits within the context of the linking party’s site.
      </p>

      <p>
        We may consider and approve other link requests from the following types
        of organizations:
      </p>

      <ul>
        <li>commonly-known consumer and/or business information sources;</li>
        <li>dot.com community sites;</li>
        <li>associations or other groups representing charities;</li>
        <li>online directory distributors;</li>
        <li>internet portals;</li>
        <li>accounting, law and consulting firms; and</li>
        <li>educational institutions and trade associations.</li>
      </ul>

      <p>
        We will approve link requests from these organizations if we decide
        that: (a) the link would not make us look unfavorably to ourselves or to
        our accredited businesses; (b) the organization does not have any
        negative records with us; (c) the benefit to us from the visibility of
        the hyperlink compensates the absence of GymVault; and (d) the link is
        in the context of general resource information.
      </p>

      <p>
        These organizations may link to our home page so long as the link: (a)
        is not in any way deceptive; (b) does not falsely imply sponsorship,
        endorsement or approval of the linking party and its products or
        services; and (c) fits within the context of the linking party’s site.
      </p>

      <p>
        If you are one of the organizations listed in paragraph 2 above and are
        interested in linking to our website, you must inform us by sending an
        e-mail to GymVault. Please include your name, your organization name,
        contact information as well as the URL of your site, a list of any URLs
        from which you intend to link to our Website, and a list of the URLs on
        our site to which you would like to link. Wait 2-3 weeks for a response.
      </p>

      <p>Approved organizations may hyperlink to our Website as follows:</p>

      <ul>
        <li>By use of our corporate name; or</li>
        <li>By use of the uniform resource locator being linked to; or</li>
        <li>
          By use of any other description of our Website being linked to that
          makes sense within the context and format of content on the linking
          party’s site.
        </li>
      </ul>

      <p>
        No use of GymVault's logo or other artwork will be allowed for linking
        absent a trademark license agreement.
      </p>

      <h3>
        <strong>iFrames</strong>
      </h3>

      <p>
        Without prior approval and written permission, you may not create frames
        around our Webpages that alter in any way the visual presentation or
        appearance of our Website.
      </p>

      <h3>
        <strong>Content Liability</strong>
      </h3>

      <p>
        We shall not be hold responsible for any content that appears on your
        Website. You agree to protect and defend us against all claims that is
        rising on your Website. No link(s) should appear on any Website that may
        be interpreted as libelous, obscene or criminal, or which infringes,
        otherwise violates, or advocates the infringement or other violation of,
        any third party rights.
      </p>

      <h3>
        <strong>Your Privacy</strong>
      </h3>

      <p>Please read Privacy Policy</p>

      <h3>
        <strong>Reservation of Rights</strong>
      </h3>

      <p>
        We reserve the right to request that you remove all links or any
        particular link to our Website. You approve to immediately remove all
        links to our Website upon request. We also reserve the right to amen
        these terms and conditions and it’s linking policy at any time. By
        continuously linking to our Website, you agree to be bound to and follow
        these linking terms and conditions.
      </p>

      <h3>
        <strong>Removal of links from our website</strong>
      </h3>

      <p>
        If you find any link on our Website that is offensive for any reason,
        you are free to contact and inform us any moment. We will consider
        requests to remove links but we are not obligated to or so or to respond
        to you directly.
      </p>

      <p>
        We do not ensure that the information on this website is correct, we do
        not warrant its completeness or accuracy; nor do we promise to ensure
        that the website remains available or that the material on the website
        is kept up to date.
      </p>

      <h3>
        <strong>Disclaimer</strong>
      </h3>

      <p>
        To the maximum extent permitted by applicable law, we exclude all
        representations, warranties and conditions relating to our website and
        the use of this website. Nothing in this disclaimer will:
      </p>

      <ul>
        <li>
          limit or exclude our or your liability for death or personal injury;
        </li>
        <li>
          limit or exclude our or your liability for fraud or fraudulent
          misrepresentation;
        </li>
        <li>
          limit any of our or your liabilities in any way that is not permitted
          under applicable law; or
        </li>
        <li>
          exclude any of our or your liabilities that may not be excluded under
          applicable law.
        </li>
      </ul>

      <p>
        The limitations and prohibitions of liability set in this Section and
        elsewhere in this disclaimer: (a) are subject to the preceding
        paragraph; and (b) govern all liabilities arising under the disclaimer,
        including liabilities arising in contract, in tort and for breach of
        statutory duty.
      </p>

      <p>
        As long as the website and the information and services on the website
        are provided free of charge, we will not be liable for any loss or
        damage of any nature.
      </p>
    </>
  );
};

export default SignUpPage;

// shamelessly copied lol
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
