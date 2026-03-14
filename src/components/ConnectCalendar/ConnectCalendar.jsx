import { useGoogleLogin } from "@react-oauth/google"

const ConnectCalendar = ({children}) => {
    const login = useGoogleLogin({
        scope:"https://www.googleapis.com/auth/calendar",
        onSuccess:(tokenResponse)=>{
            console.log(tokenResponse);

            localStorage.setItem("google_token",tokenResponse.access_token);

            alert("Google Calendar Connected");
        },
        onError:()=>alert("Connection Failed")
    });
  return (
    <div onClick={()=>login()}>
      {children}
    </div>
  )
}

export default ConnectCalendar