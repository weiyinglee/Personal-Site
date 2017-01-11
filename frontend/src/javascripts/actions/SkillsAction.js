//import dependencies
import $ from "jquery"

export function fetchSkills() {
	return function(dispatch) {
		$.get("http://localhost:3000/api/skill-info", (response) => {
			dispatch({
				type: "FETCH_SKILLS",
				payload: response
			})
		})
	}
}

export function addSkill(data) {
	return function(dispatch) {
		$.post("http://localhost:3000/api/add-skill", data, (response) => {
			dispatch({
				type: "ADD_SKILL",
				payload: response.Message
			})
			location.reload()
		})
	}
}

export function updateSkill(id, data) {
	return function(dispatch) {
		$.ajax({
			type: "PUT",
			url: "http://localhost:3000/api/update-skill/" + id,
			data: data,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(response) {
				dispatch({ type: "UPDATE_SKILL", payload: response.Message })
				location.reload()
			}
		})
	}
}

export function deleteSkill(id) {
	return function(dispatch) {
		$.ajax({
			url: 'http://localhost:3000/api/delete-skill/' + id,
			type: 'DELETE',
			success: function(response){
				dispatch({ type: "DELETE_SKILL", payload: response.Message })
				location.reload()
			}
		})
	}
}