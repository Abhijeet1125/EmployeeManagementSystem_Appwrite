const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteEmployeeCollectionId: String(import.meta.env.VITE_APPWRITE_EMPLOYEE_COLLECTION_ID),    
    appwriteDepartmentCollectionId: String(import.meta.env.VITE_APPWRITE_DEPARTMENT_COLLECTION_ID),    
    appwritePositionCollectionId: String(import.meta.env.VITE_APPWRITE_POSITION_COLLECTION_ID),    
    appwriteProjectCollectionId: String(import.meta.env.VITE_APPWRITE_PROJECT_COLLECTION_ID),    
}


export default conf