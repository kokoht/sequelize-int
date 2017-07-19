module.exports = {
  manageRole(role) {
    let option = [];
    switch (role) {
      case "teacher":
        option = ["dashboard", "students"]
        return option
        break;
      case "academic":
        option = ["dashboard", "students", "subjects"]
        return option
        break;
      case "headmaster":
        option = ["dashboard", "students", "subjects", "teachers"]
        return option
        break;
      default:
        return "dashboard"
    }
  }
};
