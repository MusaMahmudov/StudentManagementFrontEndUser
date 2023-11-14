import { Button } from "@mui/material";
import "./errorpage.scss";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="error-page">
      <div className="container">
        <div className="content">
          <h1>404</h1>
          <h5>
            <WarningAmberIcon sx={{ fontSize: 40 }} />
            Oops! Page not found!
          </h5>
          <h4>The page you requested was not found.</h4>
        </div>
      </div>
    </div>
  );
};
export default ErrorPage;
