const Employee = require('../models/Employee');
const EmployeeController = {
    add : async function (req, res) {
        let formData = req.body;
        if(!formData.name || !formData.job_title || !formData.location || !formData.salary || !formData.department || !formData.age ){
            return res.json({ "status": 401, "message": "Mandatory fields are missing..!" });
        }
        let employeeData = {
            full_name: formData.name,
            job_title: formData.job_title,
            location: formData.location,
            salary:formData.salary,
            department:formData.department,
            age:formData.age,

        }
        await new Employee(employeeData).save()        
            .then(async (data)=>{
                return res.json({ "status": 200, "message": "Employee Added successfully..!" });
            })
            .catch((errors) => {  
                console.log(errors);
                return res.json({ "status": 400, "message": "Something went wrong..!" });
            });
    },
    index: async function (req, res) {

        let has_pagination              = req.query.pagination;
        let limit                       = req.query.limit ? req.query.limit : 10;
        let page                        =  req.query.page ? req.query.page : 1;
        let department =  req.query.department ? req.query.department : false;
        let location = req.query.location ? req.query.location : false;
        let age =  req.query.age ? req.query.age : false;
        let employee = Employee;
        if(department){
            employee = employee.where('department','like',`%${department}%`)
        }
        if(location){
            employee = employee.where('location','like',`%${location}%`)
        }
        if(age){
            employee = employee.where('age','like',`%${age}%`)
        }
       
        if (has_pagination) {
            console.log(has_pagination,limit,page);
            let relation_params = Object.assign(
                { pageSize: limit, page: page },              
            );
            employee = employee.fetchPage(relation_params);
        } else {
            employee = employee.fetchAll();
        }

        employee.then((response) => {
            if(has_pagination){
                return res.json({ "status": 200, "message": "Employee Details Fetched Successfully..!","data" : response, "pagination": response.pagination });   
            }
            return res.json({ "status": 200, "message": "Employee Details Fetched Successfully..!","data" : response });                   
           
        }).catch((errors) => {
            console.log(errors);
            return res.json({ "status": 400, "message": "Something went wrong..!" });
        });  

    },
    update: async function (req, res) {
        let userId = req.params.id;
        let formData = req.body;
        if(!formData.name || !formData.job_title || !formData.location || !formData.salary || !formData.department || !formData.age ){
           return res.json({ "status": 401, "message": "Mandatory fields are missing..!" });
        }
        let employeeData = {
            full_name: formData.name,           
            job_title: formData.job_title,
            department:formData.department,
            location:formData.location,
            age: formData.age ,
            salary: formData.salary          
        }
        new Employee()
        .where('id', userId)
        .save(employeeData, { patch: true})          
        .then((data)=>{
            return res.json({ "status": 200, "message": "Employee Details Updated Successfully..!" });         
        })
        .catch((errors) => {  
            return res.json({ "status": 400, "message": "Something went wrong..!" });
        }); 

    },
    destroy: function (req, res) {
        let employeeId = req.params.id;
        new Employee()
            .where('id', employeeId)
            .destroy()
            .then((responseData)=>{
                return res.json({ "status": 200, "message": "Employee Deleted Successfully..!" });                  
            })
            .catch((errors) => {
                return res.json({ "status": 400, "message": "Something went wrong..!" });         
            });
    },

}

module.exports = EmployeeController;