//import dependencies
import $ from "jquery"

//fetch work
export function fetchWork() {
	return function(dispatch) {
		$.get("http://localhost:3000/api/experience-info", (response) => {
			dispatch({ type: "FETCH_WORK", payload: response })
		})	
	}
}

//add work
export function addWork(data) {
	return function(dispatch) {
		$.post("http://localhost:3000/api/post-experience", data, (response) => {
			dispatch({ type: "ADD_WORK", payload: response.Message })
			location.reload()
		})
	}
}

//update work
export function updateWork(id, data) {
	return function(dispatch) {
		$.ajax({
			type: "PUT",
			url: "http://localhost:3000/api/update-work/" + id,
			data: data,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(response){
				dispatch({ type: "UPDATE_WORK", payload: response.Message })
				location.reload()
			}
		})
	}	
}

//delete work
export function delWork(id) {
	return function(dispatch) {
		$.ajax({
			type: "DELETE",
			url: "http://localhost:3000/api/delete-work/" + id,
			success: function(response){
				dispatch({ type: "DELETE_WORK", payload: response.Message })
				location.reload()
			}
		})
	}
}