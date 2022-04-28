const { subDays, addDays } = require('date-fns');

var faker = require('faker');

var database = { cashup: [], reports: [], employees: [], shift_calendar: [], attendance: [], Payroll: [], shift: [], leaves: [], Request: [] };
const NO_OF_RECORDS = 200;
const NO_OF_REPORTS = 5;

// Helping Functions 

function formattedDate(d) {
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}



randomEPOS_TAKING = function () {
    const randomNumber = faker.datatype.number({ min: 2, max: 5 })
    var results = [];
    for (let index = 0; index < randomNumber; index++) {
        results.push({
            Food: faker.datatype.number({ min: 20, max: 100 }),
            Drinks: faker.datatype.number({ min: 20, max: 100 }),
            TakeAway: faker.datatype.number({ min: 60, max: 150 }),
            Other: faker.datatype.number({ min: 20, max: 100 }),
            Vat: faker.datatype.number({ min: 20, max: 100 }),
            Scharges: faker.datatype.number({ min: 20, max: 100 }),
            CCTips: faker.datatype.number({ min: 0, max: 10 }),
        })
    }
    return results;
}
randomPETTY_CASH = function () {
    const randomNumber = faker.datatype.number({ min: 1, max: 2 })
    var results = [];
    for (let index = 0; index < randomNumber; index++) {
        results.push({
            Food_and_Drinks: faker.datatype.number({ min: 20, max: 50 }),
            Maintainance: faker.datatype.number({ min: 20, max: 40 }),
            Repairs: faker.datatype.number({ min: 60, max: 150 }),
            Other: faker.datatype.number({ min: 100, max: 200 }),
            Sundries: faker.datatype.number({ min: 100, max: 200 }),
        })
    }
    return results;
}
randomPDQ_TAKINGS = function () {
    const randomNumber = faker.datatype.number({ min: 1, max: 2 })
    var results = [];
    for (let index = 0; index < randomNumber; index++) {
        results.push({
            Visa: faker.datatype.number({ min: 20, max: 50 }),
            Amex: faker.datatype.number({ min: 20, max: 40 }),
        })
    }
    return results;
}
randomTHIRD_PARTY = function () {
    const randomNumber = faker.datatype.number({ min: 1, max: 2 })
    var results = [];
    for (let index = 0; index < randomNumber; index++) {
        results.push({
            Zomato: faker.datatype.number({ min: 20, max: 50 }),
            JustEat: faker.datatype.number({ min: 20, max: 40 }),
            Deliveroo: faker.datatype.number({ min: 20, max: 40 }),
            UberEats: faker.datatype.number({ min: 20, max: 40 }),
        })
    }
    return results;
}
randomTILL = function () {
    const randomNumber = faker.datatype.number({ min: 1, max: 2 })
    var results = [];
    for (let index = 0; index < randomNumber; index++) {
        results.push({
            Food_and_Drinks: faker.datatype.number({ min: 20, max: 50 }),
            Maintainance: faker.datatype.number({ min: 20, max: 40 }),
            Repairs: faker.datatype.number({ min: 60, max: 150 }),
            Other: faker.datatype.number({ min: 100, max: 200 }),
        })
    }
    return results;
}


//Employee helper functions; 
empBasicInformation = function () {
    var result = {};
    result.joiningInfo = { joiningDate: faker.date.recent() };

    result.empDetails = {
        empImgUrl: faker.image.avatar(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        middleName: faker.name.firstName(),
        addr: faker.address.streetAddress(),
        zip: faker.datatype.number({ min: 410000, max: 600000 }),
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.random.arrayElement(["India", "England"]),
        email: faker.internet.email(),
        mobile: faker.datatype.number({ min: 9000000, max: 10000000 }),
        telephone: faker.datatype.number({ min: 910000, max: 990000 }),

    }

    result.deptDetails = {
        department: faker.random.arrayElement(["FOH", "BOH", "Management"]),
        position: faker.random.arrayElement(["Manager", "Chef", "Waiter"])
    }

    result.PrimarylocationDetails = []
    const RN = faker.datatype.number({ min: 1, max: 1 })
    for (let index = 0; index < RN; index++) {
        result.PrimarylocationDetails.push({
            Primarylocation: faker.random.arrayElement(["ABT Cafe", "Creams Cafe", "Cafe 3"]),
            isPrimary: true,
        })
    }
    result.locationDetails = {
        location: faker.random.arrayElement(["ABT Cafe", "Creams Cafe", "Cafe 3"]),
    }

    result.kinInfo = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        middleName: faker.name.firstName(),
        addr: faker.address.streetAddress(),
        zip: faker.datatype.number({ min: 410000, max: 600000 }),
        email: faker.internet.email(),
        mobile: faker.datatype.number({ min: 9000000, max: 10000000 }),
        telephone: faker.datatype.number({ min: 910000, max: 990000 }),
        relation: faker.random.arrayElement(["Wife", "Father", "Mother"])
    }

    return result;
}

empBankDetails = function () {
    var result = {};

    result.BankInfo = {
        BankName: faker.company.companyName(),
        BranchAcc: faker.finance.account(),
        AccHolderName: faker.name.firstName(),
        BranchSortCode: faker.datatype.number({ min: 1000000, max: 10000000 }),
        AccNumber: faker.finance.creditCardNumber(),
    }

    result.salaryInfo = {
        EmployeeType: faker.random.arrayElement(["Hourly Employee", "Weekly Employee", "Monthly Employee"]),
        Salary: faker.finance.amount(),
    }

    return result;
}

empDocumentDetails = function () {
    var result = {};

    result.docInfo = {
        DocName: faker.name.firstName(),
        DocType: faker.random.arrayElement(["Contract"]),
        DocDesscription: faker.random.arrayElement(["Passport"]),
        AttachmentName: faker.system.fileName(),
    }

    return result;
}


empStatutory = function () {
    var result = {};

    result.BankInfo = {
        Nationality: faker.address.country(),
        PlaceofBirth: faker.address.city(),
        DateofBirth: faker.date.past(),
        Gender: faker.random.arrayElement(["Male", "Female", "Other"]),
        Age: faker.datatype.number({ min: 20, max: 45 }),
        MaritalStatus: faker.random.arrayElement(["Single", "Married"]),
        PassportNumber: faker.datatype.number({ min: 10000000, max: 100000000 }),

    }

    result.NInumber = {
        HavingNInumber: faker.random.arrayElement(["Yes", "No"]),
        NInumber: faker.datatype.number({ min: 10000000, max: 10000000 }),
    }

    result.Tax = {
        HavingtaxP45: faker.random.arrayElement([true, false]),
    }

    return result;
}


empStatementsDetails = function () {
    var result = {};

    result.EmployeeStatement = {
        Statement: faker.random.arrayElement(["Statement1", "Statement2", "Statement3"]),
    }

    result.studentLoan = {
        studentLoan: faker.random.arrayElement(["Yes", "No"]),
    }

    result.medicalCondition = {
        MedicalCondition: faker.random.arrayElement(["Weak EyeSight"]),
    }

    return result;
}


//Attendance helper functions; 
empAttendance = function () {
    var result = {};

    result.empAttendanceDetails = []
    const randomNumber = faker.datatype.number({ min: 5, max: 20 })
    for (let index = 0; index < randomNumber; index++) {
        result.empAttendanceDetails.push({
            id: index,
            empName: faker.name.firstName(),
            empImgUrl: faker.image.avatar(),
            department: faker.random.arrayElement(["FOH", "BOH", "Management"]),
            status: faker.random.arrayElement(["On Duty", "Off Duty", "On leave"]),
        })
    }
    return result;
}

for (let index = 0; index < NO_OF_RECORDS; index++) {
    const randomNumber = faker.datatype.number({ min: 5, max: 10 })
    const EPOS = randomEPOS_TAKING();
    const Petty_Cash = randomPETTY_CASH();
    const TILL = randomTILL();
    const pdq = randomPDQ_TAKINGS();
    const ThirdParty = randomTHIRD_PARTY();
    database.cashup.push({
        id: faker.datatype.number({ min: 1, max: 100 }),
        DATE: faker.date.recent(),
        TIME: faker.random.arrayElement(["AM", "PM"]),
        EPOS: randomNumber,
        CASH: randomNumber,
        PDQ: randomNumber,
        DELIVERY: randomNumber,
        DIFFERENCE: randomNumber * (-1),
        KPI_TOTAL: randomNumber * 3,
        VOID: randomNumber,
        DISCOUNT: randomNumber,
        REFUNDS: randomNumber,
        STATUS: faker.random.arrayElement(["Published", "Draft"]),
        EPOS_TAKING: EPOS,
        PETTY_CASH: Petty_Cash,
        Till: TILL,
        PDQ_TAKINGS: pdq,
        THIRD_PARTY: ThirdParty,
    });
}

randomShowDiv = function () {
    var results;
    results = {
        Epos: faker.datatype.boolean(),
        food: faker.datatype.boolean(),
        drinks: faker.datatype.boolean(),
        takeAway: faker.datatype.boolean(),
        others: faker.datatype.boolean(),
        vat: faker.datatype.boolean(),
        seviceCharges: faker.datatype.boolean(),
        creditCardTips: faker.datatype.boolean(),


        PettyCash: faker.datatype.boolean(),
        foodDrink: faker.datatype.boolean(),
        repair: faker.datatype.boolean(),
        maintenance: faker.datatype.boolean(),
        sundries: faker.datatype.boolean(),


        Pdq: faker.datatype.boolean(),
        debit: faker.datatype.boolean(),
        visa: faker.datatype.boolean(),
        amex: faker.datatype.boolean(),


        ThirdPartyTakings: faker.datatype.boolean(),
        zomato: faker.datatype.boolean(),
        delivaro: faker.datatype.boolean(),


        PendingDeposit: faker.datatype.boolean(),


        BankingDetails: faker.datatype.boolean(),
        giroSlipNumber: faker.datatype.boolean(),
        bankingTotal: faker.datatype.boolean(),
        bankedTotal: faker.datatype.boolean(),
        cashupSheetDate: faker.datatype.boolean(),
        sealedBy: faker.datatype.boolean(),
    }
    return results;
}

for (let index = 0; index < NO_OF_REPORTS; index++) {
    const showdiv = randomShowDiv();
    database.reports.push({
        id: index,
        ReportName: faker.random.arrayElement(["Cash and PDQ Report", "EPOS and Third Party Report", "Epos, KPI and Third Party Report"]),
        DATE: faker.date.recent(),
        FromDATE: faker.date.past(),
        ToDATE: faker.date.soon(),
        UserName: faker.random.arrayElement(["John Doe", "Alex", "Bob"]),
        showDiv: showdiv,
    });
}

//for employees Data
for (let index = 0; index < 50; index++) {

    const BASIC_INFO = empBasicInformation();
    const BANK_DETAILS = empBankDetails();
    const DOCUMENT_DETAILS = empDocumentDetails();
    const STATUTORY_INFO = empStatutory();
    const STATEMENTS = empStatementsDetails();

    database.employees.push({
        id: index,
        empImgUrl: faker.image.avatar(),
        empName: faker.name.firstName(),
        department: faker.random.arrayElement(["FOH", "BOH", "Management"]),
        basicInfo: BASIC_INFO,
        bankDetails: BANK_DETAILS,
        //shiftDetails---------->>>
        DocumentDetails: DOCUMENT_DETAILS,
        StatutoryInfo: STATUTORY_INFO,
        StatmentsInfo: STATEMENTS,

    });

}

// Employee Shift Data 
for (let index = 0; index < 500; index++) {
    let d = new Date();
    let formatted_date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    const DATE = faker.date.between('2020-12-01', formatted_date);
    const SHIFT_START = new Date(DATE)
    SHIFT_START.setHours(faker.datatype.number({ min: 1, max: 9 }));
    SHIFT_START.setMinutes(faker.datatype.number({ min: 0, max: 59 }));
    const SHIFT_END = new Date(DATE);
    SHIFT_END.setHours(faker.datatype.number({ min: 10, max: 23 }));
    SHIFT_END.setMinutes(faker.datatype.number({ min: 0, max: 59 }));


    database.shift.push({
        id: index,
        location: faker.random.arrayElement(["ABT Cafe", "Creams Cafe", "Cafe 3"]),
        empId: faker.datatype.number({ min: 0, max: 50 }),
        title: "Shift Title",
        shiftType: faker.random.arrayElement(["Regular", "Hourly", "Type 3"]),
        shiftDate: DATE,
        shiftStartTime: SHIFT_START,
        shiftEndTime: SHIFT_END,
        isApproved: faker.random.arrayElement([true, false])
    });
}


//  Shift Calendar Data
for (let index = 0; index < 10; index++) {
    database.shift_calendar.push({
        id: index,
        weekStart: new Date(2020, 12, 5 + (7 * index)),
        weekEnd: new Date(2020, 12, 5 + (7 * index) + 6),
        totalShift: faker.datatype.number({ min: 10, max: 30 }),
        totalLeaves: faker.datatype.number({ min: 0, max: 10 }),
        status: faker.random.arrayElement(["Published", "Draft"]),
        employees: [
            {
                empId: 1,
                shifts: [
                    { shiftId: 1 },
                    { shiftId: 2 },
                    { shiftId: 3 },
                    { shiftId: 5 }
                ]
            },
            {
                empId: 2,
                shifts: [
                    { shiftId: 4 },
                    { shiftId: 6 },
                    { shiftId: 7 },
                    { shiftId: 8 }
                ]
            }
        ]
    });
}

// for attendence data

for (let index = 0; index < 50; index++) {

    const ATT_INFO = empAttendance();
    let today = new Date();
    today = addDays(today, 0)

    database.attendance.push({
        attendance_date: subDays(today, index),
        attendance_Details: ATT_INFO,

    });
}

//  Leaves data
for (let index = 0; index < 50; index++) {
    database.leaves.push({
        id: index,
        startDate: new Date(),
        endDate: new Date(),
        empId: index,
        comment: "",
        status: faker.random.arrayElement(["Approved", "Pending", "Draft"])
    });
}

// for Payroll data
for (let index = 0; index < 50; index++) {
    database.Payroll.push({
        id: index,
        Report_Name: faker.random.arrayElement(["FOH", "BOH", "Management"]),
        Start_date: faker.date.recent(),
        End_date: faker.date.recent(),
    });
}

// for Request data
for (let index = 0; index < 50; index++) {
    const d = faker.date.between('2020-12-01', formattedDate(new Date()))
    let st = new Date(d);
    st.setHours(faker.datatype.number({ min: 0, max: 12 }), faker.datatype.number({ min: 0, max: 59 }))
    let et = new Date(d);
    et.setHours(st.getHours() + 8, faker.datatype.number({ min: 0, max: 59 }))
    database.Request.push({
        id: index,
        empName: faker.name.firstName(),
        empImgUrl: faker.image.avatar(),
        department: faker.random.arrayElement(["FOH", "BOH", "Management"]),
        Shift_date: d,
        Start_time: st,
        End_Time: et,
        Shift_status: faker.random.arrayElement(["Pending", "Rejected", "Approved"]),
        Start_date: d,
        End_date: addDays(d, faker.datatype.number({ min: 0, max: 5 })),
        Leave_status: faker.random.arrayElement(["Pending", "Rejected", "Approved"]),
        Profile_status: faker.random.arrayElement(["Pending", "Rejected", "Approved"]),
    });
}







console.log(JSON.stringify(database));