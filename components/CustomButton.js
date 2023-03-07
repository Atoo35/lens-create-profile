import Button from "@mui/material/Button";
import WalletIcon from "@mui/icons-material/Wallet";
import Stack from "@mui/material/Stack";

export default function CustomButton({ onClick, text, icon }) {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        style={{ background: "#ABFE2C", color: "#00501E" }}
        endIcon={icon === "wallet" ? <WalletIcon /> : null}
        onClick={onClick}
      >
        {text}
      </Button>
    </Stack>
  );
}
