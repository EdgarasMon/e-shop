import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

interface WarningProps {
  warningMessage: string;
  warningType: string;
  closeWarning: Function;
}

export default function Warning(props: WarningProps) {
  const { warningMessage, warningType, closeWarning } = props;

  const info = warningType === "info" ? "info" : null;
  const error = warningType === "error" ? "error" : null;
  const warning = warningType === "warning" ? "warning" : null;
  const success = warningType === "success" ? "success" : null;

  return (
    <Alert
      // severity={info || error || warning || success}
      variant='filled'
      onClose={() => closeWarning()}
    >
      <AlertTitle>{warningType}</AlertTitle>
      {warningMessage}
    </Alert>
  );
}
