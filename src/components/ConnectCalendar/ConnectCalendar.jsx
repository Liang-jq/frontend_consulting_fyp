import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios";

const ConnectCalendar = ({children}) => {
  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/calendar",
    flow: "auth-code", 
    onSuccess: async (tokenResponse) => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const counsellor_id = storedUser?.counsellor_id;

      try {
        await axios.post(
          "http://localhost/backend_consult/api/saveGoogleToken.php",
          {
            access_token: tokenResponse.access_token,
            counsellor_id: counsellor_id
          }
        );
        alert("Google Calendar Connected & Saved ✅");
      } catch (err) {
        console.log(err);
        alert("Failed to save token");
      }
    },
    onError: () => alert("Connection Failed")
  })
  
  return (
    <div onClick={()=>login()}>
      {children}
    </div>
  )
}

export default ConnectCalendar