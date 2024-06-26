import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createEmployee({ FirstName , LastName,Gender,Email ,Phone , Address , department ,  position , project}) {
        try {            
            const response = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteEmployeeCollectionId,
                ID.unique(),
                { FirstName , LastName,Gender,Email ,Phone , Address , department ,  position , project}
            );
            return response;
        } catch (error) {
            throw error 
        }
    }

    async updateEmployee({ id , FirstName , LastName,Gender,Email ,Phone , Address , department ,  position , project }) {
        try {
            const response = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteEmployeeCollectionId,
                id , 
                { FirstName , LastName,Gender,Email ,Phone , Address , department ,  position , project }
            );
            return response;
        } catch (error) {
            throw error
        }
    }


    async deleteEmployee({id}) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteEmployeeCollectionId,
                id , 
            )
            return true 
        } catch (error) {
            console.error("Appwrite delete department failed ", error);
            return false 
        }
    }


    async getEmployees() {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteEmployeeCollectionId
            );
            const filteredResponse = response.documents.map(doc => ({
                id: doc.$id,
                FirstName: doc.FirstName,
                LastName: doc.LastName,
                Gender: doc.Gender,
                Email : doc.Email,
                Phone : doc.Phone,
                Address : doc.Address,
                department : doc.department,
                position : doc.position,
                project : doc.project,
            }));
            return filteredResponse;
        } catch (error) {
            console.error("Appwrite get departments failed ", error);
        }
    }
}

const EmployeeService  = new Service()
export default EmployeeService