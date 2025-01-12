import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  FormControl,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { usePreferences } from "../hooks/usePreferences"; // Import the custom hook

const PersonalizedNewsFeed: React.FC = () => {
  const [open, setOpen] = useState(false);

  // State for temporary changes before saving
  const [tempPreferredSource, setTempPreferredSource] = useState<string>("");
  const [tempPreferredAuthor, setTempPreferredAuthor] = useState<string>("");

  const {
    preferredAuthor,
    setPreferredAuthor,
    preferredSource,
    setPreferredSource,
  } = usePreferences(); // Using the custom hook

  // Load initial preferences from context when modal is opened
  useEffect(() => {
    setTempPreferredSource(preferredSource);
    setTempPreferredAuthor(preferredAuthor);
  }, [preferredSource, preferredAuthor]);

  const handleSettingsOpen = () => setOpen(true);
  const handleSettingsClose = () => setOpen(false);

  const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempPreferredSource(event.target.value); // Temporarily store source change
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempPreferredAuthor(event.target.value); // Temporarily store author change
  };

  const handleSavePreferences = () => {
    // Save the changes to context (and localStorage) only when "Save Preferences" is clicked
    setPreferredSource(tempPreferredSource);
    setPreferredAuthor(tempPreferredAuthor);

    setOpen(false);
  };

  return (
    <Box>
      <IconButton onClick={handleSettingsOpen}>
        <SettingsIcon />
      </IconButton>

      <Modal open={open} onClose={handleSettingsClose}>
        <Box sx={{ ...modalStyle }}>
          <h2>Customize Your News Feed</h2>

          <FormControl fullWidth>
            <TextField
              label="Preferred Sources"
              fullWidth
              value={tempPreferredSource} // Temporary value
              onChange={handleSourceChange}
              placeholder="Enter news sources"
              sx={{ marginTop: 2 }}
            />
          </FormControl>

          <TextField
            label="Preferred Authors"
            fullWidth
            value={tempPreferredAuthor} // Temporary value
            onChange={handleAuthorChange}
            sx={{ marginTop: 2 }}
            placeholder="Enter author names"
          />

          <Box sx={{ marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSavePreferences}
            >
              Save Preferences
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

// Modal style
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "16px",
  boxShadow: 24,
  borderRadius: "8px",
  minWidth: "400px",
};

export default PersonalizedNewsFeed;
