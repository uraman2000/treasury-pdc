import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import RegionRepository from "../Library/RegionRepository";
import { makeStyles } from "@material-ui/styles";
import SummaryApiRepository from "../Library/SummaryApiRepository";

const useStyles = makeStyles({
  root: {
    width: "10%"
  }
});

interface IProps {
  callback: any;
}

export default function RegionSelector(props: IProps) {
  const classes = useStyles();

  const [region, setregion] = useState();
  const [selectedRegion, setSelectedRegion] = React.useState("");

  useEffect(() => {
    const fetchData = async () => {
      const regionData = await RegionRepository.All();
      setregion(regionData);
    };
    fetchData();
  }, []);

  const handleChange = async (event: any) => {
    const regionID: string = event.target.value as string;
    props.callback(regionID);
    setSelectedRegion(regionID);
  };

  if (!region) return null;

  return (
    <>
      <FormControl variant="filled" className={classes.root}>
        <InputLabel id="demo-simple-select-helper-label">Region</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selectedRegion}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {region.map((item: any, key: any) => (
            <MenuItem key={key} value={item.id}>
              {item.region_code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
