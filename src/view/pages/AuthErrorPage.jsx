import React from 'react';
import {useLocation} from "react-router";

function AuthErrorPage() {
  const location = useLocation()
  const errorMsg = decodeURIComponent(location.search.substring(1))
  return <div>{errorMsg}</div>

}

export default AuthErrorPage;
