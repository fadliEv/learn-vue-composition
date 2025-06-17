import { reactive } from "vue"

const state = reactive({
    todos : JSON.parse(localStorage.getItem("todos")) || [
        {id : 1, name : "Sleep", isCompleted : false}
    ],
    theme : localStorage.getItem("theme") || "light"
})

function saveToLocalstorage(){
    localStorage.setItem("todos",JSON.stringify(state.todos))
    localStorage.setItem("theme",state.theme)
}

export default {
    state,
    saveToLocalstorage
}