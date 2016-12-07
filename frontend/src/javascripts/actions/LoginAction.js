/* This is the action creator for login */
"user strict"

//import dependencies
import $ from "jquery"
import cookie from "react-cookie"

//login user
export function loginUser(acct, pw) {
	return function(dispatch) {
		$.post("http://localhost:3000/api/Authentication", {
			account: acct,
			password: pw
		}, (res) => {
			console.log(res)

			if(res.login){
				cookie.save("login", res.login)
				location.reload()
			}else{
				alert("Account or Password is not right!")
				$("input").val("")
			}	

			dispatch({type: "USER_LOGIN", payload: res.login})
		})
	}
}