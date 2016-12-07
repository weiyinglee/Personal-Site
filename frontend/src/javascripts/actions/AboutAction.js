//import dependencies
import $ from "jquery"

//fetch summary
export function fetchAboutSummary() {
	return function(dispatch) {
		$.get("/api/about-info", (response) => {
			let result = response[0]
			dispatch({
				type: "FETCH_ABOUT_SUMMARY",
				payload: result.Summary
			})
		})
	}
}

//fetch intro
export function fetchAboutIntro() {
	return function(dispatch){
		$.get("/api/about-info", (response) => {
			let result = response[0]
			dispatch({ 
				type: "FETCH_ABOUT_INTRO",
				payload: result.Intro 
			})
		})
	}
}

//update intro
export function updateAboutIntro(data) {
	return function(dispatch) {
		$.ajax({
			type: "PUT",
			url: "/api/update-about-info",
			data: data,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(response){
				dispatch({ 
					type: "UPDATE_ABOUT_INTRO",
					payload: response.Message
				})
				location.reload()
			}
		})
	}
}

//update summary
export function updateAboutSummary(data) {
	return function(dispatch) {
		$.ajax({
			type: "PUT",
			url: "/api/update-about-summary",
			data: data,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(response){
				dispatch({ 
					type: "UPDATE_ABOUT_SUMMARY", 
					payload: response.Message
				})
				location.reload()
			}
		})
	}
}