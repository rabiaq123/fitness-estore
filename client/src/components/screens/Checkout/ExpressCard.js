import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: '#e6e6e6',
    minHeight: 30,
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
    setState({state, [event.target.name]: event.target.checked }); //boolean value
    if (event.target.checked === true) {
      alert("A $100.00 CAD S/H fee will be applied to your order.");
    }
  };

  const renderExpressCard = (option) => {
    if (option === false) {
      return (
        <div>
          {console.log("Default selected.")}
          Delivery Date: <b>04/30/2021</b>
        </div>
      );
    } else {
      return (
        <div>
          {console.log("Express selected.")}
          Delivery Date: <b>04/15/2021</b>
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
