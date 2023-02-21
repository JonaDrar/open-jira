import mongoose from "mongoose";

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const mongoConnection = {
  isConnected: 0,
}

export const connect = async () => {
  if (mongoConnection.isConnected) {
    console.log('We are already connected')
    return;
  }

  if ( mongoose.connections.length > 0 ) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;
    if (mongoConnection.isConnected === 1) {
      console.log('Using existing connection')
      return;
    }
    mongoConnection.isConnected = 3;
    await mongoose.disconnect();
    mongoConnection.isConnected = 0;
  }

  const db = await mongoose.connect(process.env.MONGO_URL || '');
  mongoConnection.isConnected = db.connections[0].readyState;
  console.log('We are connected')
}

export const disconnect = async () => {

    if (process.env.NODE_ENV === 'development') {
      console.log('We are not disconnecting in development')
      return;
    }

    if (mongoConnection.isConnected === 0) {
      console.log('We are already disconnected')
      return;
    }
    mongoConnection.isConnected = 3;
    await mongoose.disconnect();
    console.log('We are disconnected')
    mongoConnection.isConnected = 0;

}