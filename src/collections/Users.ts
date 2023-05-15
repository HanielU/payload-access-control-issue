import { CollectionConfig, FieldAccess } from "payload/types";
import { User } from "../payload-types";

const isAdminFieldLevel: FieldAccess<{ id: string }, User, User> = ({
  req: { user }
}) => {
  return !!user?.roles?.includes("super-admin");
};

const isAdminTypeUserFieldLevel: FieldAccess<{ id: string }, User, User> = ({
  req: { user }
}) => {
  return (
    !!user?.roles?.includes("super-admin") ||
    !!user?.roles?.includes("expert") ||
    !!user?.roles?.includes("editor")
  );
};

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email"
  },
  access: {
    read: () => true
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "firstName",
          type: "text",
          required: true
        },
        {
          name: "lastName",
          type: "text",
          required: true
        }
      ]
    },
    {
      name: "fullname",
      label: "Full Name",
      type: "text",
      admin: { readOnly: true },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            return siblingData.firstName + " " + siblingData.lastName;
          }
        ]
      }
    },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      defaultValue: ["editor"],
      access: {
        create: isAdminFieldLevel,
        read: isAdminTypeUserFieldLevel,
        update: isAdminFieldLevel
      },
      options: [
        {
          label: "Super Admin",
          value: "super-admin"
        },
        {
          label: "Editor",
          value: "editor"
        },
        {
          label: "Expert",
          value: "expert"
        }
      ]
    }
  ]
};

export default Users;
