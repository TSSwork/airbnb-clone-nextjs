import prisma from "./prismadb";

// Create a function to check the MongoDB server connection
const checkMongoDBConnection = async () => {
    
    try {
      // Attempt a connection to the MongoDB server without performing any actions.
      await prisma.$connect();
      // console.log('Connected to MongoDB server.');
    } catch (error:any) {
      console.error('Error connecting to MongoDB server:', error.message);
      // process.exit(1); // Exit the application if there's an error
    } finally {
      await prisma.$disconnect();
    }
  };

export default checkMongoDBConnection;