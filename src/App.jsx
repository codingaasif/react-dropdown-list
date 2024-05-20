import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { AlertBox, BoxContainer, Text } from "./App";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";

export default function App() {
  const [options, setOptions] = useState([]);
  const [showData, setShowData] = useState(new Set());
  const [showDropDown, setShowDropDown] = useState(false);
  const [alert, setAlert] = useState(false);

  const dropdownList = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/quotes");
      const data = response.data;
      setOptions(data.quotes);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    dropdownList();
  }, []);

  const handleOnChange = (event, value) => {
    if (showData.has(value)) {
      setAlert(true);
    }
    setShowData((prev) => new Set([...prev, value]));
  };

  const handleDeleteQuote = (index) => {
    const updatedData = Array.from(showData).filter((_, i) => i !== index);
    setShowData(new Set(updatedData));
    setAlert(false);
  };

  return (
    <BoxContainer>
      <AlertBox>
        {alert && (
          <Alert severity="warning" sx={{ fontSize: 18 }}>
            Quote is already added.
          </Alert>
        )}
      </AlertBox>
      <Typography variant="h4" component="h2" gutterBottom="5px">
        React Dropdown
      </Typography>
      <Box>
        <Button
          size="large"
          color="primary"
          variant="outlined"
          sx={{ marginBottom: 2 }}
          onMouseOver={() => setShowDropDown(true)}
        >
          Show Dropdown List
        </Button>
      </Box>

      {showDropDown && (
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          onChange={handleOnChange}
          options={options.map((option) => option.quote)}
          sx={{ width: 500 }}
          renderInput={(params) => (
            <TextField {...params} label="Quotes List" />
          )}
        />
      )}

      {Array.from(showData).map((data, index) => {
        return (
          <Box key={index} sx={{ width: 500 }}>
            <Text sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {data}
              <DeleteIcon
                sx={{ cursor: "pointer", color: "red" }}
                onClick={() => handleDeleteQuote(index)}
              />
            </Text>
          </Box>
        );
      })}
    </BoxContainer>
  );
}
