import type { Notification, Customer, User } from "../payload-types";
import type { Access, CollectionConfig } from "payload/types";

const isAdminOrRecipient: Access<Notification, Customer | User> = ({
  req: { user }
}) => {
  if (!user) return false;
  if (user.collection === "users") {
    return true;
  }

  return {
    or: [
      {
        recipient: {
          in: [{ value: user.id, relationTo: "customers" }]
        }
      },
      {
        recipient: {
          in: [{ value: user.id, relationTo: "users" }]
        }
      }
    ]
  };
};

const Notifications: CollectionConfig = {
  slug: "notifications",
  admin: {
    group: "Communication",
    useAsTitle: "title"
  },
  access: {
    create: () => true,
    read: isAdminOrRecipient,
    update: isAdminOrRecipient,
    delete: isAdminOrRecipient
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true
    },
    {
      name: "sender",
      type: "relationship",
      relationTo: ["users", "customers"]
    },
    {
      name: "timestamp",
      type: "date",
      admin: { date: { pickerAppearance: "dayAndTime" } }
    },
    {
      name: "recipient",
      type: "relationship",
      relationTo: ["users", "customers"],
      required: true,
      hasMany: true
    },
    {
      name: "readBy",
      type: "relationship",
      relationTo: ["users", "customers"],
      hasMany: true
    }
  ],

  hooks: {
    beforeValidate: []
  }
};

export default Notifications;
