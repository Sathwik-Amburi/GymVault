import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import mainLogo from '../images/gymvault.png';
import TextField from '@mui/material/TextField';
import axios, { AxiosError } from "axios";


/* retrieved from: https://mui.com/material-ui/getting-started/templates/pricing/*/

export default function FrontPage() {

  let [search, setSearch] = React.useState<string>("")

  const handleChange = (event: any) => {
    let newSearchString = search
    newSearchString = event.target.value
    setSearch(newSearchString)
    console.log(search)
  }

  const filter = async () => {

    try {
      const response = await axios.get('/gyms/filter', { params: { search } })
      console.log(response.data)

    } catch (error: any) {
      console.log(error.response.data)
    }

  }

  return (

    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >

      </AppBar>
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          GymVault <img src={mainLogo} style={{ width: "110px", height: "100px", position: "relative", top: "14px" }} alt="fireSpot" />
        </Typography>
        <div style={{ whiteSpace: "pre-wrap", color: "grey", fontStyle: "italic" }}>
          Gym Vault is an online platform to help gym owners and
          potential gym clients connect faster, easier, and hassle free by allowing clientsto browse the large gyms catalog,
          choose the gym that matches their exact needs and pay only for what they use, all fully digitally.
        </div>




      </Container>
      <Container maxWidth="md" component="main">

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
          <TextField onChange={handleChange} style={{ width: '70%' }} fullWidth label="Gym City or Name" id="fullWidth" />
          <i onClick={() => { filter() }} style={{ fontSize: '25px', position: 'relative', right: "40px", top: "15px", cursor: "pointer" }} className="fas fa-search"></i>
        </div>



      </Container>


    </React.Fragment>
  );
}

