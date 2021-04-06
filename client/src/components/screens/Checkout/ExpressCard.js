import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: '#d9d9d9',
    minHeight: 40
  },
  title: {
    fontSize: 16,
    marginTop: 10
  },
  pos: {
    marginBottom: 10,
  },
});

export default function OutlinedCard() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    ExpressDelivery: false
  });

  const handleChange = (event) => {
    setState({state, [event.target.name]: event.target.checked });
    //console.log("EXPRESS SELECTED =", event.target.checked);
  };

  const renderExpressCard = (option) => {
    if (option === false) {
      return (
        <div>
          {console.log("Default selected.")}
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Delivery Date: <b>05/13/2021</b>
          </Typography>
        </div>
      );
    } else {
      return (
        <div>
          {console.log("Express selected.")}
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Delivery Date: <b>04/20/2021</b>
          </Typography>
          <p>A <b>$100.00 CAD</b> S/H fee will be applied to your order.</p>
        </div>
      );
    }
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
              checked={state.ExpressDelivery}
                onChange={handleChange}
                name="ExpressDelivery"
              />
            }
            label="Express Shipping"
          />
        </FormGroup>
        {renderExpressCard(state.ExpressDelivery)}
      </CardContent>
    </Card>
  );
}
