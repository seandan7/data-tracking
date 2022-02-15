import { reactive, readonly } from "vue";

const state = reactive({
  logs: []
});

const addLog = function (logObj) {
  state.logs.push(logObj);
}

export default { state: readonly(state), addLog };