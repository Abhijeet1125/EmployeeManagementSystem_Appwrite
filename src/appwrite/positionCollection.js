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

    async createPosition({ PositionName , department , PositionDescription }) {
        try {            
            const response = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwritePositionCollectionId,
                ID.unique(),
                { PositionName  , department , PositionDescription}
            );
            return response;
        } catch (error) {
            throw error 
        }
    }

    async updatePosition({ id , PositionName , department , PositionDescription }) {
        try {
            const response = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwritePositionCollectionId,
                id , 
                {  PositionName  , department , PositionDescription }
            );
            return response;
        } catch (error) {
            throw error
        }
    }


    async deletePosition({id}) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwritePositionCollectionId,
                id , 
            )
            return true 
        } catch (error) {
            console.error("Appwrite delete department failed ", error);
            return false 
        }
    }


    async getPositions() {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwritePositionCollectionId
            );
    
            const filteredResponse = response.documents.map(doc => ({
                id: doc.$id,
                PositionName: doc.PositionName,
                department: doc.department,
                PositionDescription : doc.PositionDescription,
            }));
            return filteredResponse;
        } catch (error) {
            console.error("Appwrite get departments failed ", error);
        }
    }
}

const PositionService  = new Service()
export default PositionService