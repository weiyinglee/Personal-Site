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
			if(res.login){
				cookie.save("user", res)
				location.reload()
			}else{
				alert(res.message)
				$("input").val("")
			}	

			dispatch({type: "USER_LOGIN", payload: res.login})
		})
	}
}

//reg user
export function regUser(acct, pw) {
	return function(dispatch) {
		$.post("http://localhost:3000/api/reg", {
			account: acct,
			password: pw
		}, (res) => {
			if(res.login) {
				cookie.save("user", res)
				location.reload()
			}else {
				alert(res.message)
				$("input").val("")
			}

			dispatch({type: "USER_LOGIN", payload: res.login})
		})
	}
}