export default {
  hostname: 'http://100.90.100.22:5000/api',
  api: {
    login: '/login', // body = {"username", "password"}
    logout: '/logout', // body = {"username", "password"}
    getTasks: '/get_tasks',
    getTaskDetails: '/get_task_details',
    getUsers: '/get_users',
    getGroups: '/get_groups',
    getSubjects: '/get_subjects',
    getSolutionDetails: '/get_solution_details',
    getSolutionByUser: '/get_solutions_by_user',
    getSolutionByGroup: '/get_solutions_by_group',
    checkSolution: '/check_solution',
    submitSolution: '/submit_solution',
    editUser: '/edit_user',
    editTask: '/edit_task',
    editSubject: '/edit_subject',
    createUser: '/create_user',
    createTask: '/create_task',
    createSubject: '/create_subject',
    createGroup: '/create_group'
  }
}
