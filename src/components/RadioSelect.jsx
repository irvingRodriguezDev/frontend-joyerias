import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function ControlledRadioButtonsGroup({
  setValue,
  handleChange,
  value,
}) {
  return (
    <FormControl>
      <FormLabel id='demo-controlled-radio-buttons-group'>
        Selecciona una opcion
      </FormLabel>
      <RadioGroup
        aria-labelledby='demo-controlled-radio-buttons-group'
        name='controlled-radio-buttons-group'
        value={value}
        onChange={handleChange}
      >
        <div style={{ direction: "row" }}>
          <FormControlLabel
            value='barcode'
            control={<Radio />}
            label='Codigo de Barras'
          />
          <FormControlLabel
            value='selectProducts'
            control={<Radio />}
            label='Seleccionar producto'
          />
        </div>
      </RadioGroup>
    </FormControl>
  );
}
