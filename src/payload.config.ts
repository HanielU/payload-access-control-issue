import Customers from "./collections/Customers";
import Notifications from "./collections/Notifications";
import Users from "./collections/Users";
import path from "path";
import { buildConfig } from "payload/config";

export default buildConfig({
  serverURL: "http://localhost:3000",
  admin: {
    user: Users.slug
  },
  collections: [
    Users,
    Customers,
    Notifications
    // Add Collections here
    // Examples,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts")
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql")
  }
});
