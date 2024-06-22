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

    async createProject({ ProjectName , Completed , department , ProjectDescription }) {
        try {            
            const response = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProjectCollectionId,
                ID.unique(),
                { ProjectName  , Completed, department , ProjectDescription}
            );
            return response;
        } catch (error) {
            throw error 
        }
    }

    async updateProject({ id , ProjectName , Completed , department , ProjectDescription }) {
        try {
            const response = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProjectCollectionId,
                id , 
                { ProjectName , Completed , department , ProjectDescription }
            );
            return response;
        } catch (error) {
            throw error
        }
    }


    async deleteProject({id}) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProjectCollectionId,
                id , 
            )
            return true 
        } catch (error) {
            console.error("Appwrite delete department failed ", error);
            return false 
        }
    }


    async getProjects() {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteProjectCollectionId
            );
    
            const filteredResponse = response.documents.map(doc => ({
                id: doc.$id,
                ProjectName: doc.ProjectName,
                Completed: doc.Completed,
                department: doc.department,
                ProjectDescription : doc.ProjectDescription,
            }));
            return filteredResponse;
        } catch (error) {
            console.error("Appwrite get departments failed ", error);
        }
    }
}

const projectService  = new Service()
export default projectService