// Create a single employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: [],
    };
}

// Create multiple employee records
function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

// Add a TimeIn event
function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    });
    return employee;
}

// Add a TimeOut event
function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    });
    return employee;
}

// Calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(e => e.date === date);
    const timeOut = employee.timeOutEvents.find(e => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

// Calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
    const hours = hoursWorkedOnDate(employee, date);
    return hours * employee.payPerHour;
}

// Calculate all wages for an employee
function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(e => e.date);
    return datesWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(employee, date);
    }, 0);
}

// Calculate total payroll for all employees
function calculatePayroll(employees) {
    return employees.reduce((total, employee) => {
        return total + allWagesFor(employee);
    }, 0);
}

// Exporting for testing environments
if (typeof module !== 'undefined') {
    module.exports = {
        createEmployeeRecord,
        createEmployeeRecords,
        createTimeInEvent,
        createTimeOutEvent,
        hoursWorkedOnDate,
        wagesEarnedOnDate,
        allWagesFor,
        calculatePayroll,
    };
}

