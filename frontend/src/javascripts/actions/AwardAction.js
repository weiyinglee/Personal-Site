//import dependencies
import $ from "jquery"

export function fetchAward() {
	return function(dispatch) {
		$.get("http://localhost:3000/api/award-info", (response) => {
			dispatch({
				type: "FETCH_AWARD",
				payload: response
			})
		})
	}
}

export function addAward(data) {
	return function(dispatch) {
		$.post("http://localhost:3000/api/add-award", data, (response) => {
			dispatch({
				type: "ADD_AWARD",
				payload: response.Message
			})
			location.reload()
		})
	}
}

export function updateAward(id, data) {
	return function(dispatch) {
		$.ajax({
			type: "PUT",
			url: "http://localhost:3000/api/update-award/" + id,
			data: data,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(response) {
				dispatch({ type: "UPDATE_AWARD", payload: response.Message })
				location.reload()
			}
		})
	}
}

export function deleteAward(id) {
	return function(dispatch) {
		$.ajax({
			url: 'http://localhost:3000/api/delete-award/' + id,
			type: 'DELETE',
			success: function(response){
				dispatch({ type: "DELETE_AWARD", payload: response.Message })
				location.reload()
			}
		})
	}
}