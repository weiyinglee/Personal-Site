//import dependencies
import $ from "jquery"

export function fetchMessage() {
	return function(dispatch) {
		$.get("http://localhost:3000/api/get-message", (response) => {
			dispatch({
				type: "FETCH_MESSAGE",
				payload: response
			})
		})
	}
}

export function addMessage(data) {
	return function(dispatch) {
		$.post("http://localhost:3000/api/add-message", data, (response) => {
			dispatch({
				type: "ADD_MESSAGE",
				payload: response.message
			})
			location.reload()
		})
	}
}

export function updateMessage(id, data) {
	return function(dispatch) {
		$.ajax({
			type: "PUT",
			url: "http://localhost:3000/api/update-message/" + id,
			data: data,
			dataType: "json",
			success: function(response) {
				dispatch({ type: "UPDATE_MESSAGE", payload: response.message })
				location.reload()
			}
		})
	}
}

export function deleteMessage(id) {
	return function(dispatch) {
		$.ajax({
			url: 'http://localhost:3000/api/delete-message/' + id,
			type: 'DELETE',
			success: function(response){
				dispatch({ type: "DELETE_MESSAGE", payload: response.message })
				location.reload()
			}
		})
	}
}

export function addResponse(id, data) {
	return function(dispatch) {
		$.ajax({
			type: "PUT",
			url: "http://localhost:3000/api/add-response/" + id,
			data: data,
			dataType: "json",
			success: function(response){
				dispatch({ type: "ADD_RESPONSE", payload: response.message })
				location.reload()
			}
		})
	}
}