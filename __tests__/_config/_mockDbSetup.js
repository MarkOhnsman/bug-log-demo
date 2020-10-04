const { MockMongoose } = require("mock-mongoose");
const mongoose = require('mongoose');
const MockMongo = require("./_MockMongo");

async function start() {
  try {
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
    mongoose.set("useUnifiedTopology", true);

    console.log("Initializing Database");
    const mongo = new MockMongo()
    const connectionstring = await mongo.start()
    process.env.CONNECTION_STRING = connectionstring
    await mongoose.connect(connectionstring);
    console.log("\x1b[36m%s\x1b[0m", "[CONNECTION ESTABLISHED]");
    await mongoose.disconnect();
    await mongo.stop()
    console.log("\x1b[31m", "[TESTS SUITE READY]");
    process.exit()
  } catch (e) {
    console.error(e)
  }
}

start()
