//import dependencies
import $ from "jquery"

//fetch project
export function fetchProject() {
	return function(dispatch) {
		$.get("/api/project-info", (response) => {
			dispatch({ type: "FETCH_PROJECT", payload: response })
		})
	}
}

//add project
export function addProject(data) {
	return function(dispatch) {
		$.post("/api/post-project-info", data, (response) => {
			dispatch({ type: "ADD_PROJECT", payload: response.Message })
			location.reload()
		})
	}
}

//delete project
export function deleteProject(id) {
	return function(dispatch) {
		$.ajax({
			url: '/api/delete-project-info/' + id,
			type: 'DELETE',
			success: function(response){
				dispatch({ type: "DELETE_PROJECT", payload: response.Message })
				location.reload()
			}
		})
	}
}

//update project
export function updateProject(id, data) {
	return function(dispatch) {
		$.ajax({
			type: "PUT",
			url: "/api/update-project-info/" + id,
			data: data,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(response){
				dispatch({ type: "UPDATE_PROJECT", payload: response.Message })
				location.reload()
			}
		})
	}
}