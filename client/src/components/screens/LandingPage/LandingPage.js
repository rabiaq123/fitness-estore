import React from "react";
import Carousel from "../../utils/Carousel/Carousel";
import { Box } from "grommet";
import clearLoginPopup from '../../state/actions/loginPopupClearAction';
import clearLogoutPopup from '../../state/actions/logoutPopupClearAction';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from "@material-ui/core"
import MuiAlert from '@material-ui/lab/Alert';

export default function LandingPage() {
  // Closes the modals
  const isLoginPopup = useSelector(state => state.isLogged);
  const isLogoutPopup = useSelector(state => state.isLogged);
  const dispatch = useDispatch();

  const [isLoginPopupState, setIsLoginPopupState] = React.useState(isLoginPopup);
  const [isLogoutPopupState, setIsLogoutPopupState] = React.useState(isLogoutPopup);

  const handleClose = () => {
    dispatch(clearLoginPopup());
    dispatch(clearLogoutPopup());
    setIsLoginPopupState(false);
    setIsLogoutPopupState(false);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  return (
    <div>
      <Box
        gridArea="main"
        direction="row"
        pad="medium"
        width={{
          max: "1200px",
        }}
        style={{ margin: "auto", marginTop: 50 }}
      >
        <Carousel />
      </Box>
      <Snackbar open={isLoginPopupState} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          You have successfully logged in!
        </Alert>
      </Snackbar>
    </div>
  );
}
