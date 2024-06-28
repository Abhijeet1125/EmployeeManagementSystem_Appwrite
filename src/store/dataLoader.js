import  EmployeeService from '../appwrite/EmployeeCollection';
import { updateEmployeeList } from './EmployeeSlice';
import departmentService from '../appwrite/departmentCollection';
import { updateDepartmentList } from './departmentSlice';
import  PositionService from '../appwrite/positionCollection';
import { updatePositionList } from './positionSlice';
import projectService from '../appwrite/projectCollection';
import { updateProjectList } from './projectSlice';





const dataLoader = async (dispatch) => { 
    console.log ( "loading data ")
    try {
        dispatch(updateEmployeeList(await EmployeeService.getEmployees()));
        dispatch(updateDepartmentList(await departmentService.getDepartments()))
        dispatch(updatePositionList(await PositionService.getPositions()));
        dispatch(updateProjectList(await projectService.getProjects()));
    } catch (error) {
        throw error 
    }
}
export default dataLoader ; 