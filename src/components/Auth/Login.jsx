import AuthFlow from "../Auth/AuthFlow";

export default function Login({ setLoggedIn }) {
  return <AuthFlow mode="login" setLoggedIn={setLoggedIn} />;
}
