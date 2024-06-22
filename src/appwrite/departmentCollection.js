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

    async createDepartment({ DepartmentName , Location , DepartmentDescription }) {
        try {            
            const response = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteDepartmentCollectionId,
                ID.unique(),
                { DepartmentName  , Location, DepartmentDescription }
            );
            return response;
        } catch (error) {
            throw error 
        }
    }

    async updateDepartment({ id , DepartmentName , Location , DepartmentDescription }) {
        try {
            const response = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteDepartmentCollectionId,
                id , 
                { DepartmentName , Location, DepartmentDescription }
            );
            return response;
        } catch (error) {
            throw error
        }
    }


    async deleteDepartment({id}) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteDepartmentCollectionId,
                id , 
            )
            return true 
        } catch (error) {
            console.error("Appwrite delete department failed ", error);
            return false 
        }
    }


    async getDepartments() {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteDepartmentCollectionId
            );
    
            const filteredResponse = response.documents.map(doc => ({
                id: doc.$id,
                DepartmentName: doc.DepartmentName,
                Location: doc.Location,
                DepartmentDescription: doc.DepartmentDescription
            }));
            return filteredResponse;
        } catch (error) {
            console.error("Appwrite get departments failed ", error);
        }
    }


   
}


const departmentService  = new Service()
export default departmentService