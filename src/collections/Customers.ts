import { Access, CollectionConfig } from "payload/types";

const isAdminOrSelf: Access /* <Customer | User, User> */ = ({
  req: { user }
}) => {
  if (user) {
    if (user?.roles?.includes("super-admin")) {
      return true;
    }

    return {
      id: {
        equals: user.id
      }
    };
  }
};
const Customers: CollectionConfig = {
  slug: "customers",
  auth: true,
  hooks: {
    beforeChange: []
  },
  admin: {
    group: "Consultations",
    useAsTitle: "email"
  },
  access: {
    create: () => true,
    read: () => true,
    update: isAdminOrSelf,
    delete: isAdminOrSelf
  },
  fields: [
    {
      name: "firstName",
      type: "text"
    },
    {
      name: "lastName",
      type: "text"
    },
    {
      name: "subscription",
      type: "select",
      defaultValue: "none",
      options: [
        { label: "None", value: "none" },
        { label: "Monthly", value: "monthly" },
        { label: "Yearly", value: "yearly" }
      ]
    },
    {
      name: "freeConsultations",
      type: "number",
      defaultValue: 2,
      max: 2
    },
    {
      name: "thisCollection",
      type: "text",
      defaultValue: "customers"
    }
  ]
};

export default Customers;
